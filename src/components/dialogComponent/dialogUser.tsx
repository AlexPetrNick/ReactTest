import React, {FC, MouseEvent, useEffect, useLayoutEffect, useRef, useState} from "react";
import './dialogStyle.css'
import {messageType, stateDialogReducerType} from "../../redux/reducers/dialogReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {DialogItemUser} from "./dialogItem/dialogItemUser";
import {NotMessages} from "./notMessages/NotMessages";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {deleteMsgThunk, getDialogInfoThunk, sendDialogMsgEditThunk, updateUserGroupListThunk} from "../../redux/thunk";
import {initUserStateType} from "../../redux/reducers/userReducers";
import {
    getListGroupFoundType,
    menuListReducerType,
    selectUser,
    setModeListAC,
    setNullUnreadMsg
} from "../../redux/reducers/menuListReducer";
import {PortalElements} from "../elements/portal/portalElements";
import {ForwardMenu} from "./forwardMenu/ForwardMenu";
import {deleteValueLocalStorage, setValueLocalStorage} from "../../Service/Localstorage";
import {setting} from "../../config/config";
import {MenuCancelEdit} from "./forwardMenu/MenuCancelEdit";
import {drawName} from "../../Service/common";


type DialogUserType = {
    dialogInfo: stateDialogReducerType,
    sendMessage: (id: string, message: string, room: string, curId: string) => void
    readAllMsg: (idFriend: string) => void
    sendMessageForwardEvent: (id: string, message: string, room: string, curId: string, forw: string) => void
}

type editMsgObjType = {
    originalMsg: string | null
    idMsg: string | null
}

export const DialogUser: FC<DialogUserType> = (props) => {
    const currUserInfo = useSelector<AppStateType, initUserStateType>(data => data.UserReducers)
    const {
        usersFound,
        groupList,
    } = useSelector<AppStateType, menuListReducerType>(data => data.menuListReducer)
    const dialogInfo = useSelector<AppStateType, stateDialogReducerType>(data => data.DialogReducer)
    const overFlow = useRef<HTMLDivElement>(null)
    const dialog = props.dialogInfo
    const userInfo = dialog.userInfo
    const messages = dialog.message
    const {register, handleSubmit, setValue} = useForm({shouldUseNativeValidation: true})
    const dispatchAC = useDispatch()
    const drawListStyle = `content_dialog ${Number(messages?.length) > 7 && 'content_full'}`
    const getUserId = userInfo._id ? userInfo._id : usersFound?.filter(us => us.username === userInfo.username)[0]['id']
    const [popUpMess, setPopUpMess] = useState<string>('')
    const [stateForm, setStateForm] = useState<'normal' | 'edit' | 'mforw'>('normal')
    const [originalMessage, setOriginalMessage] = useState<editMsgObjType>({originalMsg: null, idMsg: null})
    const [forwardMenuSet, setForwardMenuSet] = useState<string>('')
    const [modeSelection, setModeSelection] = useState<boolean>(false)
    const [selectedMessage, setSelectedMessage] = useState<Array<string>>([])
    let haveUnreadMsg = false

    useEffect(() => {
        // const scrollOptions: ScrollToOptions = {
        //     left: 0,
        //     top: 10000000,
        //     behavior: 'auto'
        // }
        console.log('as')
        // if (overFlow.current) overFlow.current.scrollTo(scrollOptions)
        return () => {
            console.log('umo')
        }
    }, [])

    const toggleSelectMessage = (idUser:string) => {
        if (selectedMessage.includes(idUser)) {
            const tempSelectedUser = [...selectedMessage]
            tempSelectedUser.splice(tempSelectedUser.indexOf(idUser), 1)
            setSelectedMessage([...tempSelectedUser])
        } else {
            setSelectedMessage([...selectedMessage, idUser])
        }
    }
    const setModeSelectionHandler = (e: MouseEvent<HTMLDivElement>) => {
        setModeSelection(!modeSelection)
        if (modeSelection) setSelectedMessage([])
    }


    const setPopUpHandler = (id: string) => popUpMess == id ? setPopUpMess('') : setPopUpMess(id)
    const setFormRedact = (textMessage: string, idMsg: string) => {
        setOriginalMessage({...originalMessage, originalMsg: textMessage, idMsg: idMsg})
        setStateForm('edit')
        setValue('message', textMessage)
    }
    const setFormCancel = (e: MouseEvent<HTMLDivElement>) => {
        setStateForm('normal')
        setValue('message', '')
    }
    const closeForwardMenu = () => {
        deleteValueLocalStorage(setting.nameForwardVariable)
        setForwardMenuSet('')
    }


    const deleteMessageCb = (idMessage: string) => dispatchAC(deleteMsgThunk(idMessage))


    const drawForwardMenu = (msg: string, idUser: string) => {
        let username = ''
        if (currUserInfo.id === idUser) {
            username = String(currUserInfo.username)
        } else {
            username = String(groupList?.filter((group: getListGroupFoundType) => group.friend.id === idUser)[0].friend.username)
        }
        setValueLocalStorage(setting.nameForwardVariable, username)
        setForwardMenuSet(msg)
    }
    const drawOriginalMessage = () => {
        if (stateForm == 'edit') {
            return <MenuCancelEdit setFormCancel={setFormCancel} originalMessage={String(originalMessage.originalMsg)} />
        } else if (stateForm == 'mforw') {
            return (
                <div>sdad</div>
            )
        }
    }

    const onSubmitForm: SubmitHandler<FieldValues> = (data) => {
        props.sendMessage(
            getUserId ? getUserId : '',
            data.message,
            dialog.groupInfo?.name ? dialog.groupInfo.name : '',
            currUserInfo.id ? currUserInfo.id : ''
        )
        setValue("message", '')
        dispatchAC(setModeListAC("group"))
        dispatchAC(selectUser(getUserId ? getUserId : ''))
        dispatchAC(getDialogInfoThunk(userInfo.username))
    }

    const onSubmitFormRedact: SubmitHandler<FieldValues> = (data) => {
        const idMess = originalMessage.idMsg
        setStateForm('normal')
        setValue("message", '')
        dispatchAC(sendDialogMsgEditThunk({idMessage: String(idMess), editMessage: data.message}))
        dispatchAC(updateUserGroupListThunk([{user: userInfo.username}]))
    }


    const listMessage = (isRead = true) => {
        const msgCurrentFriend = messages?.filter((msg: messageType) => msg.talkingGroupId === dialogInfo.groupInfo?._id)
        const readMsg = msgCurrentFriend?.filter((msg: messageType) => {
            return isRead ? msg.whoRead.includes(String(currUserInfo.id)) : !msg.whoRead.includes(String(currUserInfo.id))
        })
        return readMsg?.map((mes, index) => {
            return (
                <DialogItemUser
                    key={index}
                    drawForwardMenu={drawForwardMenu}
                    friendName={String(userInfo.username)}
                    deleteMessageCb={deleteMessageCb}
                    message={mes}
                    enabledMenu={mes._id == popUpMess}
                    setPopUpHandler={setPopUpHandler}
                    setFormRedact={setFormRedact}
                    friendMessage={!(mes.userId === currUserInfo.id)}
                    modeSelection={modeSelection}
                    messageSelect={selectedMessage.includes(mes._id)}
                    toggleSelectMessage={toggleSelectMessage}
                />
            )
        })
    }

    const drawMessageRead = () => listMessage()
    const drawMessageUnread = () => listMessage(false)
    const drawListMessage = () => {
        const readMsg = drawMessageRead()
        const unreadMsg = drawMessageUnread()
        if (unreadMsg?.length) {
            haveUnreadMsg = true
            return (
                <>
                    {readMsg}
                    <div className="line_unread_msg"><b>Непрочитаные сообщения</b></div>
                    {unreadMsg}
                </>
            )
        } else {
            haveUnreadMsg = false
            return readMsg
        }
    }

    const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (popUpMess != '') {
            setPopUpMess('')
        }
        if (haveUnreadMsg) {
            props.readAllMsg(String(userInfo._id))
            dispatchAC(setNullUnreadMsg(String(userInfo._id)))
        }
    }

    return (
        <div className={'dialog_user'}>
            <div className="header_dialog">
                <div className="userinfo_dialog"><b>{drawName(String(userInfo.username), userInfo.firstName, userInfo.lastName)}</b></div>
                <div className="menu_user_dialog">
                    <button>Menu</button>
                    <div
                        title='Выделить несколько'
                        className='btn_select_msgs'
                        onClick={setModeSelectionHandler}
                    >
                        <i>&#128504;</i><i>&#128504;</i><i>&#128504;</i>
                    </div>
                </div>
            </div>
            {messages ?
                <div ref={overFlow} className={drawListStyle} onClick={onClickHandler}>
                    {drawListMessage()}
                    {drawOriginalMessage()}
                </div> :
                <NotMessages/>
            }
            <div className="message_crud_dialog">
                <form className="form_dialog"
                      onSubmit={handleSubmit(stateForm == 'normal' ? onSubmitForm : onSubmitFormRedact)}>
                    <input
                        autoFocus
                        {...register('message')}
                        type="text"
                        className="text_enter_dialog"
                    />
                    <input type={'submit'}
                           className="btn_send_msg_dia"
                           value={stateForm == 'normal' ? 'Отправить' : 'Редактировать'}
                    />
                </form>
            </div>
            {forwardMenuSet &&
                <PortalElements>
                    <ForwardMenu
                        currentUserId={String(currUserInfo.id)}
                        groupList={groupList ? groupList : []}
                        message={forwardMenuSet}
                        sendMessageForwardEvent={props.sendMessageForwardEvent}
                        closeForwardMenu={closeForwardMenu}
                        usernameCurrDlg={String(userInfo.username)}
                    />
                </PortalElements>
            }
        </div>
    )
}
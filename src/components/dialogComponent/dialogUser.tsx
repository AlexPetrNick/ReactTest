import React, {FC, MouseEvent, useEffect, useRef, useState} from "react";
import './dialogStyle.css'
import {
    messageType,
    objectForwMsg,
    setForwardMenuSet,
    setModeSelection,
    setOriginalMessage,
    setPopUpMess,
    setStateForm,
    stateDialogReducerType
} from "../../redux/reducers/dialogReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {DialogItemUser} from "./dialogItem/dialogItemUser";
import {NotMessages} from "./notMessages/NotMessages";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {
    deleteMsgThunk,
    getDialogInfoThunk,
    listGroupFoundThunk,
    sendDialogMsgEditThunk,
    updateUserGroupListThunk
} from "../../redux/thunk";
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
import {deleteValueLocalStorage} from "../../Service/Localstorage";
import {setting} from "../../config/config";
import {MenuCancelEdit} from "./forwardMenu/MenuCancelEdit";
import {drawName} from "../../Service/common";
import {MenuSeletedMsg} from "./menuSelectedMessage/MenuSeletedMsg";
import Picker, {IEmojiData} from 'emoji-picker-react';
import smile from '../../static/image/pngwing.com.png'
import clip from '../../static/image/clip.png'
import arrow from '../../static/image/arrow_go.png'
import {ClipMenu} from "./clipMenu/ClipMenu";

const stylePickerEmoji = {
    position: 'absolute',
    width: '300px',
    bottom: '50px'
}

type DialogUserType = {
    dialogInfo: stateDialogReducerType,
    sendMessage: (id: string, message: string, room: string, curId: string) => void
    readAllMsg: (idFriend: string) => void
    sendMessageForwardEvent: (id: string, message: string, room: string, curId: string, forw: string) => void
    sendMessageForwardArrayEvent: (id: string, messages: string[], room: string, curId: string, forw: string[]) => void
}


export const DialogUser: FC<DialogUserType> = (props) => {
    const currUserInfo = useSelector<AppStateType, initUserStateType>(data => data.UserReducers)
    const {
        usersFound,
        groupList,
    } = useSelector<AppStateType, menuListReducerType>(data => data.menuListReducer)
    const {
        popUpMess,
        originalMessage,
        stateForm,
        forwardMenuSet,
        modeSelection,
        ...dialogInfo
    } = useSelector<AppStateType, stateDialogReducerType>(data => data.DialogReducer)
    const overFlow = useRef<HTMLDivElement>(null)
    const dialog = props.dialogInfo
    const userInfo = dialog.userInfo
    const messages = dialog.message
    const {register, handleSubmit, setValue, getValues} = useForm({shouldUseNativeValidation: true})
    const dispatchAC = useDispatch()
    const drawListStyle = `content_dialog ${Number(messages?.length) > 7 && 'content_full'}`
    const getUserId = userInfo._id ? userInfo._id : usersFound?.filter(us => us.username === userInfo.username)[0]['id']
    const getUsernameFromId = (userId: string) => userInfo._id === userId ? String(userInfo.username) : String(currUserInfo.username)
    let haveUnreadMsg = false
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>({
        unified: '',
        originalUnified: '',
        names: [],
        emoji: '',
        activeSkinTone: '1f3fb'
    })
    const [stateEmoji, setStateEmoji] = useState<boolean>(false)
    const [clipMenu, setClipMenu] = useState<boolean>(false)

    useEffect(() => {
        overFlow.current?.scrollTo(0, overFlow.current?.scrollHeight)
    }, [userInfo, messages])

    const toggleSelectMessage = (messageId: string, userId: string) => {
        const selectedMessage = forwardMenuSet.map(msgMenu => msgMenu.messageId)
        const userMsg = getUsernameFromId(userId)
        if (selectedMessage.includes(messageId)) {
            const tempSelectedUser = forwardMenuSet.filter(msgMenu => msgMenu.messageId !== messageId)
            dispatchAC(setForwardMenuSet(tempSelectedUser))
        } else {
            dispatchAC(setForwardMenuSet([...forwardMenuSet, {username: userMsg, messageId: messageId}]))
        }
    }

    const setModeSelectionHandler = (e: MouseEvent<HTMLDivElement>) => {
        dispatchAC(setModeSelection(true))
        dispatchAC(setStateForm('mforw'))
    }

    const setModeSelectionOffHandler = (e: MouseEvent<HTMLDivElement>) => {
        dispatchAC(setForwardMenuSet([]))
        dispatchAC(setModeSelection(false))
        dispatchAC(setStateForm('normal'))
    }

    const setPopUpHandler = (id: string) => popUpMess == id ? dispatchAC(setPopUpMess('')) : dispatchAC(setPopUpMess(id))
    const setFormRedact = (textMessage: string, idMsg: string) => {
        dispatchAC(setOriginalMessage({...originalMessage, originalMsg: textMessage, idMsg: idMsg}))
        dispatchAC(setStateForm('edit'))
        setValue('message', textMessage)
    }
    const setFormCancel = (e: MouseEvent<HTMLDivElement>) => {
        dispatchAC(setStateForm('normal'))
        setValue('message', '')
    }
    const closeForwardMenu = () => {
        deleteValueLocalStorage(setting.nameForwardVariable)
        dispatchAC(setForwardMenuSet([]))
        dispatchAC(setStateForm('normal'))
        dispatchAC(setModeSelection(false))
    }
    const deleteMessageCb = (idMessage: string) => dispatchAC(deleteMsgThunk([idMessage]))
    const drawForwardMenu = (msg: string, idUser: string) => {
        const username = getUsernameFromId(idUser)
        dispatchAC(setForwardMenuSet([...forwardMenuSet, {username: username, messageId: msg}]))
    }
    const drawForwardMenuSendArray: SubmitHandler<FieldValues> = () => dispatchAC(setStateForm('normal'))


    const drawOriginalMessage = () => {
        if (stateForm == 'edit') {
            return <MenuCancelEdit setFormCancel={setFormCancel} originalMessage={String(originalMessage.originalMsg)}/>
        } else if (stateForm == 'mforw') {
            return <MenuSeletedMsg
                forwardMenuSet={forwardMenuSet}
            />
        }
    }

    const getCbFromSubmitMessage = () => {
        if (stateForm === 'normal') {
            return onSubmitForm
        } else if (stateForm === 'edit') {
            return onSubmitFormRedact
        } else {
            return drawForwardMenuSendArray
        }
    }

    const onSubmitForm: SubmitHandler<FieldValues> = (data) => {
        props.sendMessage(
            getUserId ? getUserId : '',
            data.message,
            dialog.groupInfo?.name ? dialog.groupInfo.name : '',
            currUserInfo.id ? currUserInfo.id : ''
        )
        setStateEmoji(false)
        setValue("message", '')
        dispatchAC(setModeListAC("group"))
        dispatchAC(selectUser(getUserId ? getUserId : ''))
        dispatchAC(getDialogInfoThunk(userInfo.username))
    }

    const onSubmitFormRedact: SubmitHandler<FieldValues> = (data) => {
        const idMess = originalMessage.idMsg
        dispatchAC(setStateForm('normal'))
        setValue("message", '')
        dispatchAC(sendDialogMsgEditThunk({idMessage: String(idMess), editMessage: data.message}))
        dispatchAC(updateUserGroupListThunk([{user: userInfo.username}]))
    }

    const sendForwardMsg = (selectedUser: string[]) => {
        const filtred = groupList?.filter((group: getListGroupFoundType) => selectedUser.includes(group.friend.id))
        const tempArray = forwardMenuSet.map((msgArr: objectForwMsg) => msgArr.messageId)
        const usernameArray = forwardMenuSet.map((msgArr: objectForwMsg) => msgArr.username)
        const arrayMessageSend = messages?.filter(msg => tempArray.includes(msg._id)).map(msg => msg.text)
        const msgUserArrayForw = String(currUserInfo.id) + getValues('message')
        if (getValues('message')) arrayMessageSend?.push(msgUserArrayForw)
        filtred?.map((group: getListGroupFoundType) => {
            props.sendMessageForwardArrayEvent(
                group.friend.id,
                arrayMessageSend ? arrayMessageSend : [],
                group.name,
                String(currUserInfo.id),
                usernameArray
            )
        })
        closeForwardMenu()
        dispatchAC(setStateForm('normal'))
        dispatchAC(setForwardMenuSet([]))
        dispatchAC(setModeSelection(false))
        dispatchAC(listGroupFoundThunk([]))
        dispatchAC(getDialogInfoThunk(String(userInfo.username)))
        setValue('message', '')
    }

    const onPressEnterSendMsg = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(getCbFromSubmitMessage())
        }
    }


    const listMessage = (isRead = true) => {
        const msgCurrentFriend = messages?.filter((msg: messageType) => msg.talkingGroupId === dialogInfo.groupInfo?._id)
        const readMsg = msgCurrentFriend?.filter((msg: messageType) => {
            return isRead ? msg.whoRead.includes(String(currUserInfo.id)) : !msg.whoRead.includes(String(currUserInfo.id))
        })
        const selectedMessage = forwardMenuSet.map(msgMenu => msgMenu.messageId)
        return readMsg?.map((mes, index, currArray) => {
            const prevMessRepeatUser = mes.userId === currArray[index - 1]?.userId
            const isFriend = !(mes.userId === currUserInfo.id)
            const avatar = isFriend ? dialog.faceFriend : currUserInfo.cutImage
            return (
                <DialogItemUser
                    prevMessRepeatUser={prevMessRepeatUser}
                    key={index}
                    drawForwardMenu={drawForwardMenu}
                    deleteMessageCb={deleteMessageCb}
                    message={mes}
                    enabledMenu={mes._id == popUpMess}
                    setPopUpHandler={setPopUpHandler}
                    setFormRedact={setFormRedact}
                    friendMessage={isFriend}
                    modeSelection={modeSelection}
                    messageSelect={selectedMessage.includes(mes._id)}
                    toggleSelectMessage={toggleSelectMessage}
                    avatar={avatar}
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
            dispatchAC(setPopUpMess(''))
        }
        if (haveUnreadMsg) {
            props.readAllMsg(String(userInfo._id))
            dispatchAC(setNullUnreadMsg(String(userInfo._id)))
        }
    }

    const onClickDeleteAllMsg = (e: MouseEvent<HTMLButtonElement>) => {
        const idMessages = forwardMenuSet.map(msg => msg.messageId)
        dispatchAC(deleteMsgThunk(idMessages))
        dispatchAC(setForwardMenuSet([]))
        dispatchAC(setModeSelection(false))
        dispatchAC(setStateForm('normal'))
    }

    const toggleStateEmoji = (e: MouseEvent<HTMLImageElement>) => setStateEmoji(!stateEmoji)
    const onClickEmoji = (data:IEmojiData) => {
        setChosenEmoji(data)
        // setValue("message", getValues("message") + chosenEmoji.emoji)
        setValue("message", 'U+' + data.unified)
    }
    return (
        <div className={'dialog_user'}>
            <div className="header_dialog">
                <div className="userinfo_dialog">
                    <b>{drawName(String(userInfo.username), userInfo.firstName, userInfo.lastName)}</b></div>
                <div className="menu_user_dialog">
                    <button>Menu</button>
                    {
                        modeSelection ?
                            <div
                                title='Убрать выделение'
                                className='btn_select_msgs_off'
                                onClick={setModeSelectionOffHandler}
                            >
                                <i>&#128504;</i><i>&#128504;</i><i>&#128504;</i>
                            </div> :
                            <div
                                title='Выделить несколько'
                                className='btn_select_msgs'
                                onClick={setModeSelectionHandler}
                            >
                                <i>&#128504;</i><i>&#128504;</i><i>&#128504;</i>
                            </div>
                    }
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
                      onSubmit={handleSubmit(getCbFromSubmitMessage())}>
                    <img
                        onClick={toggleStateEmoji}
                        className='smile_btn_select_emoji'
                        src={clip}
                    />
                    <input
                        autoFocus
                        {...register('message')}
                        type="text"
                        className="text_enter_dialog"
                        placeholder={setting.textEmptyMessageDialog}
                    />
                    <img
                        onClick={toggleStateEmoji}
                        className='smile_btn_select_emoji'
                        src={smile}
                    />
                    {
                        stateEmoji && <Picker
                            onEmojiClick={(event, data) => onClickEmoji(data)}
                            skinTone='1f3fb'
                            pickerStyle={stylePickerEmoji}
                        />
                    }
                    {
                        stateForm === 'mforw' &&
                        <button
                            className='del_all_btn'
                            onClick={onClickDeleteAllMsg}
                        >Удалить все</button>
                    }
                </form>
            </div>
            {forwardMenuSet.length && stateForm !== 'mforw' &&
                <PortalElements>
                    <ForwardMenu
                        sendForwardMsg={sendForwardMsg}
                        groupList={groupList ? groupList : []}
                        forwardMenuSet={forwardMenuSet}
                        closeForwardMenu={closeForwardMenu}
                        userMsg={getValues('message')}
                    />
                </PortalElements>
            }
            {clipMenu &&
                <PortalElements>
                    <ClipMenu
                    />
                </PortalElements>
            }
        </div>
    )
}
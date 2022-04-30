import {FC, MouseEvent, useLayoutEffect, useRef} from "react";
import './dialogStyle.css'
import {messageType, stateDIalogReducerType} from "../../redux/reducers/dialogReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {DialogItemFriend} from "./dialogItem/dialogItemFriend";
import {DialogItemUser} from "./dialogItem/dialogItemUser";
import {NotMessages} from "./notMessages/NotMessages";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {getDialogInfoThunk, listGroupFoundThunk} from "../../redux/thunk";
import {initStateType} from "../../redux/reducers/userReducers";
import {
    getListUserFoundType,
    menuListReducerType,
    selectUser,
    setModeListAC,
    setNullUnreadMsg
} from "../../redux/reducers/menuListReducer";


type DialogUserType = {
    dialogInfo: stateDIalogReducerType,
    sendMessage: (id: string, message: string, room: string, curId: string) => void
    readAllMsg: (idFriend: string) => void
}

export const DialogUser: FC<DialogUserType> = (props) => {
    const currUserInfo = useSelector<AppStateType, initStateType>(data => data.UserReducers)
    const {usersFound, ...menuInfo} = useSelector<AppStateType, menuListReducerType>(data => data.menuListReducer)
    const dialogInfo = useSelector<AppStateType, stateDIalogReducerType>(data => data.DialogReducer)
    const overFlow = useRef<HTMLDivElement>(null)
    const dialog = props.dialogInfo
    const userInfo = dialog.userInfo
    const messages = dialog.message
    const {register, handleSubmit, setValue} = useForm({shouldUseNativeValidation: true})
    const dispatchAC = useDispatch()
    let haveUnreadMsg = false

    const getUserId = userInfo._id ?
        userInfo._id :
        usersFound?.filter(us => us.username === userInfo.username)[0]['id']
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

    useLayoutEffect(() => {
        const scrollOptions: ScrollToOptions = {
            left: 0,
            top: 10000000,
            behavior: 'auto'
        }
        overFlow.current?.scrollTo(scrollOptions)
    })


    const drawName = () => {
        let name = userInfo.username
        if (userInfo.firstName && userInfo.lastName) return `${name} (${userInfo.firstName} ${userInfo.lastName})`
        if (userInfo.firstName) {
            name = `${name} (${userInfo.firstName})`
        }
        if (userInfo.lastName) {
            name = `${name} (${userInfo.lastName})`
        }
        return name
    }

    const listMessage = (isRead=true) => {
        const msgCurrentFriend = messages?.filter((msg:messageType) => msg.talkingGroupId === dialogInfo.groupInfo?._id)
        console.log(msgCurrentFriend)
        const readMsg = msgCurrentFriend?.filter((msg:messageType) => {
            return isRead ? msg.whoRead.includes(String(currUserInfo.id)) : !msg.whoRead.includes(String(currUserInfo.id))
        })
        return readMsg?.map(mes => {
            if (mes.userId === currUserInfo.id) {
                return (
                    <DialogItemUser message={mes}/>
                )
            } else {
                return (
                    <DialogItemFriend
                        message={mes}
                        userid={currUserInfo.id}
                    />
                )
            }
        })
    }

    const drawMessageRead = () => {
        return listMessage()
    }
    const drawMessageUnread = () => {
        return listMessage(false)
    }

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
            return (
                <>
                    {readMsg}
                </>
            )
        }
    }
    console.log(drawListMessage())


    const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        props.readAllMsg(String(props.dialogInfo.userInfo._id))
        dispatchAC(setNullUnreadMsg(String(props.dialogInfo.userInfo._id)))
    }

    console.log(dialogInfo)
    return (
        <div className={'dialog_user'}>
            <div className="header_dialog">
                <div className="userinfo_dialog"><b>{drawName()}</b></div>
                <div className="menu_user_dialog">
                    <button>Menu</button>
                </div>
            </div>
            {messages ?
                <div ref={overFlow} className="content_dialog" onClick={haveUnreadMsg ? onClickHandler : undefined}>
                    {drawListMessage()}
                </div> :
                <NotMessages/>
            }
            <div className="message_crud_dialog">
                <form className="form_dialog" onSubmit={handleSubmit(onSubmitForm)}>
                    <input
                        {...register('message')}
                        type="text"
                        className="text_enter_dialog"
                    />
                    <input type={'submit'} className="btn_send_msg_dia"/>
                </form>
            </div>
        </div>
    )
}
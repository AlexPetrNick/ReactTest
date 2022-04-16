import {FC, useLayoutEffect, useRef} from "react";
import './dialogStyle.css'
import {stateDIalogReducerType} from "../../redux/reducers/dialogReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../redux/react-redux";
import {DialogItemFriend} from "./dialogItem/dialogItemFriend";
import {DialogItemUser} from "./dialogItem/dialogItemUser";
import {NotMessages} from "./notMessages/NotMessages";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {getDialogInfoThunk, listGroupFoundThunk, listUsersFoundThunk, sendDialogMsgThunk} from "../../redux/thunk";
import {initStateType} from "../../redux/reducers/userReducers";
import {getListUserFoundType} from "../../redux/reducers/menuListReducer";


type DialogUserType = {
    dialogInfo: stateDIalogReducerType,
    seeMessage: (idMessage:string) => void
    sendMessage: (id:string, message:string, room:string, curId:string) => void
}

export const DialogUser: FC<DialogUserType> = (props) => {
    const currUserInfo = useSelector<AppStateType, initStateType>(data => data.UserReducers)
    const foundUser = useSelector<AppStateType, getListUserFoundType[] | undefined >(data => data.menuListReducer.usersFound)
    const overFlow = useRef<HTMLDivElement>(null)
    const dialog = props.dialogInfo
    const userInfo = dialog.userInfo
    const messages = dialog.message
    const {register, handleSubmit, setValue} = useForm({shouldUseNativeValidation:true})
    const dispatch: AppDispatchType = useDispatch()


    console.log(foundUser)
    console.log(dialog)
    console.log(currUserInfo.id)
    const onSubmitForm:SubmitHandler<FieldValues> = (data) => {
        const getUserId = userInfo._id ?
            userInfo._id :
            foundUser?.filter(us => us.username === userInfo.username)[0]['id']
        props.sendMessage(
            getUserId ? getUserId : '',
            data.message,
            dialog.groupInfo?.name ? dialog.groupInfo.name : '',
            currUserInfo.id ? currUserInfo.id : ''
        )
        setValue("message", '')
    }

    useLayoutEffect(() => {
        console.log(overFlow.current)
        const scrollOptions:ScrollToOptions = {
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

    const drawMessage = () => {
        return messages?.map(mes => {
            if (mes.userId === currUserInfo.id) {
                return (
                    <DialogItemUser message={mes}/>
                )
            } else {
                return (
                    <DialogItemFriend
                        seeMessage={props.seeMessage}
                        message={mes}
                        userid={currUserInfo.id}
                    />
                )
            }
        })
    }


    return (
        <div className={'dialog_user'}>
            <div className="header_dialog">
                <div className="userinfo_dialog"><b>{drawName()}</b></div>
                <div className="menu_user_dialog">
                    <button>Menu</button>
                </div>
            </div>
            {messages ?
                <div ref={overFlow} className="content_dialog">{drawMessage()}</div> :
                <NotMessages />
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
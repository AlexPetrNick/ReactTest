import {FC} from "react";
import './dialogStyle.css'
import {stateDIalogReducerType, userInfoType} from "../../redux/reducers/dialogReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../redux/react-redux";
import {DialogItemFriend} from "./dialogItem/dialogItemFriend";
import {DialogItemUser} from "./dialogItem/dialogItemUser";
import {NotMessages} from "./notMessages/NotMessages";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {authUserThunk, getDialogInfoThunk, listGroupFoundThunk, sendDialogMsgThunk} from "../../redux/thunk";

type DialogUserType = {
    dialogInfo: stateDIalogReducerType
}
type messageFormDialogType = {
    message: string
}


export const DialogUser: FC<DialogUserType> = (props) => {
    const userid = useSelector<AppStateType>(data => data.UserReducers.id)
    const dialog = props.dialogInfo
    const userInfo = dialog.userInfo
    const messages = dialog.message
    const {register, handleSubmit, setValue} = useForm({shouldUseNativeValidation:true})
    const dispatch: AppDispatchType = useDispatch()

    const onSubmitForm:SubmitHandler<FieldValues> = (data) => {
        dispatch(sendDialogMsgThunk({message: data.message, username:userInfo.username}))
        dispatch(getDialogInfoThunk(userInfo.username))
        setTimeout(() => {
            dispatch(listGroupFoundThunk())
        }, 100)


        setValue("message", '')
    }





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
            if (mes.userId === userid) {
                return (
                    <DialogItemUser message={mes}/>
                )
            } else {
                return (
                    <DialogItemFriend message={mes}/>
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
                <div className="content_dialog">{drawMessage()}</div> :
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
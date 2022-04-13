import {FC} from "react";
import {messageType} from "../../../redux/reducers/dialogReducer";
import '../dialogStyle.css'
import {useChat} from "../../../socketio/useRoom";
import {getValueLocalStorage} from "../../../Service/Localstorage";

type DialogItemUserType = {
    message: messageType
    seeMessage: (idMessage:string) => void
    userid: string | null
}

export const DialogItemFriend:FC<DialogItemUserType> = (props) => {
    const data = props.message.createDate.split('T')[1].split('.')[0]
    const id = props.userid
    const idCheck = id ? id : ''
    let style = 'wrapper_dialog_fr'
    let readMess = !!props.message.whoRead.filter(el => el === idCheck).length

    if (!readMess) {
        style = 'wrapper_dialog_fr unread'
    }

    return (
        <div className={style}>
            <div className="text_dial_fr">{props.message.text}</div>
            <div
                className="time_msg_fr"
                onMouseEnter={!readMess ? () => {props.seeMessage(props.message._id)} : undefined}
            >{data}</div>
        </div>

    )
}
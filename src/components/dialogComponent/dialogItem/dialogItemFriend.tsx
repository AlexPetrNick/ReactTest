import {FC} from "react";
import {messageType} from "../../../redux/reducers/dialogReducer";
import '../dialogStyle.css'

type DialogItemUserType = {
    message: messageType
}

export const DialogItemFriend:FC<DialogItemUserType> = (props) => {
    const data = props.message.createDate.split('T')[1].split('.')[0]

    return (
        <div className="wrapper_dialog_fr">
            <div className="text_dial_fr">{props.message.text}</div>
            <div className="time_msg_fr">{data}</div>
        </div>

    )
}
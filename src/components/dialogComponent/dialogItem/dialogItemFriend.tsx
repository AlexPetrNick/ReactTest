import React, {FC, MouseEvent} from "react";
import {messageType} from "../../../redux/reducers/dialogReducer";
import '../dialogStyle.css'

type DialogItemUserType = {
    message: messageType
    userid: string | null
    onClickHandler: (e: MouseEvent<HTMLDivElement>) => void
}

export const DialogItemFriend:FC<DialogItemUserType> = (props) => {
    const data = props.message.createDate.split('T')[1].split('.')[0]
    const id = props.userid
    const idCheck = id ? id : ''

    return (
        <div className='wrapper_dialog_fr' onClick={props.onClickHandler}>
            <div className="text_dial_fr">{props.message.text}</div>
            <div className="time_msg_fr"
            >{data}</div>
        </div>

    )
}
import React, {FC, MouseEvent} from "react";
import '../dialogStyle.css'
import {messageType} from "../../../redux/reducers/dialogReducer";

type MessageSettingType = {
    message: messageType
    setFormRedact: (textMessage: string, idMsg: string) => void
    deleteMessageCb: (idMessage: string) => void
    drawForwardMenu: (msg:string, idUser:string) => void
    friendMessage: boolean
}

export const MessageSetting: FC<MessageSettingType> = ({
                                                           setFormRedact, message, deleteMessageCb,
                                                           drawForwardMenu, friendMessage
                                                       }) => {
    const onClickEdit = (e: MouseEvent<HTMLDivElement>) => setFormRedact(message.prevText ? message.prevText : message.text, message._id)
    const onClickDelete = (e: MouseEvent<HTMLDivElement>) => deleteMessageCb(message._id)
    const onClickForward = (e: MouseEvent<HTMLDivElement>) => drawForwardMenu(message.prevText ? message.prevText : message.text, message.userId)
    const styleWrpMenuSett = friendMessage ? 'wrp_menu_msg_sett_fr' : 'wrp_menu_msg_sett'
    return (
        <div className={styleWrpMenuSett}>
            { !friendMessage && <div className='el_menu_dlg' onClick={onClickEdit}>Редактировать</div> }
            <div className='el_menu_dlg' onClick={onClickForward}>Переслать</div>
            { !friendMessage && <div className='el_menu_dlg red_text' onClick={onClickDelete}>Удалить</div> }
        </div>
    )
}
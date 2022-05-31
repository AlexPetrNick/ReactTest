import React, {FC, FocusEventHandler, MouseEvent, useState} from "react";
import {messageType} from "../../../redux/reducers/dialogReducer";
import '../dialogStyle.css'
import {MessageSetting} from "../messageSetting/MessagetSetting";
import {CSSTransition} from "react-transition-group";

const listStyles = {
    styleMessageWrap: ['wrapper_dialog_user', 'wrapper_dialog_fr'],
    styleTextDial: ['text_dial_user', 'text_dial_fr'],
    styleTimeMsg: ['time_msg_user', 'time_msg_fr'],
    styleWrpMenuSett: ['wrp_menu_msg_sett', 'wrp_menu_msg_sett_fr'],
    styleSelect: ['slct_icon', 'slct_icon_fr'],
    getStyle: function (style: string, friend: boolean): string | undefined {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this[style][Number(friend)]
    }
}

type DialogItemUserType = {
    message: messageType
    enabledMenu: boolean
    setPopUpHandler: (id: string) => void
    setFormRedact: (textMessage: string, idMsg: string) => void
    deleteMessageCb: (idMessage: string) => void
    friendName: string
    drawForwardMenu: (msg: string, idUser: string) => void
    friendMessage: boolean
    modeSelection: boolean
    messageSelect: boolean
    toggleSelectMessage: (idUser: string) => void
}

export const DialogItemUser: FC<DialogItemUserType> = ({
                                                           message, enabledMenu, setPopUpHandler,
                                                           setFormRedact, deleteMessageCb, friendName,
                                                           drawForwardMenu, friendMessage, modeSelection,
                                                           messageSelect, toggleSelectMessage
                                                       }) => {
    const data = message.createDate.split('T')[1].split('.')[0]
    const onClickElem = (e: MouseEvent<HTMLDivElement>) => setPopUpHandler(message._id)

    const styleMessageWrap = listStyles.getStyle('styleMessageWrap', friendMessage)
    const styleTextDial = listStyles.getStyle('styleTextDial', friendMessage)
    const styleTimeMsg = listStyles.getStyle('styleTimeMsg', friendMessage)
    const styleWrpMenuSett = listStyles.getStyle('styleWrpMenuSett', friendMessage)
    const styleSelect = listStyles.getStyle('styleSelect', friendMessage)

    return (
        <div className={messageSelect ? `${styleMessageWrap} sclt_msg` : styleMessageWrap}
             onClick={modeSelection ? () => toggleSelectMessage(message._id) : onClickElem}>
            {message.forwarded && <div className='frwd_from_user'>Отправлено от {message.forwarded}</div>}
            <div className={styleTextDial}>{message.prevText ? message.prevText : message.text}</div>
            <div className={styleTimeMsg}>{data}</div>
            {!modeSelection &&
                <CSSTransition
                    in={enabledMenu}
                    timeout={500}
                    classNames={styleWrpMenuSett}
                    mountOnEnter
                    unmountOnExit
                >
                    <MessageSetting
                        deleteMessageCb={deleteMessageCb}
                        message={message}
                        setFormRedact={setFormRedact}
                        drawForwardMenu={drawForwardMenu}
                        friendMessage={friendMessage}
                    />
                </CSSTransition>
            }
            <CSSTransition
                in={modeSelection}
                timeout={300}
                classNames={styleSelect}
                mountOnEnter
                unmountOnExit
            >
                <div
                    className={messageSelect ? `${styleSelect} sclt_msg_box` : styleSelect}
                    onClick={() => toggleSelectMessage(message._id)}
                >&#128505;</div>
            </CSSTransition>
        </div>

    )
}
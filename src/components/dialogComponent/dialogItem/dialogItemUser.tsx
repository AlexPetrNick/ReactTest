import React, {FC, MouseEvent} from "react";
import {messageType} from "../../../redux/reducers/dialogReducer";
import '../dialogStyle.css'
import {MessageSetting} from "../messageSetting/MessagetSetting";
import {CSSTransition} from "react-transition-group";
import noneAvatar from '../../../static/image/noavatar.jpg'

const listStyles = {
    styleMessageWrap: ['wrapper_dialog_user', 'wrapper_dialog_fr'],
    styleMessageWrapText: ['wrapper_dialog_user_text', 'wrapper_dialog_text_fr'],
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
    drawForwardMenu: (msg: string, idUser: string) => void
    friendMessage: boolean
    modeSelection: boolean
    messageSelect: boolean
    toggleSelectMessage: (messageId: string, userId:string) => void
    avatar: string | null
    prevMessRepeatUser?: boolean
}

export const DialogItemUser: FC<DialogItemUserType> = ({
                                                           message, enabledMenu, setPopUpHandler,
                                                           setFormRedact, deleteMessageCb,
                                                           drawForwardMenu, friendMessage, modeSelection,
                                                           messageSelect, toggleSelectMessage, avatar,
                                                           prevMessRepeatUser
                                                       }) => {
    const data = message.createDate.split('T')[1].split('.')[0]
    const onClickElem = (e: MouseEvent<HTMLDivElement>) => setPopUpHandler(message._id)
    const onClickElemArray = (e: MouseEvent<HTMLDivElement>) => {
        toggleSelectMessage(message._id, message.userId)
    }
    const styleMessageWrap = listStyles.getStyle('styleMessageWrap', friendMessage)
    const styleMessageWrapText = listStyles.getStyle('styleMessageWrapText', friendMessage)
    const styleTextDial = listStyles.getStyle('styleTextDial', friendMessage)
    const styleTimeMsg = listStyles.getStyle('styleTimeMsg', friendMessage)
    const styleWrpMenuSett = listStyles.getStyle('styleWrpMenuSett', friendMessage)
    const styleSelect = listStyles.getStyle('styleSelect', friendMessage)
    const avatarUser = avatar ? avatar : noneAvatar

    return (
        <div className={messageSelect ? `${styleMessageWrap} sclt_msg` : styleMessageWrap}>
            {!prevMessRepeatUser ?
                <img src={avatarUser} alt="" className='avatar_user_dialog'/> :
                <div className='repeat_user_message'></div>}
            <div className={messageSelect ? `${styleMessageWrapText} sclt_msg` : styleMessageWrapText}
                 onClick={modeSelection ? onClickElemArray : onClickElem}>
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
                        onClick={onClickElemArray}
                    >&#128505;</div>
                </CSSTransition>
            </div>
        </div>
    )
}
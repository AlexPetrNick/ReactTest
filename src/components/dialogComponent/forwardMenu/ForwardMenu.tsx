import React, {FC, MouseEvent, useState} from "react";
import {getListGroupFoundType} from "../../../redux/reducers/menuListReducer";
import '../dialogStyle.css'
import noAva from '../../../static/image/noavatar.jpg'
import {ItemForwardMenu} from "./ItemForwardMenu";
import {objectForwMsg} from "../../../redux/reducers/dialogReducer";

type ForwardMenuType = {
    sendForwardMsg: (selectedUser:string[]) => void
    groupList: Array<getListGroupFoundType>
    forwardMenuSet: Array<objectForwMsg>
    closeForwardMenu: () => void
    userMsg?: string
}

export const ForwardMenu:FC<ForwardMenuType> = ({forwardMenuSet, groupList,
                                                    closeForwardMenu, sendForwardMsg,
                                                userMsg}) => {
    const selectedMessage = forwardMenuSet.map(msgMenu => msgMenu.messageId)
    const [selectedUser, setSelectedUser] = useState<string[]>([])
    const styleBtn = selectedUser.length ? 'btn_send_frwd' : 'btn_send_frwd disabled_btn'
    const toggleSelectUser = (idUser: string) => {
        if (selectedUser.includes(idUser)) {
            const tempSelectedUser = [...selectedUser]
            tempSelectedUser.splice(tempSelectedUser.indexOf(idUser), 1)
            setSelectedUser([...tempSelectedUser])
        } else {
            setSelectedUser([...selectedUser, idUser])
        }
    }

    const close_forward = (e:MouseEvent<HTMLDivElement>) => closeForwardMenu()

    const drawItems = groupList.map((item:getListGroupFoundType, index) => {
        return <ItemForwardMenu
            toggleSelectUser={toggleSelectUser}
            selectedUser={selectedUser.includes(item.friend.id)}
            key={index}
            idUser={item.friend.id}
            face={item.friend.face ? item.friend.face : noAva}
            username={item.friend.username}
        />
    })

    const drawMsgTop = selectedMessage.length ? 'Количество сообщении:' : 'Пересылаемое сообщение'
    const drawMsgOrCnt = selectedMessage.length > 1 ? selectedMessage.length : selectedMessage[0][1]

    return (
        <div className='wrapper_frwd_menu'>
            <div className='close_frwd_menu'><b onClick={close_forward}>X</b></div>
            <div className='frwd_menu'>
                <div className="header_frwd">
                    <div className='frwd_msg_top_send_to'>{drawMsgTop}</div>
                    <div className='frwd_msg_top'>{drawMsgOrCnt}</div>
                </div>
                <div className="body_frwd">
                    {drawItems}
                </div>
                <div className="btm_frwd">
                    <button onClick={() => sendForwardMsg(selectedUser)} disabled={!selectedUser.length} className={styleBtn}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

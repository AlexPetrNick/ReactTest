import React, {FC, useState, MouseEvent} from "react";
import {getListGroupFoundType} from "../../../redux/reducers/menuListReducer";
import '../dialogStyle.css'
import noAva from '../../../static/image/noavatar.jpg'
import {ItemForwardMenu} from "./ItemForwardMenu";
import {getValueLocalStorage} from "../../../Service/Localstorage";
import {setting} from "../../../config/config";
import {useDispatch} from "react-redux";
import {getDialogInfoThunk, listGroupFoundThunk} from "../../../redux/thunk";

type ForwardMenuType = {
    groupList: Array<getListGroupFoundType>
    message: string
    sendMessageForwardEvent: (id:string, message:string, room:string, curId:string, forw:string) => void
    currentUserId: string
    closeForwardMenu: () => void
    usernameCurrDlg: string
}

export const ForwardMenu:FC<ForwardMenuType> = ({message, groupList, sendMessageForwardEvent,
                                                currentUserId, closeForwardMenu, usernameCurrDlg}) => {
    const dispatch = useDispatch()
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

    const sendForwardMsg = () => {
        const filtred = groupList.filter((group:getListGroupFoundType) => selectedUser.includes(group.friend.id))
        const nameForw = getValueLocalStorage(setting.nameForwardVariable)
        filtred.map((group:getListGroupFoundType) => {
            sendMessageForwardEvent(group.friend.id, message, group.name, currentUserId, String(nameForw))
        })
        closeForwardMenu()
        dispatch(listGroupFoundThunk([]))
        dispatch(getDialogInfoThunk(usernameCurrDlg))
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

    return (
        <div className='wrapper_frwd_menu'>
            <div className='close_frwd_menu'><b onClick={close_forward}>X</b></div>
            <div className='frwd_menu'>
                <div className="header_frwd">
                    <div className='frwd_msg_top_send_to'>Переслать сообщение:</div>
                    <div className='frwd_msg_top'>{message}</div>
                </div>
                <div className="body_frwd">
                    {drawItems}
                </div>
                <div className="btm_frwd">
                    <button onClick={() => sendForwardMsg()} disabled={!selectedUser.length} className={styleBtn}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

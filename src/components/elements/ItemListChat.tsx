import {FC, MouseEvent} from "react";
import '../../App.css'
import {useDispatch} from "react-redux";
import {getDialogInfoThunk} from "../../redux/thunk";
import {selectUser, setNullUnreadMsg} from "../../redux/reducers/menuListReducer";
import {setModeDialog} from "../../redux/reducers/dialogReducer";
import noAva from '../../static/image/noavatar.jpg'

type ItemListChatType = {
    id: string,
    username: string,
    dateLastMessage: string,
    lastMessage: string,
    selectedUser?: string
    unreadMsg: number
    face: string | null
}

export const ItemListChat: FC<ItemListChatType> = (props) => {
    const dispatchAC = useDispatch()

    const onClickList = (e:MouseEvent<HTMLDivElement>) => {
        dispatchAC(setModeDialog('dialog'))
        dispatchAC(getDialogInfoThunk(props.username))
        dispatchAC(selectUser(props.id))
        dispatchAC(setNullUnreadMsg(props.id))
    }

    const style = props.selectedUser ? "chat_short_in_list selected_user" : "chat_short_in_list"
    const haveAvatar = props.face ? props.face : noAva

    return (
        <div className={style} onClick={onClickList}>
            <img className="avatar_list_group" src={haveAvatar} />
            <div className="info_short_list">
                <div className="name_date_chat_short">
                    <div className="name_chats"><b>{props.username}</b></div>
                    <div className="time_last_msg_short"><b>{props.dateLastMessage}</b></div>
                </div>
                <div className="last_msg_short_wr">
                    <div className="last_msg_short">{props.lastMessage}</div>
                    <div className="icons_read"><b>{props.unreadMsg !== 0 ? props.unreadMsg : null}</b></div>
                </div>
            </div>
        </div>
    )
}
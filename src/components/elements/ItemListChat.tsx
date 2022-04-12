import {FC, MouseEvent} from "react";
import '../../App.css'
import {useDispatch} from "react-redux";
import {getDialogInfoThunk} from "../../redux/thunk";

type ItemListChatType = {
    username: string,
    dateLastMessage: string,
    lastMessage: string
}

export const ItemListChat: FC<ItemListChatType> = (props) => {
    const dispatchAC = useDispatch()

    const onClickList = (e:MouseEvent<HTMLDivElement>) => {
        dispatchAC(getDialogInfoThunk(props.username))
    }

    return (
        <div className="chat_short_in_list" onClick={onClickList}>
            <div className="avatar_list"> </div>
            <div className="info_short_list">
                <div className="name_date_chat_short">
                    <div className="name_chats"><b>{props.username}</b></div>
                    <div className="time_last_msg_short"><b>{props.dateLastMessage}</b></div>
                </div>
                <div className="last_msg_short_wr">
                    <div className="last_msg_short">{props.lastMessage}</div>
                    <div className="icons_read"> </div>
                </div>
            </div>
        </div>
    )
}
import {ItemListChat} from "../elements/ItemListChat";
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {getListGroupFoundType} from "../../redux/reducers/menuListReducer";
import {listGroupFoundThunk} from "../../redux/thunk";
import {LoadingList} from "../elements/LoadingList";


export const ListMenuGroup: FC = () => {
    const stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const selectedUser = useSelector((state: AppStateType) => state.menuListReducer.selectedUser)
    const dispatchAC = useDispatch()


    const listGroupUser = stateList.groupList?.map((us: getListGroupFoundType, index) => {
        const data = us.talking.createDate.split('T')[1].split('.')[0]
        const selected = us.friend.id === selectedUser ? us.friend.id : ""
        return (
            <ItemListChat
                key={index}
                id={us.friend.id}
                username={us.friend.username}
                dateLastMessage={data}
                lastMessage={us.talking.prevText ? us.talking.prevText : us.talking.text}
                selectedUser={selected}
                unreadMsg={us.cntUnreadMsg}
                face={us.friend.face}
            />
        )
    })

    useEffect(() => {
        dispatchAC(listGroupFoundThunk([]))
    }, [])

    return (
        <div className="list_chats">
            {
                stateList.isLoadingList ?
                    <LoadingList/> :
                    <div className="list_group_style">{listGroupUser}</div>
            }
        </div>
    )
}
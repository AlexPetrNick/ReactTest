import {ItemListChat} from "../elements/ItemListChat";
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {actionMenuReducerType, getListGroupFoundType} from "../../redux/reducers/menuListReducer";
import {listGroupFoundThunk, listUsersFoundThunk} from "../../redux/thunk";
import {LoadingList} from "../elements/LoadingList";
import {stat} from "fs";


export const ListMenuGroup:FC = () => {
    const stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const selectedUser = useSelector((state: AppStateType) => state.menuListReducer.selectedUser)
    const dispatchAC = useDispatch()


    const listGroupUser = stateList.groupList?.map((us: getListGroupFoundType) => {
        console.log(us)
        const data = us.talking.createDate.split('T')[1].split('.')[0]
        const selected = us.friend.id === selectedUser ? us.friend.id : ""
        return (
            <ItemListChat
                id={us.friend.id}
                username={us.friend.username}
                dateLastMessage={data}
                lastMessage={us.talking.text}
                selectedUser={selected}
            />
        )
    })


    useEffect(() => {
        dispatchAC(listGroupFoundThunk())
    }, [])

    console.log(stateList.isLoadingList)

    return (
        <div className="list_chats">
            {
                stateList.isLoadingList ?
                    <LoadingList /> :
                    <div className="list_group_style">{listGroupUser}</div>
            }

        </div>
    )
}
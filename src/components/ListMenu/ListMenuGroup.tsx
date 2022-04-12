import {ItemListChat} from "../elements/ItemListChat";
import {FC, MouseEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {getListGroupFoundType, getListUserFoundType} from "../../redux/reducers/menuListReducer";
import {ListMenuFoundElement} from "./ListMenuFoundElement/ListMenuFoundElement";


export const ListMenuGroup:FC = () => {
    let stateList = useSelector((state: AppStateType) => state.menuListReducer)


    const listGroupUser = stateList.groupList?.map((us: getListGroupFoundType) => {
        const data = us.talking.createDate.split('T')[1].split('.')[0]
        return (
            <ItemListChat
                username={us.friend.username}
                dateLastMessage={data}
                lastMessage={us.talking.text}
            />
        )
    })

    return (
        <div className="list_chats">
            {listGroupUser}
        </div>
    )
}
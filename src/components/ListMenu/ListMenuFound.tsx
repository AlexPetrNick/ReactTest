import {ItemListChat} from "../elements/ItemListChat";
import {FC} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {ListMenuFoundElement} from "./ListMenuFoundElement/ListMenuFoundElement";
import {getListUserFoundType} from "../../redux/reducers/menuListReducer";


export const ListMenuFound: FC = () => {
    let stateList = useSelector((state: AppStateType) => state.menuListReducer)
    console.log(stateList)


    const listFoundUser = stateList.usersFound?.map((us: getListUserFoundType) => {
        return (
            <ListMenuFoundElement
                username={us.username}
                firstName={us.firstName ? us.firstName : undefined}
                lastName={us.lastName ? us.lastName : undefined}
                email={us.email ? us.email : undefined}
            />
        )
    })

    return (
        <div className="list_chats">
            {listFoundUser}
        </div>
    )
}


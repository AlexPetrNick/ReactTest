import {ItemListChat} from "../elements/ItemListChat";
import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../redux/react-redux";
import {ListMenuFoundElement} from "./ListMenuFoundElement/ListMenuFoundElement";
import {getListUserFoundType} from "../../redux/reducers/menuListReducer";
import {listUsersFoundThunk} from "../../redux/thunk";


export const ListMenuFound: FC = () => {
    let stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()


    useEffect(() => {
        dispatch(listUsersFoundThunk())
    }, [])

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


import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/react-redux";
import {ListMenuFoundElement} from "./ListMenuFoundElement/ListMenuFoundElement";
import {getListUserFoundType} from "../../redux/reducers/menuListReducer";
import {listUsersFoundThunk} from "../../redux/thunk";
import {LoadingList} from "../elements/LoadingList";
import {FindComponent} from "../findElements/FindComponent";
import './elementfoundmenu.css'

export const ListMenuFound: FC = () => {
    const stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listUsersFoundThunk([]))
    }, [dispatch])
    const getListFoundUser = () => {
        const listUser = stateList.usersFound
        if (listUser) {
            return listUser.map((us: getListUserFoundType, i) => {
                return (
                    <ListMenuFoundElement
                        key={i}
                        username={us.username}
                        firstName={us.firstName ? us.firstName : undefined}
                        lastName={us.lastName ? us.lastName : undefined}
                        email={us.email ? us.email : undefined}
                    />
                )
            })
        } else {
            return []
        }
    }

    const listFoundUser = getListFoundUser()

    return (
        <div className="list_chats">
            <div className="wrapper_for_element_find">
                <FindComponent thunkGet={listUsersFoundThunk}/>
            </div>
            <div className="field_found_users">
                {stateList.isLoadingList ?
                    <LoadingList/> :
                    listFoundUser
                }
            </div>
        </div>
    )
}


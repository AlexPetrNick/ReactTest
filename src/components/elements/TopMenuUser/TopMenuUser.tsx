import "./topmenuuser.css"
import {AppDispatchType, AppStateType} from "../../../redux/react-redux";
import {useDispatch, useSelector} from "react-redux";
import {FC, MouseEvent, useEffect} from "react";
import {setModeListAC} from "../../../redux/reducers/menuListReducer";
import {listUsersFoundThunk} from "../../../redux/thunk";


export const TopMenuUser:FC = () => {
    const stateList = useSelector((state:AppStateType) => state.menuListReducer)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()

    const onClickSetMenu = (e: MouseEvent<|HTMLDivElement>) => {
        let typeMenu = ""
        if (stateList.mode === "menu") {
            dispatchAC(setModeListAC("group"))
        } else {
            dispatchAC(setModeListAC("menu"))
        }
    }


    const drawBurger = () => {
        if (stateList.mode === "menu") {
            return (
                <div className="elem_burger_close_one">&#10006;</div>
            )
        }
        return (
            <>
                <div className="elem_burger">&#9776;</div>
            </>
        )
    }

    return (
        <div className="wrapper_top_menu" onClick={onClickSetMenu}>
            <div className="burger_icon">
                {drawBurger()}
            </div>
            <div className="username_top"><b>User</b></div>
        </div>
    )
}
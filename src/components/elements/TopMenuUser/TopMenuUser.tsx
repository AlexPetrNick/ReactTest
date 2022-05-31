import "./topmenuuser.css"
import {AppDispatchType, AppStateType} from "../../../redux/react-redux";
import {useDispatch, useSelector} from "react-redux";
import React, {FC, MouseEvent} from "react";
import {setModeListAC} from "../../../redux/reducers/menuListReducer";
import {initUserStateType} from "../../../redux/reducers/userReducers";


export const TopMenuUser:FC = () => {
    const stateList = useSelector((state:AppStateType) => state.menuListReducer)
    const stateUser = useSelector<AppStateType, initUserStateType>(data => data.UserReducers)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()

    const onClickSetMenu = (e: MouseEvent<|HTMLDivElement>) => {
        const typeMenu = ""
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
            <div className="username_top"><b>{stateUser.username}</b></div>
        </div>
    )
}
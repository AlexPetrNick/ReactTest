import {NotAuth} from "./NotAuth";
import React, {FC} from "react";
import {MainContainer} from "./MainContainer";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/react-redux";
import {initUserStateType} from "../redux/reducers/userReducers";

export const WorkAreaComponent:FC = () => {
    const { isAuth } = useSelector<AppStateType, initUserStateType>((state) => state.UserReducers)

    return (
        <div className="App">
            { isAuth ? <MainContainer/> :
                <NotAuth />
            }
        </div>
    )
}
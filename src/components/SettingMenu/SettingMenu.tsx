import React, {FC} from "react";
import './settingmenu.css'
import {initUserStateType} from "../../redux/reducers/userReducers";
import {ZipMenu} from "./elements/zipMenu";
import {AboutMe} from "./AboutMe/AboutMe";

type settingMenuType = {
    stateUser: initUserStateType
}
export const SettingMenu:FC<settingMenuType> = ({stateUser}) => {
    const dataUser = {
        username: stateUser.username,
        firstName: stateUser.firstName,
        lastName: stateUser.lastName,
        email: stateUser.email ? stateUser.email : null
    }

    const avatarData = {
        original: stateUser.originalImage,
        cut: stateUser.cutImage
    }

    return (
        <div className='wrapper_setting'>
            <h2>Настройки</h2>
            <div className="wrapper_items_setting">
                <AboutMe avatarData={avatarData}/>
                <ZipMenu
                    fieldsMenu={dataUser}
                    uneditField={['username']}
                />
            </div>
        </div>
    )
}
import {FC} from "react";
import './settingmenu.css'
import {initUserStateType} from "../../redux/reducers/userReducers";
import {ZipMenu} from "./elements/zipMenu";

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

    return (
        <div className='wrapper_setting'>
            <h2>Настройки</h2>
            <div className="wrapper_items_setting">
                <ZipMenu fieldsMenu={dataUser} uneditField={['username']} />
            </div>
        </div>
    )
}
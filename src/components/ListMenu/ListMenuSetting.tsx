import {FC, MouseEvent} from "react";
import './elementfoundmenu.css'
import {ListMenuSettingElement} from "./ListMenuFoundElement/ListMenuSettingElement";
import {useDispatch} from "react-redux";
import {setModeListAC} from "../../redux/reducers/menuListReducer";


export const ListMenuSetting:FC = () => {
    const dispatchAC = useDispatch()

    const onClickFind = (e:MouseEvent<HTMLDivElement>) => {
        dispatchAC(setModeListAC("find"))
    }

    const onClickFriend = (e:MouseEvent<HTMLDivElement>) => {
        dispatchAC(setModeListAC("group"))
    }

    return (
        <div className="list_chats_setting">
            <div onClick={onClickFind}>
                <ListMenuSettingElement itemName={"Поиск"}/>
            </div>
            <div onClick={onClickFriend}>
                <ListMenuSettingElement itemName={"Друзья"}/>
            </div>
            <ListMenuSettingElement itemName={"Выход"}/>
        </div>
    )
}
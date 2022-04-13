import {FC, MouseEvent, useEffect, useRef, useState} from "react";
import '../App.css'
import {ListMenuGroup} from "./ListMenu/ListMenuGroup";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../redux/react-redux";
import {ListMenuSetting} from "./ListMenu/ListMenuSetting";
import {ListMenuFound} from "./ListMenu/ListMenuFound";
import {listGroupFoundThunk, listUsersFoundThunk} from "../redux/thunk";
import {setModeListAC} from "../redux/reducers/menuListReducer";
import {DialogEmpty} from "./dialogComponent/dialogEmpty";
import {DialogUser} from "./dialogComponent/dialogUser";
import {useChat} from "../socketio/useRoom";
import {clearStorage} from "../Service/Localstorage";


export const MainContainer:FC = (props) => {
    const stateList = useSelector((state:AppStateType) => state.menuListReducer)
    const stateListDialog = useSelector((state:AppStateType) => state.DialogReducer)
    const stateUser = useSelector((state:AppStateType) => state.UserReducers)
    const {seeMessage} = useChat(stateUser.rooms, stateUser.id)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()


    const drawMenu = () => {
        if (stateList.mode === "find") return <ListMenuFound />
        if (stateList.mode === "menu") return <ListMenuSetting />
        return <ListMenuGroup />
    }

    const drawDialog = () => {
        if (stateListDialog.userInfo.username) return <DialogUser seeMessage={seeMessage} dialogInfo={stateListDialog} />
        return <DialogEmpty />
    }

    const onClickButtonAddUser = (e:MouseEvent<HTMLButtonElement>) => {
        dispatch(listUsersFoundThunk())
        dispatchAC(setModeListAC('find'))
    }

    const onClickButtonSeeGroup = (e:MouseEvent<HTMLButtonElement>) => {
        dispatch(listGroupFoundThunk())
        dispatchAC(setModeListAC('group'))
    }



    return <div className={'wrapper_main'} >
        <div className="wrapper_left">
            <div className="user_info">
                <div className="wrapper_user_info">
                    <div className="avatar_user"></div>
                    <div className="data_user">
                        <div className="name_user"><b>Тестовый Авторизованный</b></div>
                        <div className="username_top">reactexpress</div>
                        <div className="status">В стадий разработки</div>
                    </div>
                </div>
            </div>
            <div className="find_block">
                <input
                    className="field_for_finding_text"
                    type="text"
                    name=""
                    id=""
                    placeholder={'Введите хотя бы 3 символа для поиска'}
                />
                {stateList.mode != 'find' ?
                    <button className={'button_add_user'} onClick={onClickButtonAddUser}>+</button> :
                    <button className={'button_add_user'} onClick={onClickButtonSeeGroup}> x</button>
                }
            </div>
            <div className="menu_user_list">
                <button className='menu_user_list_btn'>Настройка</button>
            </div>
            {drawMenu()}
        </div>
        <div className="wrapper_right">
            {drawDialog()}

        </div>
    </div>
}
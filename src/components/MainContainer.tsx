import {FC} from "react";
import '../App.css'
import {ListMenuGroup} from "./ListMenu/ListMenuGroup";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/react-redux";
import {ListMenuSetting} from "./ListMenu/ListMenuSetting";
import {ListMenuFound} from "./ListMenu/ListMenuFound";
import {DialogEmpty} from "./dialogComponent/dialogEmpty";
import {DialogUser} from "./dialogComponent/dialogUser";
import {useChat} from "../socketio/useRoom";
import {TopMenuUser} from "./elements/TopMenuUser/TopMenuUser";
import {initUserStateType} from "../redux/reducers/userReducers";
import {LoadingMain} from "./elements/LoadingMain";
import {SettingMenu} from "./SettingMenu/SettingMenu";


export const MainContainer: FC = (props) => {
    const {rooms, ...authInfo} = useSelector<AppStateType, initUserStateType>((state: AppStateType) => state.UserReducers)
    const stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const stateListDialog = useSelector((state: AppStateType) => state.DialogReducer)
    const {
        isLoading,
        ...stateUser
    } = useSelector<AppStateType, initUserStateType>((state: AppStateType) => state.UserReducers)
    const {
        sendMessageEvent,
        readAllMsg
    } = useChat(rooms, stateUser.id)


    const drawMenu = () => {
        if (stateList.mode === "find") return <ListMenuFound/>
        if (stateList.mode === "menu") return <ListMenuSetting/>
        return <ListMenuGroup />
    }

    const drawDialog = () => {
        if (stateListDialog.mode === "dialog") {
            if (stateListDialog.userInfo.username) {
                return <DialogUser
                    readAllMsg={readAllMsg}
                    sendMessage={sendMessageEvent}
                    dialogInfo={stateListDialog}
                />
            }
            return <DialogEmpty/>
        } else {
            return <SettingMenu stateUser={authInfo}/>
        }
    }

    return (
        <>
            {
                isLoading ?
                    <LoadingMain/>
                    :
                    <div className={'wrapper_main'}>
                        <div className="wrapper_left">
                            <TopMenuUser/>
                            {drawMenu()}
                        </div>
                        <div className="wrapper_right">
                            {drawDialog()}
                        </div>
                    </div>
            }
        </>
    )
}
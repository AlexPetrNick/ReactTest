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
import {initStateType} from "../redux/reducers/userReducers";
import {LoadingMain} from "./elements/LoadingMain";


export const MainContainer: FC = (props) => {
    const userInfoRooms = useSelector<AppStateType, Array<string> | undefined>((state: AppStateType) => state.UserReducers.rooms)
    const stateList = useSelector((state: AppStateType) => state.menuListReducer)
    const stateListDialog = useSelector((state: AppStateType) => state.DialogReducer)
    const {
        isLoading,
        ...stateUser
    } = useSelector<AppStateType, initStateType>((state: AppStateType) => state.UserReducers)
    const {seeMessage, sendMessageEvent} = useChat(userInfoRooms, stateUser.id)


    const drawMenu = () => {
        if (stateList.mode === "find") return <ListMenuFound/>
        if (stateList.mode === "menu") return <ListMenuSetting/>
        return <ListMenuGroup/>
    }

    const drawDialog = () => {
        if (stateListDialog.userInfo.username) {
            return <DialogUser
                seeMessage={seeMessage}
                sendMessage={sendMessageEvent}
                dialogInfo={stateListDialog}
            />
        }
        return <DialogEmpty/>
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
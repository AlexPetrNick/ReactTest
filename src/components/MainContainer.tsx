import {FC} from "react";
import '../App.css'
import {ListMenuGroup} from "./ListMenu/ListMenuGroup";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../redux/react-redux";
import {ListMenuSetting} from "./ListMenu/ListMenuSetting";
import {ListMenuFound} from "./ListMenu/ListMenuFound";
import {DialogEmpty} from "./dialogComponent/dialogEmpty";
import {DialogUser} from "./dialogComponent/dialogUser";
import {useChat} from "../socketio/useRoom";
import {TopMenuUser} from "./elements/TopMenuUser/TopMenuUser";


export const MainContainer:FC = (props) => {
    const stateList = useSelector((state:AppStateType) => state.menuListReducer)
    const stateListDialog = useSelector((state:AppStateType) => state.DialogReducer)
    const stateUser = useSelector((state:AppStateType) => state.UserReducers)
    const {seeMessage, sendMessageEvent} = useChat(stateUser.rooms, stateUser.id)


    const drawMenu = () => {
        if (stateList.mode === "find") return <ListMenuFound />
        if (stateList.mode === "menu") return <ListMenuSetting />
        return <ListMenuGroup />
    }

    const drawDialog = () => {
        if (stateListDialog.userInfo.username) {
            return <DialogUser
                seeMessage={seeMessage}
                sendMessage={sendMessageEvent}
                dialogInfo={stateListDialog}
            />
        }
        return <DialogEmpty />
    }


    return <div className={'wrapper_main'} >
        <div className="wrapper_left">
            <TopMenuUser />
            {drawMenu()}
        </div>
        <div className="wrapper_right">
            {drawDialog()}

        </div>
    </div>
}
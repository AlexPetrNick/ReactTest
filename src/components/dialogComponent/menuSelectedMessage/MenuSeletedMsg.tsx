import React, {FC} from "react";
import '../dialogStyle.css'
import {objectForwMsg, setForwardMenuSet} from "../../../redux/reducers/dialogReducer";
import {useDispatch} from "react-redux";

type MenuSeletedMsgType = {
    forwardMenuSet: objectForwMsg[]
}

export const MenuSeletedMsg:FC<MenuSeletedMsgType> = ({forwardMenuSet}) => {
    const dispatchAC = useDispatch()

    return (
        <div className='wrp_menu_slted_msg'>
            <div>Количество выбранных сообщении: {forwardMenuSet.length}</div>
            <div onClick={() => dispatchAC(setForwardMenuSet([]))} className='menu_slted_msg_clear'>X</div>
        </div>
    )
}
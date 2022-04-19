import {FC, MouseEvent} from "react";
import '../elementfoundmenu.css'
import {useDispatch} from "react-redux";

type ListMenuSettingElementType = {
    itemName: string,
    selected?: string
}

export const ListMenuSettingElement: FC<ListMenuSettingElementType> = ({itemName, selected}) => {


    return (
        <div className={'wrapper_elem_setting'}>
            <b>{itemName}</b>
        </div>
    )
}
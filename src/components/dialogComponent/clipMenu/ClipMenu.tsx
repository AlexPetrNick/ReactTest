import React, {FC, useState, MouseEvent} from "react";
import './clip_menu_style.css'
import {setting} from "../../../config/config";

export type SelectedGroupType = 'Аватарки' | 'Фото' | 'Видео' | 'Документы' | null

export const ClipMenu: FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<SelectedGroupType>('Видео')
    const [itemsSelectedGroup, setItemsSelectedGroup] = useState<string[]>([])

    const nameItemsGroup: SelectedGroupType[] = ['Аватарки', 'Фото', 'Видео', 'Документы']
    const drawItemsGroup = nameItemsGroup.map((items: SelectedGroupType, index) => {
        const selected = items === selectedGroup
        return (
            <ClipMenuItemGroup
                name={items}
                key={index}
                selected={selected}
                setSelectedGroup={setSelectedGroup}
            />
        )
    })
    return (
        <div className='wrapper_clip_menu'>
            <div className="clip_menu">
                <div className="clip_menu_grp_select">
                    {drawItemsGroup}
                </div>
                <div className="clip_menu_items_group">
                    {itemsSelectedGroup.length ?
                        <div className="grid_items"></div> :
                        <div className="empty_items_menu">
                            {setting.textEmptyClipItems}
                            <div className='question_add'>Добавить?</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}



interface IClipMenuItemGroup {
    name: SelectedGroupType,
    selected: boolean,
    setSelectedGroup: (itemsSelectedGroup: SelectedGroupType) => void
}

export const ClipMenuItemGroup: FC<IClipMenuItemGroup> = ({name, selected, setSelectedGroup}) => {
    const selectedItem = !selected ? 'clip_menu_grp_item' : 'clip_menu_grp_item selected_items_group'
    const onClickSetGroup = (e: MouseEvent<HTMLDivElement>) => setSelectedGroup(name)
    return (
        <div className={selectedItem} onClick={onClickSetGroup}>
            {name}
        </div>
    )
}
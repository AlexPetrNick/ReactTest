import React, {FC} from "react";
import './dialogStyle.css'


export const DialogEmpty:FC = () => {
    return (
        <div className={'start_message'}>
            <i>
                Пока не выбрано ни одного чата, чтобы начать общаться выберите чат
                или найдите знакомых через поиск
            </i>
        </div>
    )
}
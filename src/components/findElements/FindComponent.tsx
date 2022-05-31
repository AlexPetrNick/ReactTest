import React, {ChangeEvent, MouseEvent, FC, useState} from "react";
import "./findElement.css"
import {setting} from "../../config/config";
import {useDispatch} from "react-redux";
import {actionMenuReducerType} from "../../redux/reducers/menuListReducer";
import {Dispatch} from "redux";
import {dataArrayQueryType} from "../../DAL/menuRequest";


type initFindComponentType = {
    thunkGet: (data:dataArrayQueryType) => (dispatch: Dispatch<actionMenuReducerType>) => void,
}

export const FindComponent:FC<initFindComponentType> = ({thunkGet}) => {
    const [text, setText] = useState<string>('')
    const dispatch = useDispatch()
    const onChangeText = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const textValue = e.currentTarget.value
        setText(textValue)
        if (text.length >= Number(setting.lenSymbFromSearch)) dispatch(thunkGet([{filter: text}]))
        if (text.length === 0) dispatch(thunkGet([]))
    }
    const onClickClear = (e:MouseEvent<HTMLDivElement>) => {
        setText('')
        dispatch(thunkGet([]))
    }

    return (
        <div className='wrapper_find_element'>
            <textarea
                className='textarea_find_elem'
                autoFocus={true}
                placeholder={'Введите как минимум 3 символа для поиска'}
                wrap='off'
                value={text}
                onChange={onChangeText}
                maxLength={35}
            ></textarea>
            {!!text &&<div
                onClick={onClickClear}
                className='clear_filter_text'
            >&times;</div>}
        </div>
    )
}
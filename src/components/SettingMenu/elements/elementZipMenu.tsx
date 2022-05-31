import React, {ChangeEvent, FC, FocusEvent, MouseEvent, useState} from "react";
import {TranslateWord} from "../../../config/translate";

type ElementZipMenuType = {
    titlePosition: string,
    valueField: string | null,
    editable: boolean,
    changeFieldState: (field: string, value: string) => void
}

export const ElementZipMenu: FC<ElementZipMenuType> = ({
                                                           titlePosition, valueField, editable, changeFieldState
                                                       }) => {
    const [modeEdit, setModeEdit] = useState<'editable' | 'fix'>('fix')

    const onDoubleClick = (e: MouseEvent<HTMLDivElement>) => setModeEdit('editable')
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => setModeEdit('fix')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeFieldState(titlePosition, e.currentTarget.value)

    const drawNameField = TranslateWord(titlePosition)

    return (
        <div className="item_body_zip">

            <b>{drawNameField} {editable && <i title={'Двойной клик для редактирования'}>&#9998;</i>}</b>
            {
                editable ?
                    modeEdit === 'editable' ?
                        <input autoFocus type="text" className="input_zip" value={String(valueField)} onBlur={onBlurHandler}
                               onChange={onChangeHandler}/> :
                        <div className="data_setting_zip" onDoubleClick={onDoubleClick}>{valueField}</div>
                    :
                    <div className="data_setting_zip">{String(valueField)}</div>
            }
        </div>
    )
}
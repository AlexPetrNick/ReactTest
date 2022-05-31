import React, {FC, MouseEvent, useState} from "react";
import './zipmenu.css'
import {ElementZipMenu} from "./elementZipMenu";
import {useDispatch} from "react-redux";
import {updateUserThunk} from "../../../redux/thunk";


type initType = {
    fieldsMenu: {
        [key:string]: string | null
    },
    uneditField: string[]
}


export const ZipMenu: FC<initType> = (props) => {
    const [collapse, setCollapse] = useState<boolean>(false)
    const [stateObject, setStateObject] = useState(props.fieldsMenu)
    const dispatchAC = useDispatch()
    const changeFieldState = (field:string, value:string) => setStateObject({...stateObject, [`${field}`]: value})
    const changeState = JSON.stringify(stateObject) !== JSON.stringify(props.fieldsMenu)

    const drwItemBody = () => {
        const initObj = stateObject
        const keys = Object.keys(initObj)
        const value = Object.values(initObj)
        return keys.map((keyElem: string, index) => {
            return (
                <ElementZipMenu titlePosition={keyElem} valueField={value[index]}
                                editable={!(props.uneditField.includes(keyElem))}
                                changeFieldState={changeFieldState} key={index}
                />
            )
        })
    }
    const onClickCollapse = (e:MouseEvent<HTMLDivElement>) => setCollapse(!collapse)
    const onClickReset = (e:MouseEvent<HTMLButtonElement>) => setStateObject(props.fieldsMenu)
    const onClickSave = (e:MouseEvent<HTMLButtonElement>) => dispatchAC(updateUserThunk(stateObject))


    return (
        <div className='wrapper_zip_menu'>

            <div className="header_wrapper_zip" onClick={onClickCollapse}>
                <div className="header_zip"><b>Персональные данные</b></div>
                <div className={!collapse ? "btn_collapse" : "btn_collapse_open"}><b>&#10148;</b></div>
            </div>
            {!collapse &&
                <>
                    <div className="body_zip">
                        {drwItemBody()}
                    </div>
                    <div className="buttons_manage_zip">
                        <button className={`btn_save_zip ${!changeState && 'disabled_btn_zip'}`}
                                onClick={onClickSave}
                        >Сохранить</button>
                        <button className={`btn_reset_zip ${!changeState && 'disabled_btn_zip'}`}
                            onClick={onClickReset}
                        >Сбросить</button>
                    </div>
                </>
            }
        </div>
    )
}
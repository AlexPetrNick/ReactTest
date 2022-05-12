import {ChangeEvent, FC, MouseEvent, FocusEventHandler, useState, FormEventHandler, FormEvent} from "react";
import './zipmenu.css'
import {ElementZipMenu} from "./elementZipMenu";
import {useDispatch} from "react-redux";
import {updateUserThunk} from "../../../redux/thunk";
import AvatarEditor from 'react-avatar-editor'
import {setting, settingArray} from "../../../config/config";
import {logDOM} from "@testing-library/react";
import {loadImageToServer} from "../../../DAL/authRequest";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {log} from "util";


type initType = {
    fieldsMenu: {
        [key:string]: string | null
    },
    uneditField: string[]
}


export const ZipMenu: FC<initType> = (props) => {
    const [image, setImage] = useState<string>()
    const [collapse, setCollapse] = useState<boolean>(false)
    const [stateObject, setStateObject] = useState(props.fieldsMenu)
    const dispatchAC = useDispatch()
    const { register, handleSubmit, watch, resetField, getValues } = useForm();
    const changeFieldState = (field:string, value:string) => setStateObject({...stateObject, [`${field}`]: value})
    const changeState = JSON.stringify(stateObject) !== JSON.stringify(props.fieldsMenu)
    const filePath = watch('file')
    const drwItemBody = () => {
        const initObj = stateObject
        const keys = Object.keys(initObj)
        const value = Object.values(initObj)
        return keys.map((keyElem: string, index) => {
            return (
                <ElementZipMenu titlePosition={keyElem} valueField={value[index]}
                                editable={!(props.uneditField.includes(keyElem))}
                                changeFieldState={changeFieldState}
                />
            )
        })
    }
    const onClickCollapse = (e:MouseEvent<HTMLDivElement>) => setCollapse(!collapse)
    const onClickReset = (e:MouseEvent<HTMLButtonElement>) => setStateObject(props.fieldsMenu)
    const onClickSave = (e:MouseEvent<HTMLButtonElement>) => dispatchAC(updateUserThunk(stateObject))
    const onFormSubmit:SubmitHandler<FieldValues> = (data) => {
        loadImageToServer(data.file[0])
            .then(data => {
                return data.blob()
            })
            .then(blob => {
                const a = URL.createObjectURL(blob)
                setImage(a)
            })


    }
    const onClickClearImage = (e:MouseEvent<HTMLButtonElement>) => resetField('file')


    return (
        <div className='wrapper_zip_menu'>
            {image && <img src={image} />}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input type="file" {...register('file')}/>
                <input type="submit"/>
            </form>
            {/*{*/}

            {/*    filePath ?*/}
            {/*        <>*/}
            {/*            /!*<AvatarEditor*!/*/}
            {/*            /!*    image={filePath}*!/*/}
            {/*            /!*    width={250}*!/*/}
            {/*            /!*    height={250}*!/*/}
            {/*            /!*    border={50}*!/*/}
            {/*            /!*    scale={1.2}*!/*/}
            {/*            <img src={filePath} alt=""/>*/}
            {/*            <button onClick={onClickClearImage}></button>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <div>*/}
            {/*            <form onSubmit={handleSubmit(onFormSubmit)}>*/}
            {/*                <input type="file" {...register('file')}/>*/}
            {/*                <input type="submit"/>*/}
            {/*            </form>*/}
            {/*            <b>{}</b>*/}
            {/*        </div>*/}
            {/*}*/}

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
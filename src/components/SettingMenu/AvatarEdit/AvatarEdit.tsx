import AvatarEditor from "react-avatar-editor";
import React, {ChangeEvent, FC, MouseEvent, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {clearOriginalImageUser} from "../../../redux/reducers/userReducers";
import {uploadImageThunk} from "../../../redux/thunk";
import '../settingmenu.css'
import clearImage from '../../../static/image/clear.jpg'


type stateImageType = {
    scale: number
    rotate: number
}
const stateImageInit: stateImageType = {
    scale: 1.1,
    rotate: 0,
}

export type AvatarEditType = {
    original: string | null,
    cut: string | null,
    collapseWindow: () => void
}

export const AvatarEdit: FC<AvatarEditType> = ({original, cut, collapseWindow}) => {
    const [settingAvatar, setSettingAvatar] = useState<stateImageType>(stateImageInit)
    const [editedImg, setEditedImg] = useState<string>('')

    const editor = useRef<any>()
    const editImage = original ? original : clearImage
    const dispatchAC = useDispatch()


    const onClickSetAvatar = (e: MouseEvent<HTMLButtonElement>) => {
        if (editor) {
            const canvasScaled = editor.current.getImageScaledToCanvas()
            canvasScaled.toBlob((blob: any) => {
                dispatchAC(uploadImageThunk('cut', blob))
            })
        }
        collapseWindow()
    }
    const onClickClearImage = (e: MouseEvent<HTMLButtonElement>) => dispatchAC(clearOriginalImageUser())
    const onChangeLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatchAC(uploadImageThunk('origin', e.target.files[0]))
            setEditedImg(String(e.target.files[0]))
        }

    }

    const onChangeRotate = (e: ChangeEvent<HTMLInputElement>) => {
        setSettingAvatar({
            ...settingAvatar,
            rotate: Number(e.target.value)
        })
    }

    const onChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
        setSettingAvatar({
            ...settingAvatar,
            scale: Number(e.target.value)
        })
    }

    const closeWindowAndClear = (e:MouseEvent<HTMLDivElement>) => {
        collapseWindow()
        dispatchAC(clearOriginalImageUser())
    }

    return (
        <div className="wrapper_edit_avatar">
            <div onClick={closeWindowAndClear} className="close_edit_avatar">&#10006;</div>
            <div className="window_edit_avatar">

                <input className="input_avatar" onChange={onChangeLoadImage} type="file" />
                {
                    editedImg ?
                    <div className="wrapper_zone_edit_avatar">
                        <AvatarEditor
                            ref={editor}
                            image={editImage}
                            width={250}
                            height={250}
                            border={60}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={settingAvatar.scale}
                            rotate={settingAvatar.rotate}
                            borderRadius={150}
                        />
                        <div className="setting_edit_avatar">
                            <div>
                                <b>Поворот</b>
                                <input
                                    type="range"
                                    min={0}
                                    max={270}
                                    value={settingAvatar.rotate}
                                    onChange={onChangeRotate}
                                />
                            </div>
                            <div>
                                <b>Масштаб</b>
                                <input
                                    type="range"
                                    min={1}
                                    max={3.0}
                                    step={0.1}
                                    value={settingAvatar.scale}
                                    onChange={onChangeScale}
                                />
                            </div>
                        </div>
                    </div> :
                        null
                }
                <div className="wrapper_button_set_avatar">
                    <button
                        onClick={onClickSetAvatar}
                        disabled={!original}
                    >Установить аватар</button>
                    <button
                        onClick={onClickClearImage}
                        disabled={!original}
                    >Очистить</button>
                </div>

            </div>
        </div>
    )
}
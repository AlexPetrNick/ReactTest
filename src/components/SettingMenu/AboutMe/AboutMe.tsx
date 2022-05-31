import React, {FC, MouseEvent, useState} from "react";
import {AvatarEdit} from "../AvatarEdit/AvatarEdit";
import noAva from '../../../static/image/noavatar.jpg'
import '../settingmenu.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/react-redux";
import {initUserStateType} from "../../../redux/reducers/userReducers";

type AboutMeType = {
    avatarData: {
        original: string | null,
        cut: string | null,
    }
}

export const AboutMe:FC<AboutMeType> = ({avatarData}) => {
    const [collapseEdit, setCollapseEdit] = useState<boolean>(true)
    const [hoverTextChange, setHoverText] = useState<boolean>(false)
    const authInfo = useSelector<AppStateType, initUserStateType>((state: AppStateType) => state.UserReducers)
    const avatarImage = () => avatarData.cut ? avatarData.cut : noAva
    const onMouseHover = (e:MouseEvent<HTMLImageElement>) => setHoverText(true)
    const onMouseLeave = (e:MouseEvent<HTMLImageElement>) => setHoverText(false)
    const onClickEdit = (e:MouseEvent<HTMLDivElement>) => setCollapseEdit(false)
    const collapseWindow = () => setCollapseEdit(true)

    return (
        <div className="wrapper_about_me">
            <div className="avatar__zone">
                <img
                    src={avatarImage()}
                    className="image_avatar_zone"
                    onMouseEnter={onMouseHover}
                    onMouseLeave={onMouseLeave}
                />
                {hoverTextChange && <div
                    className="about_change_ava"
                    onMouseEnter={onMouseHover}
                    onClick={onClickEdit}
                >Сменить аватар</div>}
                {!collapseEdit && <AvatarEdit
                    original={avatarData.original}
                    cut={avatarData.cut}
                    collapseWindow={collapseWindow}
                />}
            </div>
            <div className="about__user__info">
                <b className={"about_username"}><i>{authInfo.username}</i></b>
                <div>
                    <b>Имя: </b>
                    {authInfo.firstName}
                </div>
                <div>
                    <b>Фамилия: </b>
                    {authInfo.lastName}
                </div>
                <div>
                    <b>E-mail: </b>
                    {authInfo.email}
                </div>
            </div>
        </div>
    )
}
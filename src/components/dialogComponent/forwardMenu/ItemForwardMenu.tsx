import React, {FC} from "react";

type ItemForwardMenuType = {
    face: string
    username: string
    toggleSelectUser: (idUser: string) =>void
    selectedUser: boolean
    idUser: string
}

export const ItemForwardMenu:FC<ItemForwardMenuType> = ({face, username, selectedUser,
                                                            toggleSelectUser, idUser}) => {
    const selectedUserStyle = selectedUser ? `wrp_item_frwd item_frwd_selected` : `wrp_item_frwd`
    return (
        <div onClick={() => toggleSelectUser(idUser)} className={selectedUserStyle}>
            <img className='wrp_item_frwd_img' src={face} alt=""/>
            <div className='wrp_item_frwd_username'>{username}</div>
            <div className='wrp_item_frwd_check'>&#10004;</div>
        </div>
    )
}
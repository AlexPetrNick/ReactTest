import React, {FC, MouseEvent} from "react";

type MenuCancelEditType = {
    originalMessage: string
    setFormCancel: (e: MouseEvent<HTMLDivElement>) => void
}

export const MenuCancelEdit:FC<MenuCancelEditType> = ({originalMessage, setFormCancel}) => {
    return (
        <div className='wrapper_original_msg'>
            <div className='wrp_text_org_msg'>
                <div className='edit_org_msg_label'>Редактируемое сообщение</div>
                <div className='edit_org_msg'>
                    <div className='edit_org_msg_text'>{originalMessage}</div>
                </div>
            </div>
            <div>
                <div onClick={setFormCancel} className="btn_can_edit_msg">X</div>
            </div>
        </div>
    )
}
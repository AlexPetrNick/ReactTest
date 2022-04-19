import {FC, MouseEvent} from "react";
import '../elementfoundmenu.css'
import {useDispatch} from "react-redux";
import {getDialogInfoThunk, listUsersFoundThunk} from "../../../redux/thunk";
import {setDefaultState, setDialogWindFromFound} from "../../../redux/reducers/dialogReducer";
type FoundElementType = {
    username: string,
    firstName?: string,
    lastName?: string,
    email?: string
}

export const ListMenuFoundElement: FC<FoundElementType> = ({
                                                               username, firstName,
                                                               lastName, email
                                                           }) => {
    const dispatchAC = useDispatch()

    const onClickList = (e:MouseEvent<HTMLDivElement>) => {
        dispatchAC(setDefaultState())
        dispatchAC(setDialogWindFromFound(username))
        dispatchAC(listUsersFoundThunk())
    }


    return (
        <div className={'wrapper_elem_found'} onClick={onClickList}>
            <div className="avatar_found_user">1</div>
            <div className="info_user">
                <div className="username_info">{username}</div>
                <div className="name_wrapper">
                    <div className="info_first_name">{firstName}</div>
                    <div className="info_last_name">{lastName}</div>
                </div>
                <div className="email">{email}</div>
            </div>
        </div>
    )
}
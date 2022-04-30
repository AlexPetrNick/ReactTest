import {authServer, dataUserRegistrationAuth} from "../DAL/authRequest";
import {Dispatch} from "redux";
import {setAccessRefreshToken} from "../Service/Localstorage";
import {
    actionTypeUserReducer,
    setAuthUser,
    setErrorMessageUser,
    setInitInfoUserAC, setLoadingUser,
    setRooms
} from "./reducers/userReducers";
import {getListGroupFound, getListUsersFound} from "../DAL/menuRequest";
import {
    actionMenuReducerType,
    setErrorUsersListFoundAC,
    setGroupMenuList,
    setListUserAC
} from "./reducers/menuListReducer";
import {actionDialogType, setDialogError, setDialogWind} from "./reducers/dialogReducer";
import {dataDialogSendMsg, getTalkingGroupInfo, sendMessageDialog} from "../DAL/dialogsRequest";

type authUserThunkAction = actionTypeUserReducer | actionMenuReducerType

export const authUserThunk = (data: dataUserRegistrationAuth) => {
    return (dispatch: Dispatch<authUserThunkAction>) => {
        authServer(data)
            .then(data => {
                dispatch(setLoadingUser(true))
                return data
            })
            .then(data => {
                setAccessRefreshToken(data)
                return data
            })
            .then(data => {
                if (data.message) {
                    dispatch(setErrorMessageUser(data.message))
                } else {
                    dispatch(setInitInfoUserAC(data.id, data.username))
                    dispatch(setGroupMenuList(data.dataDialog))
                    if (data.nameRooms) {
                        dispatch(setRooms(data.nameRooms))
                    }
                }
                dispatch(setAuthUser(true))
                dispatch(setLoadingUser(false))
            })
            .catch(e => dispatch(setErrorMessageUser(e.message)))
    }
}


export const listUsersFoundThunk = () => {
    return (dispatch: Dispatch<actionMenuReducerType>) => {
        getListUsersFound()
            .then(data => {
                dispatch(setListUserAC(data.result))
            })
            .catch(e => dispatch(setErrorUsersListFoundAC(e.message)))
    }
}

export const listGroupFoundThunk = () => {
    return (dispatch: Dispatch<actionMenuReducerType>) => {
        getListGroupFound()
            .then(data => {
                dispatch(setGroupMenuList(data.data))
            })
            .catch(e => dispatch(setErrorUsersListFoundAC(e.message)))
    }
}

export const getDialogInfoThunk = (user: string | null) => {
    return (dispatch: Dispatch<actionDialogType>) => {
        getTalkingGroupInfo(user)
            .then(data => {
                dispatch(setDialogWind(data.userQuery, data.group[0], data.messages))
            })
            .catch(e => dispatch(setDialogError(e.message)))
    }
}

export const sendDialogMsgThunk = (data: dataDialogSendMsg) => {
    return (dispatch: Dispatch<actionDialogType>) => {
        sendMessageDialog(data)
            .then(data => {
                if (data['success'] !== 'ok') {
                    dispatch(setDialogError(data.message))
                }
            })
            .catch(e => dispatch(setDialogError(e.message)))
    }
}



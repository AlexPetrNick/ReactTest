import {
    authServer,
    dataUpdateType,
    dataUserRegistrationAuth, loadCutImageToServer, loadImageFromServer,
    loadOriginImageToServer,
    updateUser
} from "../DAL/authRequest";
import {Dispatch} from "redux";
import {setAccessRefreshToken} from "../Service/Localstorage";
import {
    actionTypeUserReducer,
    setAuthUser,
    setErrorMessageUser, setImageUser,
    setInitInfoUserAC,
    setLoadingUser, setOriginalImageUser,
    setRooms,
    updateUserAC
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
import {log} from "util";

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
                    const email = data.infoUser.email ? data.infoUser.email : undefined
                    const first = data.infoUser.firstName ? data.infoUser.firstName : undefined
                    const last = data.infoUser.lastName ? data.infoUser.lastName : undefined
                    dispatch(setInitInfoUserAC(data.id, data.infoUser.username, first, last, email))
                    dispatch(setGroupMenuList(data.dataDialog))
                    if (data.nameRooms) {
                        dispatch(setRooms(data.nameRooms))
                    }
                    dispatch(setOriginalImageUser(data.images.origin))
                    dispatch(setImageUser(data.images.cut))
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


export const updateUserThunk = (dataUs:dataUpdateType) => {
    return (dispatch: Dispatch<authUserThunkAction>) => {
        console.log(dataUs)
        updateUser(dataUs)
            .then(data => {
                const d = data
                console.log(d)
                dispatch(updateUserAC(d))
            })
            .catch(e => console.log(e.message))
    }
}


export const uploadImageThunk = (type: string, data: any) => {
    return (dispatch: Dispatch<authUserThunkAction>) => {

        if (type === 'origin') {
            loadOriginImageToServer(data)
                .then(data => data.blob())
                .then(blob => {
                    const pict = URL.createObjectURL(blob)
                    dispatch(setOriginalImageUser(pict))
                })
        } else {
            loadCutImageToServer(data)
                .then(data => data.blob())
                .then(blob => {
                    const pict = URL.createObjectURL(blob)
                    dispatch(setImageUser(pict))
                })
        }
    }
}
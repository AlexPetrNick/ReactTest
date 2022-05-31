import {
    authServer,
    dataUpdateType,
    dataUserRegistrationAuth,
    loadCutImageToServer,
    loadOriginImageToServer,
    pingServer,
    registrationUserRequest,
    updateUser
} from "../DAL/authRequest";
import {Dispatch} from "redux";
import {setAccessRefreshToken} from "../Service/Localstorage";
import {
    actionTypeUserReducer,
    setAuthUser,
    setConnectServer,
    setErrorMessageUser,
    setImageUser,
    setInitInfoUserAC,
    setLoadingUser,
    setOriginalImageUser,
    setRooms,
    updateUserAC
} from "./reducers/userReducers";
import {dataArrayQueryType, getListGroupFound, getListUsersFound} from "../DAL/menuRequest";
import {
    actionMenuReducerType,
    setErrorUsersListFoundAC,
    setGroupMenuList,
    setListUserAC,
    setLoadingList, updateMsgFromUser
} from "./reducers/menuListReducer";
import {actionDialogType, deleteMsg, setDialogError, setDialogWind, setEditMsg} from "./reducers/dialogReducer";
import {
    dataDialogSendMsg,
    dataDialogSendMsgEditType, deleteMessage,
    getTalkingGroupInfo,
    sendMessageDialog,
    sendMessageEdit
} from "../DAL/dialogsRequest";

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


export const registrationUserRequestThunk = (data: dataUserRegistrationAuth) => {
    return (dispatch: Dispatch<authUserThunkAction>) => {
        return registrationUserRequest(data)
            .then(data => data)
            .catch(e => dispatch(setErrorMessageUser(e.message)))
    }
}


export const setConnectServerThunk = () => {
    return (dispatch: Dispatch<authUserThunkAction>) => {
        return pingServer()
            .then(data => {
                if (data.status === 200) {
                    dispatch(setConnectServer())
                }
            })
            .catch(e => dispatch(setErrorMessageUser(e.message)))
    }
}


export const listUsersFoundThunk = (query: dataArrayQueryType) => {
    return (dispatch: Dispatch<actionMenuReducerType>) => {
        getListUsersFound(query)
            .then(data => {
                dispatch(setLoadingList(true))
                return data
            })
            .then(data => dispatch(setListUserAC(data.result)))
            .then(() => dispatch(setLoadingList(false)))
            .catch(e => dispatch(setErrorUsersListFoundAC(e.message)))
    }
}

export const listGroupFoundThunk = (query: dataArrayQueryType) => {
    return (dispatch: Dispatch<actionMenuReducerType>) => {
        getListGroupFound(query)
            .then(data => {
                dispatch(setGroupMenuList(data.data))
            })
            .then(() => dispatch(setLoadingList(false)))
            .catch(e => dispatch(setErrorUsersListFoundAC(e.message)))
    }
}

export const updateUserGroupListThunk = (query: dataArrayQueryType) => {
    return (dispatch: Dispatch<actionMenuReducerType>) => {
        getListGroupFound(query)
            .then(a => {
                console.log(a.data[0].friend)
                dispatch(updateMsgFromUser(a.data[0].friend.id, a.data[0].talking))
                return a
            })
            .catch(e => dispatch(setErrorUsersListFoundAC(e.message)))
    }
}

export const getDialogInfoThunk = (user: string | null) => {
    return (dispatch: Dispatch<actionDialogType>) => {
        getTalkingGroupInfo(user)
            .then(data => {
                console.log(data)
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

export const sendDialogMsgEditThunk = (data: dataDialogSendMsgEditType) => {
    return (dispatch: Dispatch<actionDialogType>) => {
        sendMessageEdit(data)
            .then(dataJson => {
                dispatch(setEditMsg(dataJson))
            })
            .catch(e => dispatch(setDialogError(e.message)))
    }
}

export const deleteMsgThunk = (idMessage:string) => {
    return (dispatch: Dispatch<actionDialogType>) => {
        deleteMessage(idMessage)
            .then(dataJson => {
                dispatch(deleteMsg(dataJson.deletedMsg))
            })
            .catch(e => dispatch(setDialogError(e.message)))
    }
}


export const updateUserThunk = (dataUs: dataUpdateType) => {
    return (dispatch: Dispatch<authUserThunkAction>) => {
        updateUser(dataUs)
            .then(data => {
                const d = data
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

export const SET_DIALOG = 'SET_DIALOG'
export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG'
export const SET_DIALOG_FROM_FOUND_USER = 'SET_DIALOG_FROM_FOUND_USER'
export const SET_READ_MSG = 'SET_READ_MSG'
export const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE'
export const ADD_MESSAGE_AFTER_EVENT = 'ADD_MESSAGE_AFTER_EVENT'
export const SET_ALL_READ_MSG = 'SET_ALL_READ_MSG'
export const SET_MODE_DIALOG = 'SET_MODE_DIALOG'

//ACTION CREATOR

type setModeDialogType = {
    type: typeof SET_MODE_DIALOG,
    mode: modeDialog
}

export const setModeDialog = (mode:modeDialog):setModeDialogType => ({
    type: SET_MODE_DIALOG, mode
})

type setAllReadMsgType = {
    type: typeof SET_ALL_READ_MSG
    idUser: string
}

export const setAllReadMsg = (idUser:string):setAllReadMsgType => ({
    type: SET_ALL_READ_MSG, idUser
})


type addMsgAfterEventType = {
    type: typeof ADD_MESSAGE_AFTER_EVENT,
    msg: messageType,
}

export const addMsgAfterEvent = (msg: messageType):addMsgAfterEventType => ({
    type: ADD_MESSAGE_AFTER_EVENT, msg
})


type setDefaultStateType = {
    type: typeof SET_DEFAULT_STATE
}

export const setDefaultState = () => ({
    type: SET_DEFAULT_STATE
})

type setDialogWindType = {
    type: typeof SET_DIALOG,
    userInfo: userInfoType,
    groupInfo: groupInfoType,
    messages: messageType[]
}

export const setDialogWind = (
    userInfo: userInfoType,
    groupInfo: groupInfoType,
    messages: messageType[]): setDialogWindType => ({
    type: SET_DIALOG, userInfo, groupInfo, messages
})

type setDialogErrorType = {
    type: typeof SET_ERROR_DIALOG,
    error: string
}

export const setDialogError = (error: string): setDialogErrorType => ({
    type: SET_ERROR_DIALOG, error
})


type setDialogWindFromFoundType = {
    type: typeof SET_DIALOG_FROM_FOUND_USER,
    username:string
}

export const setDialogWindFromFound = (username: string): setDialogWindFromFoundType => ({
    type: SET_DIALOG_FROM_FOUND_USER, username
})

type setReadMsgType = {
    type: typeof SET_READ_MSG,
    idMes: string
    idUs: string
}

export const setReadMsg = (idMes:string, idUs:string):setReadMsgType => ({
    type:SET_READ_MSG, idMes, idUs
})

//REDUCER

export type messageType = {
    _id: string,
    userId: string,
    talkingGroupId: string,
    text: string,
    prevText: string | null,
    cntLike: number,
    cntWatch: number,
    whoRead: string[],
    createDate: string,
    "__v": number
}

export type groupInfoType = {
    _id: string,
    usersId: string[],
    name: string,
    individual: boolean,
    createDate: string,
    "__v": number
}

export type userInfoType = {
    _id?: string,
    username: string | null,
    email?: string,
    firstName?: string,
    lastName?: string,
}

export type modeDialog = 'dialog' | 'setting'

export type stateDialogReducerType = {
    userInfo: userInfoType
    groupInfo: groupInfoType | null
    message?: Array<messageType>
    error: string | null
    mode: modeDialog
}

export type actionDialogType = setDialogWindType |
    setDialogErrorType |
    setDialogWindFromFoundType |
    setReadMsgType |
    setDefaultStateType |
    addMsgAfterEventType |
    setAllReadMsgType |
    setModeDialogType


const initStateDialog:stateDialogReducerType = {
    userInfo: {
        username: null,
    },
    groupInfo: null,
    error: null,
    mode:"dialog"
}

export const DialogReducer = (state: stateDialogReducerType = initStateDialog, action: actionDialogType): stateDialogReducerType => {
    switch (action.type) {
        case SET_DIALOG: {
            return {
                ...state,
                userInfo: action.userInfo,
                message: action.messages,
                groupInfo: action.groupInfo
            }
        }
        case SET_ERROR_DIALOG:
            return {
                ...state,
                error: action.error
            }
        case SET_DIALOG_FROM_FOUND_USER:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    username: action.username
                }
            }
        case SET_READ_MSG: {
            const messageRead = state.message?.map((mes:messageType) => {
                return mes._id === action.idMes ? {...mes, whoRead: [...mes.whoRead, action.idUs]} : mes
            })
            return {
                ...state,
                message: messageRead
            }
        }
        case SET_DEFAULT_STATE: {
            return {
                ...initStateDialog
            }
        }
        case ADD_MESSAGE_AFTER_EVENT: {
            const newArrayMsg = state.message?.map(a => a)
            newArrayMsg?.push(action.msg)
            return {
                ...state,
                message: newArrayMsg
            }
        }
        case SET_ALL_READ_MSG: {
            console.log('readmsg')
            return {
                ...state,
                message: state.message?.map((msg:messageType) => {
                    return !msg.whoRead.includes(action.idUser) ?
                        {...msg, whoRead:[...msg.whoRead, action.idUser]} :
                        {...msg}
                })
            }
        }
        case SET_MODE_DIALOG: {
            return {
                ...state,
                mode: action.mode
            }
        }
    }
    return state
}
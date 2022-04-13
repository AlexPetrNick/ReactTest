export const SET_DIALOG = 'SET_DIALOG'
export const CLEAR_DIALOG = 'CLEAR_DIALOG'
export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG'
export const SET_DIALOG_FROM_FOUND_USER = 'SET_DIALOG_FROM_FOUND_USER'
export const SET_READ_MSG = 'SET_READ_MSG'

//ACTION CREATOR

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
    id: string,
    usersId: string[],
    name: string,
    individual: boolean,
    createDate: string,
    "__v": number
}

export type userInfoType = {
    id?: string,
    username: string | null,
    email?: string,
    firstName?: string,
    lastName?: string,
}

export type stateDIalogReducerType = {
    userInfo: userInfoType
    groupInfo: groupInfoType | null
    message?: Array<messageType>
    error: string | null
}

export type actionDialogType = setDialogWindType |
    setDialogErrorType |
    setDialogWindFromFoundType |
    setReadMsgType


const initStateDialog = {
    userInfo: {
        username: null,
    },
    groupInfo: null,
    error: null
}

export const DialogReducer = (state: stateDIalogReducerType = initStateDialog, action: actionDialogType): stateDIalogReducerType => {
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
    }
    return state
}
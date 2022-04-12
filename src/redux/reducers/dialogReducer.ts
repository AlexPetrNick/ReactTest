export const SET_DIALOG = 'SET_DIALOG'
export const CLEAR_DIALOG = 'CLEAR_DIALOG'
export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG'

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

//REDUCER

export type messageType = {
    id: string,
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
    setDialogErrorType


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
    }
    return state
}
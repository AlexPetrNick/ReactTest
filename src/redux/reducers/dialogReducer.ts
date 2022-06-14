
export const SET_DIALOG = 'SET_DIALOG'
export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG'
export const SET_DIALOG_FROM_FOUND_USER = 'SET_DIALOG_FROM_FOUND_USER'
export const SET_READ_MSG = 'SET_READ_MSG'
export const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE'
export const ADD_MESSAGE_AFTER_EVENT = 'ADD_MESSAGE_AFTER_EVENT'
export const SET_ALL_READ_MSG = 'SET_ALL_READ_MSG'
export const SET_MODE_DIALOG = 'SET_MODE_DIALOG'
export const SET_EDIT_MESSAGE = 'SET_EDIT_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const SET_POP_UP_MESS = 'SET_POP_UP_MESS'
export const SET_STATE_FORM = 'SET_STATE_FORM'
export const SET_ORIGINAL_MESSAGE = 'SET_ORIGINAL_MESSAGE'
export const SET_FORWARD_MENU_SET = 'SET_FORWARD_MENU_SET'
export const SET_MODE_SELECTION = 'SET_MODE_SELECTION'

//ACTION CREATOR

type setModeSelectionType = {
    type: typeof SET_MODE_SELECTION,
    modeBool: boolean
}

export const setModeSelection = (modeBool: boolean):setModeSelectionType => ({
    type: SET_MODE_SELECTION, modeBool
})

type setForwardMenuSetType = {
    type: typeof SET_FORWARD_MENU_SET,
    arrObjForMsg: objectForwMsg[]
}

export const setForwardMenuSet = (arrObjForMsg: objectForwMsg[]):setForwardMenuSetType => ({
    type: SET_FORWARD_MENU_SET, arrObjForMsg
})

type setOriginalMessageType = {
    type: typeof SET_ORIGINAL_MESSAGE,
    editMsgObj: editMsgObjType
}
export const setOriginalMessage = (editMsgObj: editMsgObjType):setOriginalMessageType => ({
    type: SET_ORIGINAL_MESSAGE, editMsgObj
})

type setStateFormType = {
    type: typeof SET_STATE_FORM,
    state: stateFormTypeDialog
}
export const setStateForm = (state: stateFormTypeDialog):setStateFormType => ({
    type: SET_STATE_FORM, state
})

type setPopUpMessType = {
    type: typeof SET_POP_UP_MESS,
    message: string
}
export const setPopUpMess = (message:string):setPopUpMessType => ({
    type: SET_POP_UP_MESS, message
})

type deleteMsgType = {
    type: typeof DELETE_MESSAGE
    idMessage: string[]
}

export const deleteMsg = (idMessage:string[]):deleteMsgType => ({
    type: DELETE_MESSAGE, idMessage
})

type dataEditMsgType = {
    id: string
    prevText: string
}

type setEditMsgType = {
    type: typeof SET_EDIT_MESSAGE
    data: dataEditMsgType
}

export const setEditMsg = (data:dataEditMsgType):setEditMsgType => ({
    type: SET_EDIT_MESSAGE, data
})

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
    messages: messageType[],
    faceFriend: string
}

export const setDialogWind = (
    userInfo: userInfoType,
    groupInfo: groupInfoType,
    messages: messageType[],
    faceFriend: string): setDialogWindType => ({
    type: SET_DIALOG, userInfo, groupInfo, messages, faceFriend
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
    forwarded: string,
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

export type objectForwMsg = {
    username: string,
    messageId: string
}

export type editMsgObjType = {
    originalMsg: string | null
    idMsg: string | null
}

export type modeDialog = 'dialog' | 'setting'
export type stateFormTypeDialog =  'normal' | 'edit' | 'mforw'

export type stateDialogReducerType = {
    userInfo: userInfoType
    groupInfo: groupInfoType | null
    message?: Array<messageType>
    error: string | null
    mode: modeDialog
    popUpMess: string
    originalMessage: editMsgObjType
    stateForm: stateFormTypeDialog
    forwardMenuSet: Array<objectForwMsg>
    modeSelection: boolean
    faceFriend: string
}

export type actionDialogType = setDialogWindType |
    setDialogErrorType |
    setDialogWindFromFoundType |
    setReadMsgType |
    setDefaultStateType |
    addMsgAfterEventType |
    setAllReadMsgType |
    setModeDialogType |
    setEditMsgType |
    deleteMsgType |
    setPopUpMessType |
    setStateFormType |
    setOriginalMessageType |
    setForwardMenuSetType |
    setModeSelectionType


const initStateDialog:stateDialogReducerType = {
    userInfo: {
        username: null,
    },
    groupInfo: null,
    error: null,
    mode:"dialog",
    popUpMess: '',
    stateForm: 'normal',
    originalMessage: {originalMsg: '', idMsg: ''},
    forwardMenuSet: [],
    modeSelection: false,
    faceFriend: ''
}

export const DialogReducer = (state: stateDialogReducerType = initStateDialog, action: actionDialogType): stateDialogReducerType => {
    switch (action.type) {
        case SET_DIALOG: {
            return {
                ...state,
                userInfo: action.userInfo,
                message: action.messages,
                groupInfo: action.groupInfo,
                faceFriend: action.faceFriend
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
            return initStateDialog
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
        case SET_EDIT_MESSAGE: {
            return {
                ...state,
                message: state.message?.map((mes:messageType) => {
                    return mes._id === action.data.id ? {...mes, prevText:action.data.prevText} : mes
                })
            }
        }
        case DELETE_MESSAGE: {
            return  {
                ...state,
                message: state.message?.filter((mes:messageType) => !action.idMessage.includes(mes._id))
            }
        }
        case SET_POP_UP_MESS: {
            return {
                ...state,
                popUpMess: action.message
            }
        }
        case SET_STATE_FORM: {
            return {
                ...state,
                stateForm: action.state
            }
        }
        case SET_ORIGINAL_MESSAGE: {
            return {
                ...state,
                originalMessage: {...action.editMsgObj}
            }
        }
        case SET_FORWARD_MENU_SET: {
            return {
                ...state,
                forwardMenuSet: [...action.arrObjForMsg]
            }
        }
        case SET_MODE_SELECTION: {
            return {
                ...state,
                modeSelection: action.modeBool
            }
        }
    }
    return state
}
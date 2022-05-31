export const SET_LIST_USER = 'SET_LIST_USER'
export const SET_ERROR_USERS_LIST_FOUND = 'SET_ERROR_USERS_LIST_FOUND'
export const SET_MODE_MENU_LIST = 'SET_MODE_MENU_LIST'
export const SET_GROUP_MENU_LIST = 'SET_GROUP_MENU_LIST'
export const UPDATE_MSG_FROM_USER = 'UPDATE_MSG_FROM_USER'
export const SELECT_USER = 'SELECT_USER'
export const SET_LOADING_LIST = 'SET_LOADING_LIST'
export const SET_NULL_UNREAD_MSG = 'SET_NULL_UNREAD_MSG'
export const INCREMENT_UNREAD_MSG = 'INCREMENT_UNREAD_MSG'

// Action creator

type incrementUnreadMsgType = {
    type: typeof INCREMENT_UNREAD_MSG,
    idFriend: string
}

export const incrementUnreadMsg = (idFriend:string):incrementUnreadMsgType => ({
    type: INCREMENT_UNREAD_MSG, idFriend
})

type setNullUnreadMsgType = {
    type: typeof SET_NULL_UNREAD_MSG,
    idFriend: string
}

export const setNullUnreadMsg = (idFriend:string):setNullUnreadMsgType => ({
    type: SET_NULL_UNREAD_MSG, idFriend
})

type setLoadingListType = {
    type: typeof SET_LOADING_LIST,
    value: boolean
}

export const setLoadingList = (value:boolean):setLoadingListType => ({
    type: SET_LOADING_LIST, value
})

type selectUserType = {
    type: typeof SELECT_USER,
    id: string
}

export const selectUser = (id:string):selectUserType => ({
    type: SELECT_USER, id
})

type updateMsgFromUserType = {
    type: typeof UPDATE_MSG_FROM_USER,
    id:string,
    talking:talkingLastMsgType
}

export const updateMsgFromUser = (id:string, talking:talkingLastMsgType):updateMsgFromUserType => ({
    type: UPDATE_MSG_FROM_USER, id, talking
})

export type setListUserACType = {
    type: typeof SET_LIST_USER
    usersFound: getListUserFoundType[]
}

export const setListUserAC = (usersFound: getListUserFoundType[]):setListUserACType => ({
    type: SET_LIST_USER, usersFound
})

export type setErrorUsersListFoundACType = {
    type: typeof SET_ERROR_USERS_LIST_FOUND,
    error: string
}

export const setErrorUsersListFoundAC = (error:string):setErrorUsersListFoundACType => ({
    type: SET_ERROR_USERS_LIST_FOUND, error
})

export type setModeListType = {
    type: typeof SET_MODE_MENU_LIST,
    mode: modeMenu
}

export const setModeListAC = (mode:modeMenu): setModeListType => ({
    type: SET_MODE_MENU_LIST, mode
})

export type setGroupMenuListType = {
    type: typeof SET_GROUP_MENU_LIST,
    groupList: getListGroupFoundType[]
}

export const setGroupMenuList = (groupList: getListGroupFoundType[]):setGroupMenuListType => ({
    type: SET_GROUP_MENU_LIST, groupList
})

// Reducer
export type getListUserFoundType = {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    image: string | null
}

type talkingLastMsgType = {
    id: string,
    userId: string,
    talkingGroupId: string,
    text: string,
    prevText: string | null,
    cntLike: number,
    cntWatch: number,
    "whoRead": string[],
    "createDate": string
}

export type getListGroupFoundType = {
    friend: {
        id:string,
        username: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        face: string | null
    },
    talking: talkingLastMsgType,
    cntUnreadMsg: number,
    name: string
}

type modeMenu = "group" | "menu" | "find"

export type menuListReducerType = {
    mode: modeMenu
    usersFound?: Array<getListUserFoundType>,
    menuUser?: Array<any>,
    groupList?: Array<getListGroupFoundType>,
    errors: Array<string>
    selectedUser?: string,
    isLoadingList: boolean
}

const initTypeMenuListReducer:menuListReducerType = {
    mode: "group",
    usersFound: undefined,
    menuUser: undefined,
    groupList: undefined,
    errors: [],
    selectedUser: undefined,
    isLoadingList: true
}

export type actionMenuReducerType = setListUserACType |
    setErrorUsersListFoundACType |
    setModeListType |
    setGroupMenuListType |
    updateMsgFromUserType |
    selectUserType |
    setLoadingListType |
    setNullUnreadMsgType |
    incrementUnreadMsgType




export const menuListReducer = (state: menuListReducerType = initTypeMenuListReducer, action: actionMenuReducerType): menuListReducerType => {
    switch (action.type) {
        case SET_LIST_USER:
            return {
                ...state,
                usersFound: [...action.usersFound]
            }
        case SET_ERROR_USERS_LIST_FOUND: {
            return {
                ...state,
                errors: [...state.errors, action.error]
            }
        }
        case SET_MODE_MENU_LIST : {
            return {
                ...state,
                mode: action.mode
            }
        }
        case SET_GROUP_MENU_LIST: {
            return {
                ...state,
                groupList: [...action.groupList]
            }
        }
        case UPDATE_MSG_FROM_USER: {
            console.log(action)
            return {
                ...state,
                groupList: state.groupList?.map((elem:getListGroupFoundType) => {
                    return elem.talking.talkingGroupId === action.talking.talkingGroupId ? {
                        ...elem,
                        talking: action.talking
                    } : elem
                })

            }
        }
        case SELECT_USER: {
            return {
                ...state,
                selectedUser: action.id
            }
        }
        case SET_LOADING_LIST: {
            return {
                ...state,
                isLoadingList: action.value
            }
        }
        case SET_NULL_UNREAD_MSG: {
            return {
                ...state,
                groupList: state.groupList?.map((group:getListGroupFoundType) => {
                    return group.friend.id === action.idFriend ?
                        {...group, cntUnreadMsg: 0} :
                        group
                })
            }
        }
        case INCREMENT_UNREAD_MSG: {
            return {
                ...state,
                groupList: state.groupList?.map((group:getListGroupFoundType) => {
                    return group.friend.id === action.idFriend ?
                        {...group, cntUnreadMsg: group.cntUnreadMsg + 1} :
                        group
                })
            }
        }
    }
    return state
}



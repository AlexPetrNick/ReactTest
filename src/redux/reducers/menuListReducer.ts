
export const SET_LIST_USER = 'SET_LIST_USER'
export const SET_ERROR_USERS_LIST_FOUND = 'SET_ERROR_USERS_LIST_FOUND'
export const SET_MODE_MENU_LIST = 'SET_MODE_MENU_LIST'
export const SET_GROUP_MENU_LIST = 'SET_GROUP_MENU_LIST'
export const UPDATE_MSG_FROM_USER = 'UPDATE_MSG_FROM_USER'

// Action creator

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
    lastName: string
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
    "createDate": string,
}

export type getListGroupFoundType = {
    friend: {
        id?:string,
        username: string,
        email?: string,
        firstName?: string,
        lastName?: string
    },
    talking: talkingLastMsgType
}

type modeMenu = "group" | "menu" | "find"

export type menuListReducerType = {
    mode: modeMenu
    usersFound?: Array<getListUserFoundType>,
    menuUser?: Array<any>,
    groupList?: Array<getListGroupFoundType>,
    errors: Array<string>
}

const initTypeMenuListReducer:menuListReducerType = {
    mode: "group",
    usersFound: undefined,
    menuUser: undefined,
    groupList: undefined,
    errors: []
}

export type actionMenuReducerType = setListUserACType |
    setErrorUsersListFoundACType |
    setModeListType |
    setGroupMenuListType |
    updateMsgFromUserType



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
            return {
                ...state,
                groupList: state.groupList?.map((elem:getListGroupFoundType) => {
                    return elem.friend.id === action.id ? {
                        ...elem,
                        talking: action.talking
                    } : elem
                })

            }
        }
    }
    return state
}



import {Dispatch} from "redux";
import {
    authServer, dataUpdateType,
    dataUserRegistrationAuth,
} from "../../DAL/authRequest";
import {setAccessRefreshToken, setValueLocalStorage} from "../../Service/Localstorage";

//action name
export const SET_INIT_INFO_USER = 'SET_INIT_INFO_USER'
export const SET_AUTH_USER = 'SET_AUTH_USER'
export const SET_ERROR_MESSAGE_USER = 'SET_ERROR_MESSAGE_USER'
export const SET_ROOMS = 'SET_ROOMS'
export const SET_LOADING_USER = 'SET_LOADING_USER'
export const UPDATE_USER_FETCH = 'UPDATE_USER_FETCH'


//Action Creator


type updateUserType = {
    type: typeof UPDATE_USER_FETCH,
    newData: dataUpdateType
}


export const updateUserAC = (newData: dataUpdateType): updateUserType => ({
    type: UPDATE_USER_FETCH, newData
})

type setLoadingUserType = {
    type: typeof SET_LOADING_USER,
    value: boolean
}


export const setLoadingUser = (value: boolean): setLoadingUserType => ({
    type: SET_LOADING_USER, value
})

type setInitInfoUserACType = {
    type: typeof SET_INIT_INFO_USER
    id: string
    username: string
    firstName?: string
    lastName?: string
    email?: string
}
export const setInitInfoUserAC = (
    id: string,
    username: string,
    firstName?: string,
    lastName?: string,
    email?: string,
): setInitInfoUserACType => ({
    type: SET_INIT_INFO_USER, id, username, firstName, lastName, email
})

type setAuthUserType = {
    type: typeof SET_AUTH_USER
    isAuth: boolean
}
export const setAuthUser = (isAuth: boolean): setAuthUserType => ({type: SET_AUTH_USER, isAuth})

type setErrorMessageUserType = {
    type: typeof SET_ERROR_MESSAGE_USER,
    message: string
}

export const setErrorMessageUser = (message: string): setErrorMessageUserType => ({
    type: SET_ERROR_MESSAGE_USER,
    message
})

type setRoomsType = {
    type: typeof SET_ROOMS,
    rooms: Array<string>
}

export const setRooms = (rooms: Array<string>): setRoomsType => ({
    type: SET_ROOMS, rooms
})


export type actionTypeUserReducer =
    setInitInfoUserACType |
    setAuthUserType |
    setErrorMessageUserType |
    setRoomsType |
    setLoadingUserType |
    updateUserType


//Reducer

export type initUserStateType = {
    id: string | null,
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    isAuth: boolean,
    errorText: string | null,
    rooms?: Array<string>,
    isLoading: boolean,
    email: string | null,
}

const initState: initUserStateType = {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    isAuth: false,
    email: null,
    errorText: null,
    isLoading: false
}


export const UserReducers = (state = initState, action: actionTypeUserReducer) => {
    switch (action.type) {
        case SET_INIT_INFO_USER:
            const firstName = action.firstName ? action.firstName : null
            const lastName = action.lastName ? action.lastName : null
            const email = action.email ? action.email : null
            return {
                ...state,
                id: action.id,
                username: action.username,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        case UPDATE_USER_FETCH:
            console.log(action.newData.firstName)
            return {
                ...state,
                firstName: action.newData.firstName ? String(action.newData.firstName) : null,
                lastName: action.newData.lastName ? String(action.newData.lastName) : null,
                email: action.newData.email ? String(action.newData.email) : null,
            }
        case SET_AUTH_USER:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case SET_ERROR_MESSAGE_USER:
            return {
                ...state,
                errorText: action.message
            }
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.rooms
            }
        case SET_LOADING_USER:
            return {
                ...state,
                isLoading: action.value
            }
    }
    return state
}






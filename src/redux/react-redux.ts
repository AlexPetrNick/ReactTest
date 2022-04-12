import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import {actionTypeUserReducer, UserReducers} from '../redux/reducers/userReducers'
import {actionMenuReducerType, menuListReducer} from "./reducers/menuListReducer";
import {DialogReducer} from "./reducers/dialogReducer";


export const reducers = combineReducers({
    UserReducers,
    menuListReducer,
    DialogReducer
})

export type appAction = actionTypeUserReducer & actionMenuReducerType
export type AppStateType = ReturnType<typeof reducers>
export type AppDispatchType = ThunkDispatch<AppStateType, any, appAction>
export type AppDispatch = typeof store.dispatch


export const store = createStore<AppStateType, appAction, {}, {}>(
    reducers, applyMiddleware<AppDispatchType, any>(thunk as ThunkMiddleware<AppStateType, appAction>),

)


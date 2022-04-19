import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import {actionTypeUserReducer, UserReducers} from '../redux/reducers/userReducers'
import {actionMenuReducerType, menuListReducer} from "./reducers/menuListReducer";
import {DialogReducer} from "./reducers/dialogReducer";
import {composeWithDevTools} from "redux-devtools-extension";

export const reducers = combineReducers({
    UserReducers,
    menuListReducer,
    DialogReducer
})

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export type appAction = actionTypeUserReducer & actionMenuReducerType
export type AppStateType = ReturnType<typeof reducers>
export type AppDispatchType = ThunkDispatch<AppStateType, any, appAction>
export type AppDispatch = typeof store.dispatch



export const store = createStore<AppStateType, appAction, {}, {}>(
    reducers, composeEnhancers(
        applyMiddleware<AppDispatchType, any>(thunk as ThunkMiddleware<AppStateType, appAction>)
    ))



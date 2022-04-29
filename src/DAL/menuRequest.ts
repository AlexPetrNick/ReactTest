import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";
import {getBearer} from "./common";


const {serverDns, ...data} = setting


export const getListUsersFound = () => {
    return fetch(`${serverDns}/menu/list_user/`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}


export const getListGroupFound = () => {
    return fetch(`${serverDns}/menu/list_group/`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}
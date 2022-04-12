import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";


const {serverDns, ...data} = setting

const token = getValueLocalStorage('access')
const bearer = `Bearer ${token}`


export const getListUsersFound = () => {
    return fetch(`${serverDns}/menu/list_user/`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
    })
        .then(data => data.json())
}


export const getListGroupFound = () => {
    return fetch(`${serverDns}/menu/list_group/`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
    })
        .then(data => data.json())
}
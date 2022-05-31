import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";
import {getBearer} from "./common";


const {serverDns, ...data} = setting

export type dataArrayQueryType = Array<object>


const getQueryParams = (query:dataArrayQueryType) => {
    let queryParams = '?'
    const lenQuery = Object.keys(query).length
    query.forEach((param, index) => {
        queryParams += `${Object.keys(param)[0]}=${Object.values(param)[0]}${lenQuery - 1  === index ? '' : '&'}`
    })
    return lenQuery ? queryParams : ''
}

export const getListUsersFound = (query:dataArrayQueryType) => {
    return fetch(`${serverDns}/menu/list_user${getQueryParams(query)}`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}


export const getListGroupFound = (query:dataArrayQueryType) => {
    return fetch(`${serverDns}/menu/list_group${getQueryParams(query)}`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}
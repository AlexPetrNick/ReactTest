import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";


const {serverDns, ...data} = setting


const token = getValueLocalStorage('access')
const bearer = `Bearer ${token}`


export const getInitData = () => {
    fetch(`${serverDns}/auth/userdata/`, {
        mode:"cors",
    })
        .then(data => data.json())
}

export type dataUserRegistrationAuth = {
    username: string,
    password: string
}

export const registrationUserRequest = (data:dataUserRegistrationAuth) => {
    return fetch(`${serverDns}/auth/registration`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    })
        .then(data => data.json())
        .then(json => json)
        .catch(e => console.log(e))
}


export const authServer = (data: dataUserRegistrationAuth) => {
    return fetch(`${serverDns}/auth/login/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode:"cors",
    })
        .then(data => data.json())

}


export const getRoomsSocketIo = () => {
    return fetch(`${serverDns}/auth/get-rooms/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        mode:"cors",
    })
        .then(data => data.json())
}

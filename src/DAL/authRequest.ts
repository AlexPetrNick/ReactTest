import {setting} from "../config/config";


const {serverDns, ...data} = setting


export const getInitData = () => {
    fetch(`${serverDns}/auth/userdata/`, {
        mode:"cors",
    })
        .then(data => data.json())
        .then(data2 => console.log(data2))
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

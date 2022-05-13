import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";
import {getBearer} from "./common";


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
            'Authorization': getBearer()
        },
        mode:"cors",
    })
        .then(data => data.json())
}

export type dataUpdateType = {
    email?: string,
    firstName?: string,
    lastName?: string
}

export const updateUser = (dataUser:dataUpdateType) => {
    return fetch(`${serverDns}/users/change_user/`, {
        method: 'PUT',
        body: JSON.stringify(dataUser),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
        mode:"cors",
    }).then(data => data.json())
}

export type loadImageDataType = {
    path: string
}


export const loadOriginImageToServer = (loadImageData: any) => {
    const formData = new FormData()
    formData.append("avatar", loadImageData, 'origin.jpg')
    return fetch(`${serverDns}/users/upload_image_origin/`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': getBearer(),
            // 'Content-Type': 'multipart/form-data; boundary=avatar'
        },
        mode:"cors",
    })
}

export const loadCutImageToServer = (loadImageData: any) => {
    const formData = new FormData()
    formData.append("avatar", loadImageData, 'cut.jpg')
    return fetch(`${serverDns}/users/upload_image_cut/`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': getBearer(),
            // 'Content-Type': 'multipart/form-data; boundary=avatar'
        },
        mode:"cors",
    })
}

export const loadImageFromServer = (url:string) => {
    return fetch(url, {
        headers: {
            'Authorization': getBearer(),
        },
        mode:"no-cors"
    })
}

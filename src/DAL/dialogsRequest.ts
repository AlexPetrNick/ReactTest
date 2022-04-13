import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";


const {serverDns, ...data} = setting

const token = getValueLocalStorage('access')
const bearer = `Bearer ${token}`


export const getTalkingGroupInfo = (user:string | null) => {
    return fetch(`${serverDns}/dialog/get-dialog-info?username=${user}`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
    })
        .then(data => data.json())
}

export type dataDialogSendMsg = {
    username: string | null,
    message: string
}

export const sendMessageDialog = (data:dataDialogSendMsg) => {
    return fetch(`${serverDns}/dialog/send-message`, {
        method: "POST",
        body: JSON.stringify(data),
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
    })
        .then(data => data.json())
}



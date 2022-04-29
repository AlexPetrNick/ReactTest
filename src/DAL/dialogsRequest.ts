import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";
import {getBearer} from "./common";


const {serverDns, ...data} = setting


export const getTalkingGroupInfo = (user:string | null) => {
    return fetch(`${serverDns}/dialog/get-dialog-info?username=${user}`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
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
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}



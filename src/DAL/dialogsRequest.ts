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

export type dataDialogSendMsgEditType = {
    idMessage: string,
    editMessage: string
}

export const sendMessageEdit = (data:dataDialogSendMsgEditType) => {
    return fetch(`${serverDns}/dialog/edit_message`, {
        method: "PUT",
        body: JSON.stringify(data),
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}


export const deleteMessage = (idMessage: string) => {
    return fetch(`${serverDns}/dialog/delete_message`, {
        method: "DELETE",
        body: JSON.stringify({idMessage:idMessage}),
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getBearer()
        },
    })
        .then(data => data.json())
}



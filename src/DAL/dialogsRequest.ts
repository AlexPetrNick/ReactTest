import {setting} from "../config/config";
import {getValueLocalStorage} from "../Service/Localstorage";


const {serverDns, ...data} = setting

const token = getValueLocalStorage('access')
const bearer = `Bearer ${token}`


export const getTalkingGroupInfo = (user:string) => {
    return fetch(`${serverDns}/dialog/get-dialog-info?username=${user}`, {
        mode:"cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
    })
        .then(data => data.json())
}



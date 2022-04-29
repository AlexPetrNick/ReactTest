import {getValueLocalStorage} from "../Service/Localstorage";

export const getBearer = () => {
    const token = getValueLocalStorage('access')
    return `Bearer ${token}`
}
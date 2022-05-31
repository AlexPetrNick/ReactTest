

export const setValueLocalStorage = (key:string, value:string) => {
    localStorage.setItem(key, value)
}

export const getValueLocalStorage = (key:string):string|undefined => {
    const value = localStorage.getItem(key)
    return value ? value : undefined
}

export const deleteValueLocalStorage = (key:string) => localStorage.removeItem(key)

export const clearStorage = () => {
    localStorage.clear()
}


type accessRefreshObject = {
    accessToken: string,
    refreshToken: string
}

export const setAccessRefreshToken = (data:accessRefreshObject) => {
    const {accessToken, refreshToken} = data
    setValueLocalStorage('access', accessToken)
    setValueLocalStorage('refresh', refreshToken)
}



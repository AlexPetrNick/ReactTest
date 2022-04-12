

export const setValueLocalStorage = (key:string, value:string) => {
    localStorage.setItem(key, value)
}

export const getValueLocalStorage = (key:string):string | null => {
    const value = localStorage.getItem(key)
    return value ? value : null
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

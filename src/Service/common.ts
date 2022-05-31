
export const randomString = ():string => {
    return String(new Date().getTime())
}

type drawNameType = {
    username: string
    firstName: string
    lastName: string
}

export const drawName = (username: string, firstName: string | undefined, lastName: string | undefined):string => {
    let name = username
    if (firstName && lastName) return `${name} (${firstName} ${lastName})`
    if (firstName) {
        name = `${name} (${lastName})`
    }
    if (lastName) {
        name = `${name} (${lastName})`
    }
    return name
}
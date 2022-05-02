
type translateType = {
    ru: {
        [key:string]: string
    }
}

export const Translate:translateType = {
    ru: {
        username: "Логин",
        email: "E-mail",
        firstName: "Имя",
        lastName: "Фамилия"
    }
}

export const TranslateWord = (word: keyof typeof Translate.ru) => {
    return Translate.ru[word]
}
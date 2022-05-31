import {ErrorsAuth} from "../components/elements/errors/errorsAuth";
import {setErrorMessageUser} from "../redux/reducers/userReducers";
import React from 'react'

// export const useDrawErrors = (msg: string | null):ReactElement => {
//     const [hideElement, setHideElement] = useState<boolean>(false)
//     const seeElementTime = Number(setting.timeSeeErrorMsg)
//     const drawMsg = () => {
//         setTimeout(() => {
//             setHideElement(true)
//         }, seeElementTime)
//         return <ErrorsAuth hideElement={hideElement} message={String(msg)} />
//     }
//     return (
//         <>
//             {msg && drawMsg()}
//         </>
//     )
// }

export const drawErrorsCb = (msg:string, dispatch: any) => {
    if (msg) {
        setTimeout(() => {
            dispatch(setErrorMessageUser(''));
        }, 3000)
        return (
            <ErrorsAuth message={msg} />
        )
    }
}
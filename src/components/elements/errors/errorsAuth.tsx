import {FC} from "react";
import './errorsAuth.css'

type errorsAuthType = {
    message?: string
}

export const ErrorsAuth:FC<errorsAuthType> = ({message, ...props}) => {
    return (
        <div className={'errors_message_auth'}>
            <b>{message}</b>
        </div>
    )
}
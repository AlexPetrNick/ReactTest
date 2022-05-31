import React, {FC} from "react";
import '../registration.css'
import {useForm} from "react-hook-form";

export const PhoneRegistration:FC = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm({shouldUseNativeValidation: true})

    return (
        <div>
            <form className='form_phone'>
                <span>Введите номер телефона</span>
                <input type="text" className='input_phone'/>

                <button disabled={!!errors.passwordRe} className="btn_login">Войти</button>
            </form>
        </div>
    )
}
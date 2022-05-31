import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {registrationUserRequestThunk} from "../../../redux/thunk";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

type formValues = {
    username: string,
    password: string,
    passwordRe: string,
}

type LoginRegistrationType = {
    error: string | null
}

export const LoginRegistration: FC = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors}
    } = useForm<formValues>({shouldUseNativeValidation: true})
    const {password} = watch()

    const onSubmit: SubmitHandler<formValues> = (data) => {
        const {passwordRe, ...body} = data
        dispatch(registrationUserRequestThunk(body))
        setValue("username", '')
        setValue("password", '')
        setValue("passwordRe", '')
        history('/', {replace: true})
    }

    return (
        <>
            <form className={'form_registration'} onSubmit={handleSubmit(onSubmit)}>
                <div className="login_reg_label">Никнейм пользователя</div>
                <input
                    placeholder={'Введите логин'}
                    {...register('username', {
                        required: 'This is field require',
                        minLength: 5
                    })}
                    className="psw_log_reg_inp"
                />
                <div className="psw_reg_lbl">Пароль</div>
                <input
                    {...register('password', {
                        required: 'This is field require',
                        minLength: 5
                    })}
                    type={'password'}
                    placeholder={'Введите пароль'}
                    className="psw_log_reg_inp"/>
                <div className="psw_reg_lbl_conf">Повторите пароль</div>
                <input
                    {...register('passwordRe', {
                        required: 'This is field require',
                        minLength: 5,
                        validate: (value: string) => value === password || 'Пароли должны быть одинаковы'
                    })}
                    type={'password'}
                    placeholder={'Введите пароль'}
                    className="psw_log_reg_inp"
                />

                <button disabled={!!errors.passwordRe} className="btn_login">Войти</button>
            </form>
            <div className={'message_error'}>
                {errors.passwordRe && errors.passwordRe.message}
            </div>
        </>
    )
}
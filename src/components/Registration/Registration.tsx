import {FC} from "react";
import './registration.css'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/react-redux";
import {actionTypeUserReducer} from "../../redux/reducers/userReducers";
import {ThunkAction} from "redux-thunk";
import {registrationUserRequest} from "../../DAL/authRequest";
import {Navigate, useNavigate} from "react-router-dom";

type formValues = {
    username:string,
    password:string,
    passwordRe:string,
}

export const Registration: FC = () => {
    const selector = useSelector((state: AppStateType) => state.UserReducers)
    const dispatchUser = useDispatch<Dispatch<actionTypeUserReducer>>()
    const history = useNavigate()

    const {register, handleSubmit, watch, setValue, formState: { errors }} = useForm<formValues>({shouldUseNativeValidation: true})
    const onSubmit: SubmitHandler<formValues> = (data) => {
        const { passwordRe, ...body} = data
        registrationUserRequest(body)
        setValue("username", '')
        setValue("password", '')
        setValue("passwordRe", '')
        history('/', { replace: true})
    }
    const {password, ...dataForm} = watch()



    return (
        <div className={'wrapper_registration'}>
            <h2>Регистрация</h2>

            <form className={'form_registration'} onSubmit={handleSubmit(onSubmit)} >
                <div className="login_reg_label">Никнейм пользователя</div>
                <input
                    placeholder={'Введите логин'}
                    {...register('username', {
                        required: 'This is field requeier',
                        minLength:5
                    })}
                    className="psw_log_reg_inp"
                />
                <div className="psw_reg_lbl">Пароль</div>
                <input
                    {...register('password', {
                        required: 'This is field requeier',
                        minLength:5
                    })}
                    type={'password'}
                    placeholder={'Введите пароль'}
                    className="psw_log_reg_inp"/>
                <div className="psw_reg_lbl_conf">Повторите пароль</div>
                <input
                    {...register('passwordRe', {
                        required: 'This is field requeier',
                        minLength: 5,
                        validate: (value:string) => value === password || 'Пароли должны быть одинаковы'
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
        </div>
    )
}
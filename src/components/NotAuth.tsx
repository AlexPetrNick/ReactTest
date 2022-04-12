import React, {FC} from "react";
import './norregister.css'
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {appAction, AppDispatch, AppDispatchType, AppStateType} from "../redux/react-redux";
import { setErrorMessageUser} from "../redux/reducers/userReducers";
import {ErrorsAuth} from "./elements/errors/errorsAuth";
import {authUserThunk, listGroupFoundThunk} from "../redux/thunk";
import {setModeListAC} from "../redux/reducers/menuListReducer";

interface formAuthType  {
    username: string,
    password: string
}

export const NotAuth:FC = (props) => {
    const errorsReq = useSelector<AppStateType, string | null >((state) => state.UserReducers.errorText)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()

    const {register, setValue, handleSubmit, formState: { errors }} = useForm<formAuthType>({shouldUseNativeValidation:true})
    const onSubmitForm:SubmitHandler<formAuthType> = (data):void => {
        dispatch(authUserThunk(data))
        dispatch(listGroupFoundThunk())
        setValue("username", '')
        setValue("password", '')
    }

    const drawErrors = () => {
        if (errorsReq) {
            setTimeout(() => {
                dispatchAC(setErrorMessageUser(''));
            }, 3000)
            return <ErrorsAuth message={errorsReq} />
        }
    }


    return (
        <div className={'wrapper_not_register'}>
            <div className={'text_auth'}>Авторизация</div>
            <form className={'wrapper_form_auth'} onSubmit={handleSubmit(onSubmitForm)}>
                <div className="login_auth_label">Никнейм пользователя</div>
                <input
                    {...register('username',{
                        required: {
                            value: true,
                            message: "Это поле обязательно для заполнения"
                        },
                        minLength: {
                        value: 5,
                        message: "Минимум 5 символов"
                    }
                    })}
                    placeholder={'Введите логин'}
                    className="psw_log_auth_inp"
                />
                <div className="psw_auth_lbl">Пароль</div>
                <input
                    {...register('password', {
                        required: {
                            value: true,
                            message: "Это поле обязательно для заполнения"
                        },
                        minLength: {
                            value: 5,
                            message: "Минимум 5 символов"
                        }
                    })}
                    type={"password"}
                    placeholder={'Введите пароль'}
                    className="psw_log_auth_inp"
                />
                <button disabled={!!errors.username || !!errors.password} className="btn_login">Войти</button>
                <Link className={'link_registration'} to={'/registration'}>Регистрация</Link>
            </form>
            {drawErrors()}
            {/*<div className="more_info"></div>*/}
        </div>
    )
}

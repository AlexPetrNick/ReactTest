import React, {FC, useEffect} from "react";
import './norregister.css'
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../redux/react-redux";
import {authUserThunk, listGroupFoundThunk, setConnectServerThunk} from "../redux/thunk";
import {drawErrorsCb} from "../Service/commonFuncComponents";
import {initUserStateType} from "../redux/reducers/userReducers";

interface formAuthType  {
    username: string,
    password: string
}

export const NotAuth:FC = (props) => {
    const {errorText:errorsReq, haveConnect} = useSelector<AppStateType, initUserStateType >((state) => state.UserReducers)
    const dispatch: AppDispatchType = useDispatch()
    const dispatchAC = useDispatch()


    const {register, setValue, handleSubmit, formState: { errors }} = useForm<formAuthType>({shouldUseNativeValidation:true})
    const onSubmitForm:SubmitHandler<formAuthType> = (data):void => {
        dispatch(authUserThunk(data))
        dispatch(listGroupFoundThunk([]))
        setValue("username", '')
        setValue("password", '')
    }

    const drawError = () => errorsReq && drawErrorsCb(errorsReq, dispatchAC)

    useEffect(() => {
        dispatch(setConnectServerThunk())
    }, [])

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
                        value: 4,
                        message: "Минимум 4 символов"
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
                <Link hidden={!haveConnect} className={'link_registration'} to={'/registration'}>Регистрация</Link>
            </form>
            {drawError()}
            {/*<div className="more_info"></div>*/}
        </div>
    )
}

import React, {FC, useState} from 'react';
import './registration.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/react-redux';
import {LoginRegistration} from './LoginRegistration/LoginRegistration';
import {drawErrorsCb} from '../../Service/commonFuncComponents';
import {PhoneRegistration} from './PhoneRegistration/PhoneRegistration';

type registrationType = 'login'|'phone'|'sn'

export const Registration: FC = () => {
  const error = useSelector<AppStateType, string | null>((state) => state.UserReducers.errorText);
  const [modeRegistration, setModeRegistration] = useState<registrationType>('login');
  const dispatch = useDispatch();
  const drawError = () => error && drawErrorsCb(error, dispatch);


  const drawMenuRegistration = () => {
    if (modeRegistration === 'login') return <LoginRegistration />;
    if (modeRegistration === 'phone') return <PhoneRegistration />;
  };
  const onCLickMenu = (mode:registrationType) => setModeRegistration(mode);

  return (
    <div className={'wrapper_registration'}>
      <span className='text_registration'>Регистрация</span>
      <div className='wrapper_type_registration'>
        <div className='select_type_registration'>
          <div className='item_menu_registration' onClick={() => onCLickMenu('login')}>Логин</div>
          <div className='item_menu_registration' onClick={() => onCLickMenu('phone')}>Телефон</div>
          <div className='item_menu_registration'>Соц.сети</div>
        </div>
        <div className='body_type_registration'>
          {drawMenuRegistration()}
        </div>
      </div>
      {drawError()}
    </div>
  );
};

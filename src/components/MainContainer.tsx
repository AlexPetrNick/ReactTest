import {FC} from "react";
import '../App.css'


export const MainContainer:FC = (props) => {
    return <div className={'wrapper_main'} >
        <div className="wrapper_left">
            <div className="user_info">
                <div className="wrapper_user_info">
                    <div className="avatar_user"></div>
                    <div className="data_user">
                        <div className="name_user"><b>Тестовый Авторизованный</b></div>
                        <div className="username_top">reactexpress</div>
                        <div className="status">В стадий разработки</div>
                    </div>
                </div>
            </div>
            <div className="find_block">
                <input
                    className="field_for_finding_text"
                    type="text"
                    name=""
                    id=""
                    placeholder={'Введите хотя бы 3 символа для поиска'}
                />
            </div>
            <div className="list_chats">
                <div className="chat_short_in_list">
                    <div className="avatar_list"></div>
                    <div className="info_short_list">
                        <div className="name_date_chat_short">
                            <div className="name_chats"><b>Тестовый Текст</b></div>
                            <div className="time_last_msg_short"><b>18:08</b></div>
                        </div>
                        <div className="last_msg_short_wr">
                            <div className="last_msg_short">Это последний текст который был написан</div>
                            <div className="icons_read"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="wrapper_right">
            <div className={'start_message'}>
                <i>
                    Пока не выбрано ни одного чата, чтобы начать общаться выберите чат
                    или найдите знакомых через поиск
                </i>
            </div>


        </div>
    </div>
}
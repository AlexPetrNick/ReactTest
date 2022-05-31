import React, {FC} from "react";
import loading from '../../static/loading/3.svg'
import './loading.css'

export const LoadingList:FC = () => {
    return (
        <div className='loading_wrapper'>
            <img src={loading} alt=""/>
        </div>
    )
}
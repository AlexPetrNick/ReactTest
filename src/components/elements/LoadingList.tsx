import {FC} from "react";
import loading from '../../static/image/8.gif'

export const LoadingList:FC = () => {
    return (
        <div>
            <img src={loading} alt=""/>
        </div>
    )
}
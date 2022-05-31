import React, {FC} from "react";
import main from '../../static/loading/main.gif';

export const LoadingMain:FC = () => {
    return (
        <div>
            <img src={main} alt=""/>
        </div>
    )
}
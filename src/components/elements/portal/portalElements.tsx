import React, {FC} from "react";
import ReactDOM from "react-dom";

export const PortalElements:FC = ({children}) => {
    return ReactDOM.createPortal(
        children,
        window.document.body
    );
}


import cssPage from "../../styles/page.module.scss";
import React from "react";
import { Header } from "../Header";
import { HeaderProps } from "../Header/types";

export const HeaderPage: React.FC<HeaderProps> = ({children, title}) => {
    return (
        <>
            <Header title={title}/>
            <div className={cssPage.content}>
                {children}
            </div>
        </>
    );
}
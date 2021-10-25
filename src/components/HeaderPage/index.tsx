
import cssPage from "../../styles/page.module.scss";
import React, { ReactElement, useMemo } from "react";
import { Header } from "../Header";
import { HeaderProps } from "../Header/types";

export const HeaderPage: React.FC<HeaderProps> = ({children, title}) => {
    const header: ReactElement = useMemo(() => <Header title={title}/>, [title]);

    return (
        <>
            {header}
            <div className={cssPage.content}>
                {children}
            </div>
        </>
    );
}
import css from "./styles/header.module.scss";
import cssButton from "./../../styles/button.module.scss";
import React from "react";
import { HeaderProps } from "./types";

const userName: string = "Иванов Иван Иванович";

export const Header: React.FC<HeaderProps> = ({title}) => {

    return (
        <div className={css.header}>
            <div className={css.header_content}>
                <div className={css.page_name} title={title}>
                    <p>{title}</p>
                </div>
                <div className={css.control_block}>
                    <div className={css.name_block} title={userName}>
                        <div>
                            <p>{userName}</p>
                        </div>
                    </div>
                    <div>
                        <button className={`${cssButton.secondary_button} ${css.logout_button}`}
                            id={css.logout_button}>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
            <div className={css.line} />
        </div>
    );
}
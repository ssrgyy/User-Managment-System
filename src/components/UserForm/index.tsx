import css from "./styles/user-form.module.scss";
import cssInput from "../../styles/input.module.scss";
import React from "react";

export const UserForm: React.FC = ({children}) => {
    return (
        <form onSubmit={e => e.preventDefault()} method="POST"
            className={css.user_form}>
            <div className={`${css.input_block} ${cssInput.write_input_node}`}>
                <label>
                    <p>ФИО:</p>
                    <input type="text" name="name"/>
                </label>
                <label>
                    <p>Город:</p>
                    <input type="text" name="city"/>
                </label>
            </div>
            {children}
        </form>
    );
}
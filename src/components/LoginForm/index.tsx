import css from "./styles/login-form.module.scss";
import cssInput from "../../styles/login-input.module.scss";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthProviderTypes } from "../AuthProvider/authProviderReducer/types";

export const LoginForm: React.FC = () => {
    const {authProviderDispatch} = useAuth();

    const sumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authProviderDispatch({type: AuthProviderTypes.LOGIN});
    }

    return (
        <form onSubmit={sumbit} method="POST" className={css.login_form}>
            <div className={`${css.form_block} ${cssInput.write_login_input_node}`}>
                <h2>Вход</h2>
                <div className={css.input_block}>
                    <label>
                        <p>Логин</p>
                        <input type="text" name="login"/>
                    </label>
                </div>
                <div className={css.input_block}>
                    <label>
                        <p>Пароль</p>
                        <input type="password" name="password"/>
                    </label>
                </div>
                <div className={css.submit_input_block}>
                    <input type="submit" value="Войти"
                        className={`${css.submit_input} ${cssInput.submit_login_input}`}
                    />
                </div>
            </div>
        </form>
    );
}
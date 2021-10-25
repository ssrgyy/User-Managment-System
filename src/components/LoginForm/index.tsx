import css from "./styles/login-form.module.scss";
import cssInput from "../../styles/login-input.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useInput } from "../../hooks/useInput";
import { AuthProviderTypes } from "../AuthProvider/authProviderReducer/types";
import { LoginFormRequestData } from "./types";
import { User } from "../UserManager/types";

export const LoginForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const loginInput = useInput('test');
    const passwordInput = useInput('test');
    const {authProviderDispatch} = useAuth();

    useEffect(() => setIsWrong(false), [loginInput.value, passwordInput.value]);

    const sumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoading)
            return;

        if (loginInput.value.length < 1 || passwordInput.value.length < 1) {
            setIsWrong(true);
            return;
        }
        
        setIsLoading(true);

        axios.post<User>('http://localhost:5000/login', {
            login: loginInput.value,
            password: passwordInput.value
        } as LoginFormRequestData).then(res => {
            authProviderDispatch({
                type: AuthProviderTypes.LOGIN,
                payload: {
                    userId: res.data.id,
                    userFio: res.data.fio
                }
            });
        }).catch(error => {
            setIsWrong(true);
        }).finally(() => setIsLoading(false));
    }

    const wrongInputsClass: string = isWrong ? cssInput.wrong_write_login_input_node : '';
    
    return (
        <form onSubmit={sumbit} method="POST" className={css.login_form}>
            <div className={`${wrongInputsClass} ${css.form_block} ${cssInput.write_login_input_node}`}>
                <h2>Вход</h2>
                <div className={css.input_block}>
                    <label>
                        <p>Логин</p>
                        <input type="text" name="login" defaultValue="test" {...loginInput} />
                    </label>
                </div>
                <div className={css.input_block}>
                    <label>
                        <p>Пароль</p>
                        <input type="password" name="password" {...passwordInput}/>
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
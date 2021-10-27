import css from "./styles/login-form.module.scss";
import cssInput from "../../styles/login-input.module.scss";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { AuthProviderTypes } from "../AuthProvider/authProviderReducer/types";
import { LoginFormRequestData, LoginFormResponseData } from "./types";
import { useLoading } from "../../hooks/useLoading";
import { useAsync } from "../../hooks/useAsync";

export const LoginForm: React.FC = () => {
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const loginInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const sumbitInputRef = useRef<HTMLInputElement>(null);
    const {authProviderDispatch} = useAuth();
    const {isLoading, setStatusLoading, setStatusLoaded} = useLoading();

    useEffect(() => {
        if (passwordInputRef.current)
            passwordInputRef.current.value = 'test';
    }, []);

    const loginRequest = useAsync(() => {
        if (isLoading)
            return;

        if (!isValid()) {
            setIsWrong(true);
            return;
        }

        setStatusLoading();

        axios.post<LoginFormResponseData>('http://localhost:5000/login', {
            login: loginInputRef.current!.value,
            password: passwordInputRef.current!.value
        } as LoginFormRequestData).then(res => {
            authProviderDispatch({
                type: AuthProviderTypes.LOGIN,
                payload: {
                    userId: res.data.regId,
                    userFio: res.data.userFio
                }
            });
        }).catch(error => {
            setIsWrong(true);
        }).finally(() => setStatusLoaded());
    });

    const isValid = (): boolean => {
        if (loginInputRef.current && passwordInputRef.current) {
            if (loginInputRef.current.value.length > 0 &&
                passwordInputRef.current.value.length > 0)
                    return true;
        }

        return false;
    }

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (sumbitInputRef.current)
            sumbitInputRef.current.disabled = !isValid();

        setIsWrong(false);
    };

    const sumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginRequest();
    }

    const wrongInputNodeClass: string = isWrong ? cssInput.wrong_write_login_input_node : '';
    
    return (
        <form onSubmit={sumbit} method="POST" className={css.login_form}>
            <div className={`${wrongInputNodeClass} ${css.form_block} ${cssInput.write_login_input_node}`}>
                <h2>Вход</h2>
                <div className={css.input_block}>
                    <label>
                        <p>Логин</p>
                        <input type="text" name="login" defaultValue="test"
                            ref={loginInputRef} onChange={inputChangeHandler}/>
                    </label>
                </div>
                <div className={css.input_block}>
                    <label>
                        <p>Пароль</p>
                        <input type="password" name="password" ref={passwordInputRef}
                            onChange={inputChangeHandler}/>
                    </label>
                </div>
                <div className={css.submit_input_block}>
                    <input type="submit" value="Войти" ref={sumbitInputRef}
                        className={`${css.submit_input} ${cssInput.submit_login_input}`}
                    />
                </div>
            </div>
        </form>
    );
}
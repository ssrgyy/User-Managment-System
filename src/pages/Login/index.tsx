import css from "./styles/login.module.scss"
import React from "react";
import { LoginForm } from "../../components/LoginForm";

export const Login: React.FC = () => {
    return (
        <div className={css.login}>
            <LoginForm />
        </div>
    );
}
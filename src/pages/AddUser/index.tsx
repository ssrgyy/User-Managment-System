import css from "./styles/add-user.module.scss";
import cssForm from "../../components/UserForm/styles/form.module.scss";
import cssButton from "../../styles/button.module.scss";
import React from "react";
import { UserForm } from "../../components/UserForm";
import { HeaderPage } from "../../components/HeaderPage";

export const AddUser: React.FC = () => {
    return (
        <HeaderPage title="Добавление пользователя">
            <div className={cssForm.form_block}>
                <UserForm>
                    <input type="submit" value="Сохранить"
                        className={`${css.save_button} ${cssButton.secondary_button}`} />
                </UserForm>
            </div>
        </HeaderPage>
    );
}
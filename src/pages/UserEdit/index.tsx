import css from "./styles/user-edit.module.scss";
import cssForm from "../../components/UserForm/styles/form.module.scss";
import cssButton from "../../styles/button.module.scss";
import React from "react";
import { UserForm } from "../../components/UserForm";
import { HeaderPage } from "../../components/HeaderPage";

export const UserEdit: React.FC = () => {
    return (
        <HeaderPage title="Редактирование пользователя">
            <div className={cssForm.form_block}>
                <UserForm>
                    <div className={css.button_block}>
                        <button className={cssButton.primary_button}>Отмена</button>
                        <input type="submit" value="Добавить"
                            className={cssButton.secondary_button}/>
                    </div>
                </UserForm>
            </div>
        </HeaderPage>
    );
}
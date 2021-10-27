import css from "./styles/add-user.module.scss";
import cssForm from "../../components/UserForm/styles/form.module.scss";
import cssButton from "../../styles/button.module.scss";
import React from "react";
import axios from "axios";
import { UserForm } from "../../components/UserForm";
import { HeaderPage } from "../../components/HeaderPage";
import { SumbitEvent } from "../../components/UserForm/types";
import { AddUserRequestData } from "./types";
import { useHistory } from "react-router";
import { RouteNames } from "../../router/types";

export const AddUser: React.FC = () => {
    const histoty = useHistory();

    const submit: SumbitEvent = (event, formData) => {
        axios.put('http://localhost:5000/add_user', {
            userFio: formData.userFio,
            cityId: formData.cityId
        } as AddUserRequestData);

        histoty.push(RouteNames.UserList);
    }

    return (
        <HeaderPage title="Добавление пользователя">
            <div className={cssForm.form_block}>
                <UserForm onSubmit={submit}>
                    <input type="submit" value="Добавить"
                        className={`${css.save_button} ${cssButton.secondary_button}`} />
                </UserForm>
            </div>
        </HeaderPage>
    );
}
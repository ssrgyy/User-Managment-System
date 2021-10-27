import css from "./styles/user-edit.module.scss";
import cssForm from "../../components/UserForm/styles/form.module.scss";
import cssButton from "../../styles/button.module.scss";
import React from "react";
import axios from "axios";
import { UserForm } from "../../components/UserForm";
import { HeaderPage } from "../../components/HeaderPage";
import { SumbitEvent } from "../../components/UserForm/types";
import { useHistory } from "react-router";
import { RouteNames } from "../../router/types";
import { useUserManager } from "../../hooks/useUserManager";
import { UserEditRequestData } from "./types";

export const UserEdit: React.FC = () => {
    const {userManagerState} = useUserManager();
    const histoty = useHistory();

    const submit: SumbitEvent = (event, formData) => {
        if (!userManagerState.selectedUser)
            return;

        axios.put('http://localhost:5000/edit_user', {
            userId: userManagerState.selectedUser.user.id,
            userFio: formData.userFio,
            cityId: formData.cityId
        } as UserEditRequestData);

        redirectToUserList();
    }

    const redirectToUserList = () => {
        histoty.push(RouteNames.UserList);
    }

    return (
        <HeaderPage title="Редактирование пользователя">
            <div className={cssForm.form_block}>
                <UserForm onSubmit={submit} userFio={userManagerState.selectedUser?.user.fio}
                    cityName={userManagerState.selectedUser?.city.name}>
                        <div className={css.button_block}>
                            <button className={cssButton.primary_button} onClick={redirectToUserList}>
                                Отмена
                            </button>
                            <input type="submit" value="Сохранить"
                                className={cssButton.secondary_button}/>
                        </div>
                </UserForm>
            </div>
        </HeaderPage>
    );
}
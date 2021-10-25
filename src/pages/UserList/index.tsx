import css from "./styles/user-list.module.scss";
import cssButton from "../../styles/button.module.scss";
import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserTable } from "../../components/UserTable";
import { HeaderPage } from "../../components/HeaderPage";
import { UserTableData } from "../../components/UserTable/types";
import { DeleteUserRequestData, LoadUserRequestData } from "./types";
import { useHistory } from "react-router";
import { RouteNames } from "../../router/types";
import { ModalForm } from "../../components/ModalForm";
import { UserData } from "../../components/UserManager/types";
import { UUID } from "../../uuid/types";

export const UserList: React.FC = () => {
    const histoty = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalFormVisible, setIsModalFormVisible] = useState<boolean>(false);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
    const [userDataList, setUserDataList] = useState<UserData[]>([]);
    const [userTableData, setUserTableData] = useState<UserTableData>({
        headerItemNameList: ['ФИО', 'Город'],
        itemDataList: []
    });

    useEffect(() => loadUsers(), [currentPageNumber]);

    useEffect(() => {
        if (userTableData.itemDataList.length === 0)
            setCurrentPageNumber(0);
    }, [userTableData]);
    
    const addPageNumber = (number: number) => setCurrentPageNumber(prevState => {
        let newPageNumber: number = prevState + number;

        if (newPageNumber < 0)
            newPageNumber = 0;

        return newPageNumber;
    });

    const addUserHandler = (index: number) => {

    }

    const deleteUserHandler = (index: number) => {
        setCurrentUserIndex(index);
        setIsModalFormVisible(true);
    }

    const redirectToUserPage = () => histoty.push(RouteNames.AddUser);

    const loadUsers = () => {
        if (isLoading)
            return;

        setIsLoading(true);
        axios.post<UserData[]>('http://localhost:5000/user_list', {
            elementsOnPage: 5,
            page: currentPageNumber
        } as LoadUserRequestData).then(res => {
            setUserDataList(res.data);
            setUserTableData(prevState => {
                const newUserTableData: UserTableData = {...prevState, itemDataList: []};

                res.data.forEach((data, index) => {
                    newUserTableData.itemDataList.push({
                        itemNameList: [data.user.fio, data.city.name],
                        onAddClick: addUserHandler.bind(null, index),
                        onDeleteClick: deleteUserHandler.bind(null, index)
                    });
                });

                return newUserTableData;
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const deleteUser = (userId: UUID) => {
        axios.post('http://localhost:3000/delete_user', {id: userId} as DeleteUserRequestData);
        setIsModalFormVisible(false);
    }

    const userTable: ReactNode = useMemo(() => {
        if (userTableData.itemDataList.length === 0)
            return null;

        return <UserTable data={userTableData}/>;
    }, [userTableData]);

    const backButton: ReactElement = useMemo(() => (
        <button onClick={addPageNumber.bind(null, -1)}>
            &#8592;
        </button>
    ), []);

    const disabledBackButton: ReactElement = useMemo(() => (
        <button disabled onClick={addPageNumber.bind(null, -1)}>
            &#8592;
        </button>
    ), []);

    const modalForm: ReactNode = useMemo(() => {
        if (!isModalFormVisible)
            return null;

        const currentUser = userDataList[currentUserIndex];

        return (
            <ModalForm onClose={setIsModalFormVisible.bind(null, false)}>
                <div className={css.modal_form}>
                    <div className={css.modal_form_content}>
                        <h2>Удаление пользователя</h2>
                        <div className={css.modal_form_text_block}>
                            <p>{currentUser.user.fio}</p>
                            <p>Город: {currentUser.city.name}</p>
                        </div>
                    </div>
                    <div className={css.modal_form_button_block}>
                        <button onClick={setIsModalFormVisible.bind(null, false)}
                            className={cssButton.primary_button}>
                            Отмена
                        </button>
                        <button onClick={deleteUser.bind(null, currentUser.user.id)}
                            className={cssButton.negative_button}>
                            Удалить
                        </button>
                    </div>
                </div>
            </ModalForm>
        )
    }, [isModalFormVisible, userDataList]);

    return (
        <HeaderPage title="Список пользователей">
            {isModalFormVisible ? modalForm : null}
            <div className={css.user_list}>
                <button className={`${css.add_user_button} ${cssButton.secondary_button}`} onClick={redirectToUserPage}>
                    Добавить пользователя
                </button>
                <h1>Страница: {currentPageNumber + 1}</h1>
                <div className={css.user_table}>
                    {isLoading ? <div className={css.loading_block}><p>Загрузка</p></div> : userTable}
                </div>
                <div className={`${css.page_button_block} ${cssButton.secondary_button_parent}`}>
                    {currentPageNumber < 1 ? disabledBackButton : backButton}
                    <button onClick={addPageNumber.bind(null, 1)}>&#8594;</button>
                </div>
            </div>
        </HeaderPage>
    );
}
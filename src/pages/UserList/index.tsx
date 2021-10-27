import css from "./styles/user-list.module.scss";
import cssButton from "../../styles/button.module.scss";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { UserTable } from "../../components/UserTable";
import { HeaderPage } from "../../components/HeaderPage";
import { UserTableData } from "../../components/UserTable/types";
import { DeleteUserRequestData, LoadUserRequestData, LoadUserResponseData } from "./types";
import { useHistory } from "react-router";
import { RouteNames } from "../../router/types";
import { ModalForm } from "../../components/ModalForm";
import { UUID } from "../../uuid/types";
import { useUserManager } from "../../hooks/useUserManager";
import { UserManagerActionTypes } from "../../components/UserManager/userManagerReducer/types";
import { UserData } from "../../components/UserManager/types";
import { useLoading } from "../../hooks/useLoading";
import { useAsync } from "../../hooks/useAsync";

export const UserList: React.FC = () => {
    const histoty = useHistory();
    const {userManagerDispatch} = useUserManager();
    const {isLoading, setStatusLoading, setStatusLoaded} = useLoading();
    const backButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const [isModalFormVisible, setIsModalFormVisible] = useState<boolean>(false);
    const [nextPageIndex, setNextPageIndex] = useState<number>(0);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
    const [userDataList, setUserDataList] = useState<UserData[]>([]);

    useEffect(() => loadUsersRequest(), [nextPageIndex]);

    useEffect(() => {
        if (!backButtonRef.current || !nextButtonRef.current)
            return;

        if (isLoading) {
            backButtonRef.current.disabled = true;
            nextButtonRef.current.disabled = true;
        }
        else {
            nextButtonRef.current.disabled = false;

            if (currentPageIndex < 1)
                backButtonRef.current.disabled = true;
            else
                backButtonRef.current.disabled = false;
        }
    }, [currentPageIndex, isLoading])

    useEffect(() => {
        if (userDataList.length === 0)
            setCurrentPageIndex(0);
            setNextPageIndex(0);
    }, [userDataList]);

    const loadUsersRequest = useAsync(() => {
        if (isLoading)
            return;

        setStatusLoading();

        axios.post<LoadUserResponseData>('http://localhost:5000/user_list', {
            elementsOnPage: 5,
            page: nextPageIndex
        } as LoadUserRequestData).then(res => {
            setUserDataList(res.data.pageData);
            setCurrentPageIndex(res.data.page);
            setNextPageIndex(res.data.page);
        }).finally(() => setStatusLoaded());
    });

    const deleteUserRequest = (userId: UUID) => {
        axios.put('http://localhost:5000/delete_user',
            {userId} as DeleteUserRequestData).finally(() => loadUsersRequest());
        setIsModalFormVisible(false);
    };

    const redirectToUserPage = () => histoty.push(RouteNames.AddUser);

    const addPageNumber = (number: number) => setCurrentPageIndex(prevState => {
        setNextPageIndex(prevState + number);
        return prevState;
    });

    const editUserHandler = (userDataListIndex: number) => {
        userManagerDispatch({
            type: UserManagerActionTypes.SELECT_USER,
            payload: userDataList[userDataListIndex]
        });

        histoty.push(RouteNames.EditUser);
    }

    const deleteUserHandler = (userDataListIndex: number) => {
        setCurrentUserIndex(userDataListIndex);
        setIsModalFormVisible(true);
    }

    const userTable: ReactNode = useMemo(() => {
        if (userDataList.length === 0)
            return null;

        const userTableData: UserTableData = {
            headerItemNameList: ['ФИО', 'Город'],
            itemDataList: []
        };

        userDataList.forEach((data, index) => {
            userTableData.itemDataList.push({
                itemNameList: [data.user.fio, data.city.name],
                onAddClick: editUserHandler.bind(null, index),
                onDeleteClick: deleteUserHandler.bind(null, index)
            });
        });

        return <UserTable data={userTableData}/>;
    }, [userDataList]);

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
                        <button onClick={deleteUserRequest.bind(null, currentUser.user.id)}
                            className={cssButton.negative_button}>
                            Удалить
                        </button>
                    </div>
                </div>
            </ModalForm>
        )
    }, [isModalFormVisible]);

    return (
        <HeaderPage title="Список пользователей">
            {modalForm}
            <div className={css.user_list}>
                <button className={`${css.add_user_button} ${cssButton.secondary_button}`} onClick={redirectToUserPage}>
                    Добавить пользователя
                </button>
                <div className={css.info_block}>
                    <p>Страница: {currentPageIndex + 1}</p>
                    {isLoading ? <p>Загрузка</p> : null}
                </div>
                <div className={css.user_table}>
                    {userTable}
                </div>
                <div className={`${css.page_button_block} ${cssButton.secondary_button_parent}`}>
                    <button ref={backButtonRef} onClick={addPageNumber.bind(null, -1)}>&#8592;</button>
                    <button ref={nextButtonRef} onClick={addPageNumber.bind(null, 1)}>&#8594;</button>
                </div>
            </div>
        </HeaderPage>
    );
}
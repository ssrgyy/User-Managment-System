import css from "./styles/user-list.module.scss";
import cssButton from "../../styles/button.module.scss";
import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { UserTable } from "../../components/UserTable";
import { HeaderPage } from "../../components/HeaderPage";
import { UserTableData } from "../../components/UserTable/types";
import axios from "axios";
import { UserListResponseData } from "./types";

interface Test {
    test: number;
}

export const UserList: React.FC = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
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

    const loadUsers = () => {
        axios.post<UserListResponseData>('http://localhost:5000/user_list', {
            elementsOnPage: 5,
            page: currentPageNumber
        }).then(res => {
            setUserTableData(prevState => {
                const newUserTableData: UserTableData = {...prevState, itemDataList: []};

                res.data.forEach(data => {
                    newUserTableData.itemDataList.push({
                        itemNameList: [data.user.fio, data.city.name]
                    });
                });

                return newUserTableData;
            });
        });
    }

    const userTable: ReactNode = useMemo(() => {
        if (userTableData.itemDataList.length === 0)
            return null;

        return <UserTable isScrolled={true} data={userTableData}/>;
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
    
    return (
        <HeaderPage title="Список пользователей">
            <div className={css.user_list}>
                <button className={`${css.add_user_button} ${cssButton.secondary_button}`} onClick={loadUsers}>
                    Добавить пользователя
                </button>
                <h1>Страница: {currentPageNumber + 1}</h1>
                <div className={css.user_table}>
                    {userTable}
                </div>
                <div className={`${css.page_button_block} ${cssButton.secondary_button_parent}`}>
                    {currentPageNumber < 1 ? disabledBackButton : backButton}
                    <button onClick={addPageNumber.bind(null, 1)}>&#8594;</button>
                </div>
            </div>
        </HeaderPage>
    );
}
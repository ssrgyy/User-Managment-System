import css from "./styles/user-list.module.scss";
import cssButton from "../../styles/button.module.scss";
import React, { useState } from "react";
import { UserTable } from "../../components/UserTable";
import { HeaderPage } from "../../components/HeaderPage";
import { UserTableData } from "../../components/UserTable/types";
import { userTestData } from "../../components/UserManager/data";

export const UserList: React.FC = () => {
    const userTableDataList: UserTableData = {
        headerItemNameList: ['ФИО', 'Город'],
        itemDataList: []
    }

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
    const elementsOnPage: number = 5;
    const elementsCount: number = userTestData[0].length;

    for (let i = elementsOnPage * currentPageNumber,
        temp = elementsOnPage * (currentPageNumber + 1),
        max = temp < elementsCount ? temp : elementsCount; i < max ; i++) {
            const itemListData: string[] = [];

            for (let j = 0; j < userTestData.length; j++)
                itemListData.push(userTestData[j][i]);

            userTableDataList.itemDataList.push({
                itemNameList: itemListData
            });
    }

    const addPageNumber = (number: number) => setCurrentPageNumber(prevState => {
        let newPageNumber: number = prevState + number;
        const pageCount: number = Math.ceil(elementsCount / elementsOnPage);

        if (newPageNumber < 0)
            newPageNumber = pageCount - 1;
        else if (newPageNumber >= pageCount)
            newPageNumber = 0;

        return newPageNumber;
    });
    
    return (
        <HeaderPage title="Список пользователей">
            <div className={css.user_list}>
                <button className={`${css.add_user_button} ${cssButton.secondary_button}`}>
                    Добавить пользователя
                </button>
                <div className={css.user_table}>
                    <UserTable elementsOnPage={elementsOnPage} isScrolled={true} data={userTableDataList}/>
                </div>
                <div className={`${css.page_button_block} ${cssButton.secondary_button_parent}`}>
                    <button onClick={addPageNumber.bind(null, -1)}>&#8592;</button>
                    <button onClick={addPageNumber.bind(null, 1)}>&#8594;</button>
                </div>
            </div>
        </HeaderPage>
    );
}
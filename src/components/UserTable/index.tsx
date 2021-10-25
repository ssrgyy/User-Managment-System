import css from "./styles/user-table.module.scss";
import React, { useEffect, useState } from "react";
import { ItemId,  SortData, SortMode, UserTableData, UserTableProps } from "./types";
import { TableHeader } from "./components/TableHeader";
import { TableHeaderItem } from "./components/TableHeaderItem";
import { TableItem } from "./components/TableItem";

export const UserTable: React.FC<UserTableProps> = ({data, isScrolled}) => {
    const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
    const [dataList, setDataList] = useState<UserTableData>({headerItemNameList: [], itemDataList: [{itemNameList: []}]});
    const [sortData, setSortData] = useState<SortData>({
        mode: SortMode.Ascend,
        itemId: 0
    });

    useEffect(() => {
        setDataList({...data});
        setIsDataUpdated(true);
    }, [data]);

    useEffect(() => {
        if (!isDataUpdated)
            return;

        sort(sortData);
        setIsDataUpdated(false);
    }, [isDataUpdated]);

    const sort = (newSortData: SortData) => setDataList(prevState => {        
        const newDataList: UserTableData = {...prevState};
        const sortResult: number = newSortData.mode === SortMode.Ascend ? 1 : -1;
        const {itemId} = newSortData;

        newDataList.itemDataList.sort((a, b) => {
            if (a.itemNameList[itemId] > b.itemNameList[itemId])
                return 1 * sortResult;
            if (a.itemNameList[itemId] < b.itemNameList[itemId])
                return -1 * sortResult;
            return 0;
        });

        return newDataList;
    });

    const sortHandler = (itemId: ItemId) => setSortData(prevState => {
        const newSortData: SortData = {...prevState};

        if (newSortData.itemId === itemId) {
            if (newSortData.mode === SortMode.Ascend)
                newSortData.mode = SortMode.Descend;
            else
                newSortData.mode = SortMode.Ascend;
        }
        else {
            newSortData.itemId = itemId;
            newSortData.mode = SortMode.Ascend;
        }

        sort(newSortData);
        return newSortData;
    });

    return (
        <div className={css.user_table} style={isScrolled ? {overflow: 'auto'} : undefined}>
            <div className={css.table}>
                <TableHeader onSort={sortHandler} sortData={sortData}>
                    {dataList.headerItemNameList.map((headerItem, index) => (
                        <TableHeaderItem key={headerItem} id={index}>
                            {headerItem}
                        </TableHeaderItem>
                    ))}
                    <div className={`${css.cell} ${css.empty}`}/>
                </TableHeader>
                {dataList.itemDataList.map((itemData, index) => (
                    <TableItem key={'TableItem' + index}
                        onAddClick={itemData.onAddClick}
                        onDeleteClick={itemData.onDeleteClick}>
                        {itemData.itemNameList}
                    </TableItem>
                ))}
            </div>
        </div>
    );
}
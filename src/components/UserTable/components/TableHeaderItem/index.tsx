import React, { ReactElement, useContext } from "react";
import css from "./styles/table-header-item.module.scss";
import cssTable from "../../styles/user-table.module.scss";
import { SortMode } from "../../types";
import { TableHeaderContext } from "../TableHeader";
import { TableHeaderItemProps } from "./types";

export const TableHeaderItem: React.FC<TableHeaderItemProps> = ({children, id}) => {
    const {onSort, sortData} = useContext(TableHeaderContext);

    const sortIcon: ReactElement = (
        <>
            {sortData.mode === SortMode.Ascend
                ? <span className={css.sort_icon}>&#9650;</span>
                : <span className={css.sort_icon}>&#9660;</span>}
        </>
    );

    return (
        <div className={cssTable.cell} onClick={onSort?.bind(null, id)}>
            <p>{children}{sortData.itemId === id ? sortIcon : null}</p>
        </div>
    );
}
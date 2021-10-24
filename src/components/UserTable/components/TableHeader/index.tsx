import cssTable from "../../styles/user-table.module.scss";
import React from "react";
import { TableHeaderProps } from "./types";
import { TableHeaderContext } from "./TableHeaderContext";

export const TableHeader: React.FC<TableHeaderProps> = ({children, sortData, onSort}) => {
    return (
        <div className={`${cssTable.row} ${cssTable.header}`}>
            <TableHeaderContext.Provider value={{sortData, onSort}}>
                {children}
            </TableHeaderContext.Provider>
        </div>
    );
}
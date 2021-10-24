import cssTable from "../../styles/user-table.module.scss";
import React, { createContext } from "react";
import { TableHeaderProps } from "./types";

export const TableHeaderContext = createContext<TableHeaderProps>({} as TableHeaderProps);

export const TableHeader: React.FC<TableHeaderProps> = ({children, sortData, onSort}) => {
    return (
        <div className={`${cssTable.row} ${cssTable.header}`}>
            <TableHeaderContext.Provider value={{sortData, onSort}}>
                {children}
            </TableHeaderContext.Provider>
        </div>
    );
}
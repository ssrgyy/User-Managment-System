import { TableItemEventHandlers } from "./components/TableItem/types";

export type ItemId = number;
export type ItemClickEventHandler = () => void;

export type TableItemName = string;

export interface TableItemData extends TableItemEventHandlers {
    itemNameList: TableItemName[];
}

export interface UserTableData {
    headerItemNameList: string[];
    itemDataList: TableItemData[];
}

export interface SortData {
    mode: SortMode;
    itemId: ItemId;
}

export enum SortMode {
    Ascend,
    Descend
}

export interface UserTableProps {
    data: UserTableData;
}
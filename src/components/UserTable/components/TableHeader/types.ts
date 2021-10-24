import { ItemId, SortData } from "../../types";

export interface TableHeaderProps {
    sortData: SortData;
    onSort?: (itemId: ItemId) => void;
}
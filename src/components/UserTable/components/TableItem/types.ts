import { ItemClickEventHandler } from "../../types";

export interface TableItemEventHandlers {
    onAddClick?: ItemClickEventHandler;
    onDeleteClick?: ItemClickEventHandler;
}

export interface TableItemProps extends TableItemEventHandlers {}
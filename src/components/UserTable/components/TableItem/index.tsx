import React from "react";
import css from "./styles/table-item.module.scss";
import cssTable from "../../styles/user-table.module.scss";
import cssButton from "../../../../styles/button.module.scss";
import { TableItemProps } from "./types";
import { ItemClickEventHandler } from "../../types";

export const TableItem: React.FC<TableItemProps> = ({children, onAddClick, onDeleteClick}) => {
    const buttonClickHandler = (event: React.MouseEvent, itemClickHandler: ItemClickEventHandler | undefined) => {
        event.stopPropagation();

        if (itemClickHandler)
            itemClickHandler();
    }

    return (
        <div className={cssTable.row}>
            <div className={css.select_block} onClick={onAddClick?.bind(null)}>
                {React.Children.map(children, child => (
                    <div className={cssTable.cell}>
                        <p>{child}</p>
                    </div>
                ))}
                <div className={css.button_block}>
                    <button className={cssButton.negative_button}
                        onClick={event => buttonClickHandler(event, onDeleteClick)}>
                        &#215;
                    </button>
                    <button className={cssButton.secondary_button}
                        onClick={event => buttonClickHandler(event, onAddClick)}>
                        &#43;
                    </button>
                </div>
            </div>
        </div>
    );
}
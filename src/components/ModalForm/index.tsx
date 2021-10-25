import css from "./styles/modal-form.module.scss";
import React from "react";
import { ModalFormProps } from "./types";

export const ModalForm: React.FC<ModalFormProps> = ({children, onClose}) => {
    return (
        <div className={css.background} onClick={onClose}>
            <div onClick={e => e.stopPropagation()} className={css.modal_form}>
                {children}
            </div>
        </div>
    );
}
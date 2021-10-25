import css from "./styles/user-form.module.scss";
import cssInput from "../../styles/input.module.scss";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { City } from "../UserManager/types";
import { useInput } from "../../hooks/useInput";
import { useSelect } from "../../hooks/useSelect";
import { UserFormProps } from "./types";

export const UserForm: React.FC<UserFormProps> = ({children, onSumbit}) => {
    const [cityDataList, setCityDataList] = useState<City[]>([]);
    const nameInput = useInput('');
    const selectInput = useSelect(0);

    useEffect(() => loadCities(), []);

    const loadCities = () => {
        axios.post<City[]>('http://localhost:5000/cities').then(res => {
            setCityDataList(res.data);
        });
    }

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.put('http://localhost:5000/add_user', {
            fio: nameInput.value,
            cityId: cityDataList[selectInput.index].id
        });
    }

    const cityOptionList: ReactElement = useMemo(() => (
        <>
            {cityDataList.map(cityData => <option key={cityData.id}>{cityData.name}</option>)}
        </>
    ), [cityDataList]);

    return (
        <form onSubmit={submit} method="POST"
            className={css.user_form}>
            <div className={`${css.input_block} ${cssInput.write_input_node}`}>
                <label>
                    <p>ФИО:</p>
                    <input type="text" name="name" {...nameInput}/>
                </label>
                <label>
                    <p>Город:</p>
                    <select name="city" onChange={selectInput.onChange}>
                        {cityOptionList}
                    </select>
                </label>
            </div>
            {children}
        </form>
    );
}
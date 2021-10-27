import css from "./styles/user-form.module.scss";
import cssInput from "../../styles/input.module.scss";
import cssButton from "../../styles/button.module.scss";
import React, { useRef, useState } from "react";
import { UserFormProps } from "./types";
import { useUserManager } from "../../hooks/useUserManager";

export const UserForm: React.FC<UserFormProps> = ({children, onSubmit, defaultSumbitValue, userFio, cityName}) => {
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const {userManagerState, userManagerDispatch} = useUserManager();
    const fioInputRef = useRef<HTMLInputElement>(null);
    const citySelectRef = useRef<HTMLSelectElement>(null);

    const inputChange = () => setIsWrong(false);

    const isValid = (): boolean => {
        if (fioInputRef.current && citySelectRef.current) {
            if (fioInputRef.current.value.length > 0)
                return true;
        }

        return false;
    }

    const sumbit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValid()) {
            setIsWrong(true);
            return;
        }

        const userCity = userManagerState.cityList[citySelectRef.current!.selectedIndex];

        onSubmit?.call(null, event, {
            userFio: fioInputRef.current!.value,
            cityListIndex: citySelectRef.current!.selectedIndex,
            cityId: userCity.id,
            cityName: userCity.name
        });
    }

    const wrongInputNodeClass: string = isWrong ? cssInput.wrong_write_input_node : '';

    return (
        <form onSubmit={sumbit} className={css.user_form}>
            <div className={`${wrongInputNodeClass} ${css.input_block} ${cssInput.write_input_node}`}>
                <label>
                    <p>ФИО:</p>
                    <input type="text" defaultValue={userFio}
                        ref={fioInputRef} onChange={inputChange}/>
                </label>
                <label>
                    <p>Город:</p>
                    <select defaultValue={cityName} ref={citySelectRef}>
                        {userManagerState.cityList.map(cityData => (
                            <option key={cityData.id}>{cityData.name}</option>
                        ))}
                    </select>
                </label>
            </div>
            {React.Children.count(children) !== 0 ? children :
                <input type="submit" value={defaultSumbitValue || 'Отправить'}
                    className={`${css.default_submit_button} ${cssButton.secondary_button}`}/>}
        </form>
    );
}
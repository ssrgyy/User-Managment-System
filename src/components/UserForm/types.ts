import { CityId, CityName, UserFio } from "../UserManager/types";

export type SumbitEvent = (event: React.FormEvent<HTMLFormElement>, formData: UserFormData) => void

export interface UserFormProps {
    onSubmit?: SumbitEvent;
    defaultSumbitValue?: string;
    userFio?: string;
    cityName?: string;
}

export interface UserFormData {
    userFio: UserFio;
    cityListIndex: number;
    cityId: CityId;
    cityName: CityName;
}
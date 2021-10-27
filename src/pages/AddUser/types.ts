import { CityId, UserFio } from "../../components/UserManager/types";

export interface AddUserRequestData {
    userFio: UserFio;
    cityId: CityId;
}
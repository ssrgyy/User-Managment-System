import { CityId, UserFio, UserId } from "../../components/UserManager/types";

export interface UserEditRequestData {
    userId: UserId,
    userFio: UserFio,
    cityId: CityId;
}
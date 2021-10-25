import { useContext } from "react";
import { UserManagerContext } from "../components/UserManager/UserManagerContext";

export const useUserManager = () => useContext(UserManagerContext);
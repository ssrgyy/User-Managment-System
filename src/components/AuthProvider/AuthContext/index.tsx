import { createContext } from "react";
import { AuthContextProviderValue } from "./types";

export const AuthContext = createContext({} as AuthContextProviderValue);
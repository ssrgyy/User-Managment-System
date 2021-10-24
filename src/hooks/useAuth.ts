import { useContext } from "react"
import { AuthContext } from "../components/AuthProvider/AuthContext"

export const useAuth = () => useContext(AuthContext);
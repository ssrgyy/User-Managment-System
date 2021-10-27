import { useContext } from "react";
import { RequestStatusContext } from "../components/RequestStatus/RequestStatusContext";

export const useRequestStatus = () => useContext(RequestStatusContext);
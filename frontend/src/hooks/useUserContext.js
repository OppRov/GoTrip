import { userContext } from "../contexts/userContext";
import { useContext } from "react";

export const useUserContext = () => useContext(userContext);

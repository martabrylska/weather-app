import {createContext} from "react";

export const LoginContext = createContext({
        isLoggedIn: false,
        setIsLoggedIn: (isLoggedIn: boolean) => {},
    })
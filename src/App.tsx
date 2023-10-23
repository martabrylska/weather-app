import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {FavoritesList} from "./components/Favorites/FavoritesList";
import {Header} from "./components/Header/Header";
import { LoginContext } from './contexts/login.context';
import {useLocalStorage} from "./hooks/useLocalStorage";


export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('is-logged-in', false);
    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>

            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/favorites" element={<FavoritesList/>}/>
            </Routes>
        </LoginContext.Provider>
    );
}

import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {LoginContext} from './contexts/login.context';
import {SearchContext} from './contexts/search.context';
import {UnitsContext} from './contexts/units.context';
import {Home} from "./components/Home/Home";
import {RegisterForm} from "./components/forms/RegisterForm";
import {LoginForm} from "./components/forms/LoginForm";
import {FavoritesList} from "./components/Favorites/FavoritesList";
import {Header} from "./components/layouts/Header";

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('is-logged-in', false);
    const [search, setSearch] = useLocalStorage('searched-city', {
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: 52.232,
        lon: 21.0067,
    })
    const [units, setUnits] = useState('metric');

    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <SearchContext.Provider value={{search, setSearch}}>
                <UnitsContext.Provider value={{units, setUnits}}>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/favorites" element={<FavoritesList/>}/>
                    </Routes>
                </UnitsContext.Provider>
            </SearchContext.Provider>
        </LoginContext.Provider>
    );
}

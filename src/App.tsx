import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {FavoritesList} from "./components/Favorites/FavoritesList";
import {Header} from "./components/Header/Header";
import {LoginContext} from './contexts/login.context';
import {useLocalStorage} from "./hooks/useLocalStorage";
import {SearchContext} from './contexts/search.context';
import { UnitsContext } from './contexts/units.context';


export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('is-logged-in', false);
    const [units, setUnits] = useState('metric');
    const [search, setSearch] = useLocalStorage('searched-city', {
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: 52.232,
        lon: 21.0067,
    })
    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <SearchContext.Provider value={{search, setSearch}}>
                <UnitsContext.Provider value={{units, setUnits}}>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/favorites" element={<FavoritesList/>}/>
                    </Routes>
                </UnitsContext.Provider>
            </SearchContext.Provider>
        </LoginContext.Provider>
    );
}

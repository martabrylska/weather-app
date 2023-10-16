import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {LoggIn} from "./components/LoggIn/LoggIn";
import {FavoritesList} from "./components/Favorites/FavoritesList";
import {Header} from "./components/Header/Header";


export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/logg-in" element={<LoggIn/>}/>
                <Route path="/favorites" element={<FavoritesList userId={''}/>}/>
            </Routes>
        </>
    );
}

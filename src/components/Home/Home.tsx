import React from 'react';
import {SearchContext} from '../../contexts/search.context';
import {Search} from "../Search/Search";
import {WeatherParams} from "../WeatherParams/WeatherParams";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const Home = () => {
    const [search, setSearch] = useLocalStorage('searched-city', {
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: 52.232,
        lon: 21.0067,
    })
    return <SearchContext.Provider value={{search, setSearch}}>
        <Search/>
        <WeatherParams/>
    </SearchContext.Provider>
}
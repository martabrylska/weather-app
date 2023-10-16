import React from 'react';
import './App.css';
import {ActualParams} from "./components/ActualParams/ActualParams";
import {NextHoursParams} from './components/NextHoursParams/NextHoursParams';
import {NextDaysParams} from './components/NextDaysParams/NextDaysParams';
import { SearchContext } from './contexts/search.context';
import {Search} from "./components/Search/Search";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {WeatherParams} from "./components/WeatherParams/WeatherParams";


export const App = () => {

    const [search, setSearch] = useLocalStorage('searched-city', {
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: 52.232,
        lon: 21.0067,
    })

    return (

          <SearchContext.Provider value={{search, setSearch}}>
                  <Search/>
                  <WeatherParams/>
          </SearchContext.Provider>

  );
}

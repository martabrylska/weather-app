import React, {useState} from 'react';
import './App.css';
import {ActualParams} from "./components/ActualParams/ActualParams";
import {NextHoursParams} from './components/NextHoursParams/NextHoursParams';
import {NextDaysParams} from './components/NextDaysParams/NextDaysParams';
import { SearchContext } from './contexts/search.context';
import {Search} from "./components/Search/Search";

export const App = () => {
    const [search, setSearch] = useState({
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: 52.232,
        lon: 21.0067,
    });

    return (

          <SearchContext.Provider value={{search, setSearch}}>

                  <Search/>
                  <ActualParams/>

                  <NextHoursParams/>
                  <NextDaysParams/>
          </SearchContext.Provider>

  );
}

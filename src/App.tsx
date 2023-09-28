import React, {useState} from 'react';
import './App.css';
import {Header} from "./components/layouts/Header";
import {ActualParams} from "./components/ActualParams/ActualParams";
import {NextHoursParams} from './components/NextHoursParams/NextHoursParams';
import {NextDaysParams} from './components/NextDaysParams/NextDaysParams';
import { SearchContext } from './contexts/search.context';

export const App = () => {
    const [search, setSearch] = useState({
        name: "Warsaw",
        state: "Masovian Voivodeship",
        country: "PL",
        lat: '52.232',
        lon: '21.0067',
    });

    return (

          <SearchContext.Provider value={{search, setSearch}}>

                  <Header/>
                  <ActualParams/>

                  <NextHoursParams/>
                  <NextDaysParams/>
          </SearchContext.Provider>

  );
}

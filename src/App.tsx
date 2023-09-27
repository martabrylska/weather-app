import React, {useState} from 'react';
import './App.css';
import {Header} from "./components/layouts/Header";
import {ActualParams} from "./components/ActualParams/ActualParams";
import {NextHoursParams} from './components/NextHoursParams/NextHoursParams';
import {NextDaysParams} from './components/NextDaysParams/NextDaysParams';
import { SearchContext } from './contexts/search.context';
import { CityContext } from './contexts/city.context';

export const App = () => {
    const [city, setCity] = useState({
        name: "London",
        state: "England",
        country: "GB",
        lat: '',
        lon: '',
        temp: '',
        tempMax: '',
        tempMin: '',
        desc: '',
        short: '',
    });
    return (
      <CityContext.Provider value={{city, setCity}}>
        <Header/>
        <ActualParams/>
        <NextHoursParams/>
        <NextDaysParams/>
      </CityContext.Provider>
  );
}

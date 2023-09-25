import React from 'react';
import './App.css';
import {Header} from "./components/layouts/Header";
import {ActualParams} from "./components/ActualParams/ActualParams";
import {NextHoursParams} from './components/NextHoursParams/NextHoursParams';
import {NextDaysParams} from './components/NextDaysParams/NextDaysParams'

export const App = () => {

  return (
      <>
        <Header/>
        <ActualParams/>
        <NextHoursParams/>
        <NextDaysParams/>
      </>
  );
}

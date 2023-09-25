import React from 'react';
import {SingleDayWeather} from "./SingleDayWeather";

import "./NextDaysParams.css"

export const NextDaysParams = () => {

    const nextDays = ['today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturdat'];

    return <div className="next-days">
        {
            nextDays.map(day => (
                <SingleDayWeather></SingleDayWeather>
            ))
        }
    </div>


}
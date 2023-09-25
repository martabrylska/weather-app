import React from 'react';
import {SingleHourWeather} from "./SingleHourWeather";

import "./NextHoursParams.css"

export const NextHoursParams = () => {

    const nextHours = ['now', '1am', '2am', '3am', '4am'];

    return <div className="next-hours">
        {
            nextHours.map(hour => (
                <SingleHourWeather></SingleHourWeather>
            ))
        }
    </div>

}
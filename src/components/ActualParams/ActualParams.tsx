import React, {useEffect, useState} from 'react';

import "./ActualParams.css"

export const ActualParams = () => {
    const apiId = '';

    const [city, setCity] = useState<{
        name: string;
        state: string;
        country: string;
        lat: string;
        lon: string;
        temp: string;
        tempMax: string;
        tempMin: string;
    }>({
        name: "London",
        state: "England",
        country: "GB",
        lat: "",
        lon: '',
        temp: '',
        tempMax: '',
        tempMin: '',
    });




    return (
        <div className="actual-weather">
            <h1>{city.name}, {city.state}, {city.country}</h1>
            <h2>{city.temp}</h2>
            <div>
                <p>H: {city.tempMax}</p>
                <p>L: {city.tempMin}</p>
            </div>
        </div>
    );
}
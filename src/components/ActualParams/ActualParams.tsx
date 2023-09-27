import React, {useContext, useEffect, useState} from 'react';
import {CityContext} from "../../contexts/city.context";

import "./ActualParams.css";
import {City} from "../../types/city";


export const ActualParams = () => {

    const apiKey = process.env.REACT_APP_API_KEY;

    const {city, setCity} = useContext(CityContext);

    useEffect(() => {
        (async () => {
            const respCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.name}&limit=5&appid=${apiKey}`);
            const dataCity = await respCity.json();

            if (dataCity[0].lat && dataCity[0].lon) {
                setCity({
                    ...city,
                    lat: `${dataCity[0].lat}`,
                    lon: `${dataCity[0].lon}`,
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (city.lat && city.lon) {
                const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
                const data = await resp.json();
                console.log(data);

                setCity({
                    ...city,
                    temp: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    desc: data.weather[0].description,
                    short: data.weather[0].main,
                })
            }
        })();
    }, [city.lat]);


    return (
        <div className="actual-weather">
            <h2>{city.name}, {city.state}, {city.country}</h2>
            <h1>{city.temp}°C</h1>
            <p></p>
            <div>
                <p>H: {city.tempMax}°C</p>
                <p>L: {city.tempMin}°C</p>
            </div>
        </div>
    );
}
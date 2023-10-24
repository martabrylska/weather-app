import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../contexts/search.context";
import {ActualWeather} from "../../types/weather";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";

import "./ActualParams.css";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LoginContext} from "../../contexts/login.context";
import {actualWeatherSetLink} from "../../utils/actualWeatherSetLink";

interface Props {
    actualWeather: ActualWeather;
}

export const ActualParams = (props: Props) => {

    const {actualWeather} = props;

    const {search} = useContext(SearchContext);
    const [link, setLink] = useState<string>('../../../public/haze.png');
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    const [isFav, setIsFav] = useState('');

    useEffect(() => {
        actualWeatherSetLink(actualWeather, setLink);
    }, [actualWeather.desc])

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/city/get-one?lat=${search.lat}&lon=${search.lon}`, {
                    credentials: "include",
                })
                const data = await res.json();
                if (data.message === 'Unauthorized') {
                    setIsLoggedIn(false);
                }
                if (data.id) {
                    setIsFav(data.id)
                } else {
                    setIsFav('')
                }
            } finally {
                // setLoading(false);
            }
        })()
    }, [search])


    const saveToFavorites = () => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/city/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...search,
                    }),
                });
                const data = await res.json();
                if (data.message === 'Unauthorized') {
                    setIsLoggedIn(false);
                }
                if (data.id) {
                    setIsFav(data.id);
                } else {
                    setIsFav('');
                }
            } finally {
                // setLoading(false);
            }
        })()
    }

    const removeFavFromList = async () => {
        try {
            const res = await fetch(`http://localhost:3001/city/remove/${isFav}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            setIsFav('');
        } finally {
            // setLoading(false);
        }
    }

    return (
        <>
            <div className="actual-weather-photo" style={{backgroundImage: `url(${link})`}}></div>
            <div className="actual-weather">
                <p>{new Date((actualWeather.time + actualWeather.timezone) * 1000).toUTCString()}</p>
                <div className="actual-weather-name">
                    <p>{search.name}</p>
                    {isLoggedIn && <button className={isFav && "added"} onClick={async () => {
                        if (isFav) {
                            await removeFavFromList()
                        } else {
                            await saveToFavorites()
                        }
                    }}><FontAwesomeIcon
                        icon={solid("heart")}/></button>}
                </div>
                <p className="state">{search.state &&
                    `${search.state}, `
                }{search.country}</p>
                <p>{capitalizeFirstLetter(actualWeather.desc)}</p>
                <p className="temp">{actualWeather.temp.toFixed()}°</p>
                <p>Feels like: {Number(actualWeather.tempSensed).toFixed()}°</p>
                <div>
                    <p>H: {actualWeather.tempMax.toFixed()}°</p>
                    <p>L: {actualWeather.tempMin.toFixed()}°</p>
                </div>
                <div>
                    <div><p>Cloudiness:</p> <p> {actualWeather.clouds}%</p></div>
                    <div><p>Humidity:</p> <p>{actualWeather.humidity}%</p></div>
                    <div><p>Pressure:</p> <p>{actualWeather.pressure}hPa</p></div>
                    <div><p>Rain:</p> <p>{actualWeather.rain.toFixed(1)}mm</p></div>
                    <div><p>Snow:</p> <p>{actualWeather.snow.toFixed(1)}mm</p></div>
                    <div><p>Wind:</p> <p>{(actualWeather.wind * 3600 / 1000).toFixed()}km/h</p></div>
                </div>
            </div>
        </>
    );
}
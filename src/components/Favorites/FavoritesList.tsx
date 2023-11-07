import React, {useContext, useEffect, useState} from 'react';
import {FavSingle} from "./FavSingle";
import {Loader} from "../common/Loader/Loader";
import {FiltersForm} from "../forms/FiltersForm";
import {LoginContext} from "../../contexts/login.context";
import {Favorites} from "../../types/city";
import {apiUrl} from "../../config/config";

import "./FavoritesList.css";

export const FavoritesList = () => {

    const {setIsLoggedIn} = useContext(LoginContext);
    const [favorites, setFavorites] = useState<Favorites[] | null>(null);
    const [mainWeatherDescriptions, setMainWeatherDescriptions] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const getFavoritesList = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${apiUrl}/city/user`, {
                credentials: "include",
            })
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            setFavorites(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await getFavoritesList()
        })()
    }, [])

    if (loading) {
        return <Loader/>
    }

    return <div className="favorites">
        <FiltersForm
            setFavorites={setFavorites}
            mainWeatherDescriptions={mainWeatherDescriptions}
            setLoading={setLoading}
            countries={countries}
        />
        <ul className="fav-list">
            {favorites?.map(fav => <FavSingle
                key={fav.id}
                fav={fav}
                setMainWeatherDescriptions={setMainWeatherDescriptions}
                setCountries={setCountries}
                getFavoritesList={getFavoritesList}/>)}
        </ul>
    </div>
}
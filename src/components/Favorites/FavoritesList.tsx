import React, {useContext, useEffect, useState} from 'react';
import {Favorites} from "../../types/weather";
import {FavSingle} from "./FavSingle";

import "./FavoritesList.css"
import {LoginContext} from "../../contexts/login.context";

export const FavoritesList = () => {

    const {setIsLoggedIn} = useContext(LoginContext);
    const [favorites, setFavorites] = useState<Favorites[] | null>(null);

    const getFavoritesList = async () => {
        try {
            const res = await fetch(`http://localhost:3001/city/user`, {
                credentials: "include",
            })
            const data = await res.json();
            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }
            setFavorites(data);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(()  => {
        (async () => {await getFavoritesList()})()
    }, [favorites?.length])


    return <div className="favorites">
        <div>Filters</div>
        <ul className="fav-list">
            {favorites?.map(fav => <FavSingle key={fav.id} fav={fav} getFavoritesList={getFavoritesList}/>)}
        </ul>
    </div>
}
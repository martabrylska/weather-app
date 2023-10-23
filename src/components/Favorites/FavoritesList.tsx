import React, {useEffect, useState} from 'react';
import {Favorites} from "../../types/weather";
import {FavSingle} from "./FavSingle";

import "./FavoritesList.css"

export const FavoritesList = () => {

    const [favorites, setFavorites] = useState<Favorites[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:3001/city/user`, {
                    credentials: "include",
                })

                const data = await res.json();
                console.log(data);

                setFavorites(data);

            } finally {
                // setLoading(false);
            }
        })()
    }, [])


    return <div className="favorites">
        <div>Filters</div>
        <ul className="fav-list">
            {favorites?.map(fav => <FavSingle key={fav.id} fav={fav}/>)}
        </ul>
    </div>
}
import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {Favorites} from "../../types/weather";
import {FavSingle} from "./FavSingle";

import "./FavoritesList.css";
import "./../Register/Register.css";
import {LoginContext} from "../../contexts/login.context";

export const FavoritesList = () => {

    const {setIsLoggedIn} = useContext(LoginContext);
    const [favorites, setFavorites] = useState<Favorites[] | null>(null);
    const [mainDesc, setMainDesc] = useState<string[]>([]);
    const [form, setForm] = useState({
        sort: '',
        country: '',
        mainDesc: '',
    });

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

    useEffect(() => {
        (async () => {
            await getFavoritesList()
        })()
    }, [])
    // favorites?.length

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const applyFilters = async (e: SyntheticEvent) => {
        e.preventDefault();
        // setLoading(true);

        try {
            console.log(form);
            const res = await fetch(`http://localhost:3001/city/filter`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();
            console.log(data);
            setFavorites(data);

        } finally {
            // setLoading(false);
        }
    }

return <div className="favorites">
    <div className="filters">
        <form className="register" onSubmit={applyFilters}>
            <label>
                Sort by: <br/>
                <select
                    name="sort"
                    value={form.sort}
                    onChange={e => {
                        updateForm(e.target.name, e.target.value);
                    }}>
                    <option value=""></option>
                    <option value="timezone">Timezone</option>
                    <option value="temp">Temperature</option>
                    <option value="wind">Wind</option>
                    <option value="clouds">Cloudiness</option>
                    <option value="humidity">Humidity</option>
                    <option value="pressure">Pressure</option>
                    <option value="snow">Snow</option>
                    <option value="rain">Rain</option>
                </select>
            </label>
            <p>
                <label>
                    Country: <br/>
                    <select
                        name="country"
                        value={form.country}
                        onChange={e => {
                            updateForm(e.target.name, e.target.value);
                        }}>
                        <option value=""></option>
                        {
                            favorites && Array.from(new Set(favorites.map(fav => fav.country))).map((country, i) =>
                                <option key={i} value={country}>{country}</option>)
                        }

                    </select>
                </label>
            </p>
            <p>
                <label>
                    Weather conditions: <br/>
                    <select
                        name="mainDesc"
                        value={form.mainDesc}
                        onChange={e => {
                            updateForm(e.target.name, e.target.value);
                        }}>
                        <option value=""></option>
                        {
                            mainDesc && Array.from(new Set(mainDesc)).map((desc, i) => <option key={i}
                                                                                               value={desc}>{desc}</option>)
                        }

                    </select>
                </label>
            </p>
            <button>Apply</button>
        </form>
    </div>
    <ul className="fav-list">
        {favorites?.map(fav => <FavSingle key={fav.id} fav={fav} mainDesc={mainDesc} setMainDesc={setMainDesc}
                                          getFavoritesList={getFavoritesList}/>)}
    </ul>
</div>
}
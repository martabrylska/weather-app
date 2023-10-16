import React, {SyntheticEvent, useState} from 'react';
import {Info} from "../Info/Info";

import "../Register/Register.css";


export const LoggIn = () => {

    const [id, setId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const loggIn = async (e: SyntheticEvent) => {
        e.preventDefault();

        // setLoading(true);

        try{
            const res = await fetch(`http://localhost:3001/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            setId(data.id);

        } finally {
            // setLoading(false);
        }

    }


    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    if (id) {
        return <Info text={`You have been successfully logged in.`}/>
    }


    return <form action="" className="register" onSubmit={loggIn}>
        <div className="actual-weather-photo"></div>
        <h1>Logg in to your account:</h1>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={99}
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Password: <br/>
                <input
                    type="password"
                    name="password"
                    required
                    maxLength={99}
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}/>
            </label>
        </p>
        <button>Logg in</button>
    </form>

}
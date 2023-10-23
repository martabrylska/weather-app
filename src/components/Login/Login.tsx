import React, {SyntheticEvent, useContext, useState} from 'react';
import {Info} from "../Info/Info";

import "../Register/Register.css";
import {LoginContext} from "../../contexts/login.context";


export const Login = () => {

    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    const [form, setForm] = useState({
        name: '',
        password: '',
    });
    const [msg, setMsg] = useState('');

    const signIn = async (e: SyntheticEvent) => {
        e.preventDefault();

        // setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            setIsLoggedIn(data.isSuccess);

            if (data.msg) {
                setMsg(data.msg);
            }

        } finally {
            // setLoading(false);
        }

    }

    const signOut = async () => {
        try {
            const res = await fetch(`http://localhost:3001/auth/logout`, {
                credentials: "include",
            });

            const data = await res.json();

            setIsLoggedIn(!data.isSuccess);
            updateForm('password', '');
            updateForm('name', '');
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

    if (isLoggedIn) {
        return(
        <div className="register">
            <Info text={`You are logged in.`}/>
            <button onClick={signOut}>Sign out</button>
        </div>)
    }


    return <form action="" className="register" onSubmit={signIn}>
        <div className="actual-weather-photo"></div>
        <h1>Logg in to your account:</h1>
        <p className="msg">{msg}</p>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={20}
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
                    maxLength={20}
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}/>
            </label>
        </p>
        <button>Sign in</button>
    </form>

}
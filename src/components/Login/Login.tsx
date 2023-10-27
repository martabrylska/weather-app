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

    const [units, setUnits] = useState('');
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordCopy: '',
    })
    const [msg, setMsg] = useState('');
    const [msgUnits, setMsgUnits] = useState('');

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

    const changePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        // setLoading(true);
        if (password.newPassword !== password.newPasswordCopy) {
            setMsg('New passwords are not the same. Try again.')
        } else {
            try {
                const res = await fetch(`http://localhost:3001/user/password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        currentPassword: password.currentPassword,
                        newPassword: password.newPassword,
                    }),
                });

                const data = await res.json();
                console.log(data);

                if (data.message === 'Unauthorized') {
                    setIsLoggedIn(false);
                }
                if (!data.isSuccess) {
                    setMsg('Wrong current password.')
                }
                if (data.isSuccess) {
                    setMsg('Password has been changed.')
                } else {
                    setMsgUnits('Ups... Something went wrong.')
                }

                setPassword({
                    currentPassword: '',
                    newPassword: '',
                    newPasswordCopy: '',
                })

            } finally {
                // setLoading(false);
            }
        }

    }

    const changeUnits = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3001/user/units/${units}`, {
                method: 'PATCH',
                credentials: "include",
            });

            const data = await res.json();

            if (data.message === 'Unauthorized') {
                setIsLoggedIn(false);
            }

            if (data.isSuccess) {
                setMsgUnits('Units has been changed.')
            } else {
                setMsgUnits('Ups... Something went wrong.')
            }

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

    const updatePassword = (key: string, value: any) => {
        setPassword(password => ({
            ...password,
            [key]: value,
        }))
    }

    if (isLoggedIn) {
        return (
            <div className="register">
                <div className="actual-weather-photo"></div>
                <Info text={`You are logged in.`}/>
                <button onClick={signOut}>Sign out</button>
                <div className="forms">
                    <form action="" className="register" onSubmit={changePassword}>
                        <h2>Change your password:</h2>
                        <p className="msg">{msg}</p>
                        <p>
                            <label>
                                Current password: <br/>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    required
                                    maxLength={20}
                                    value={password.currentPassword}
                                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label>
                                New password: <br/>
                                <input
                                    type="password"
                                    name="newPassword"
                                    required
                                    maxLength={20}
                                    value={password.newPassword}
                                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label>
                                Repeat new password: <br/>
                                <input
                                    type="password"
                                    name="newPasswordCopy"
                                    required
                                    maxLength={20}
                                    value={password.newPasswordCopy}
                                    onChange={e => updatePassword(e.target.name, e.target.value)}/>
                            </label>
                        </p>
                        <button>Change password</button>
                    </form>
                    <form className="register" onSubmit={changeUnits}>
                        <h2>Change units</h2>
                        <p className="msg">{msgUnits}</p>
                        <p>
                            <label>
                                Choose the units: <br/>
                                <select
                                    name="units"
                                    value={units}
                                    onChange={e => {
                                        setUnits(e.target.value);
                                    }}>
                                    <option value="metric">Celsius, meter/sec</option>
                                    <option value="imperial">Fahrenheit, miles/hour</option>
                                    <option value="standard">Kelvin, meter/sec</option>
                                </select>
                            </label>
                        </p>

                        <button>Change units</button>
                    </form>
                </div>
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
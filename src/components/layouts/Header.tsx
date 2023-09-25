import React from 'react';
import {Search} from "../Search/Search";
import {Logo} from "../Logo/Logo";
import "./Header.css"

export const Header = () => {

    return (
        <div className="header">
            <Logo></Logo>
            <Search></Search>
        </div>
    );
}
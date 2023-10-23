import React from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular, solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export const Header = () => {
    return (
        <header className="header">
            <div>
                <Link className="header-link" to={'/'}><img src="/logo.png" alt="logo"/></Link>
                <Link className="header-link" to='/favorites'><FontAwesomeIcon icon={solid("heart")}/></Link>
                <Link className="header-link" to='/register'><FontAwesomeIcon icon={solid("user-plus")}/></Link>
                <Link className="header-link" to='/logg-in'><FontAwesomeIcon icon={solid("right-to-bracket")}/></Link>
            </div>
        </header>
    );
}
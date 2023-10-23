import React from 'react';

import "./Info.css";

interface Props {
    text: string;
}

export const Info = (props: Props) => (
    <div className="info">
        <p>{props.text}</p>
    </div>
)
import React from 'react';

interface Props {
    text: string;
}

export const Info = (props: Props) => (
    <>
        <p>{props.text}</p>
    </>
)
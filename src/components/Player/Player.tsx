import React, { useState } from "react";


type Props = {
    title: string,
    artist: string,
    albumCover: string,
};

const Player: React.FC<Props> = props => {

    const {
        title,
        artist,
        albumCover,
    } = props;



    return (
        <div>
            <h2>{title}</h2>
            <h3>{artist}</h3>
            <img src={albumCover} alt="Album cover" />
        </div>
    );
};

export default Player;
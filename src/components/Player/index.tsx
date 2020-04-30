import React from "react";

import { AlbumCover, Title, Author } from './style';

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
        <>
            <AlbumCover src={albumCover} alt="Album cover" />
            <Title>{title}</Title>
            <Author>{artist}</Author>
        </>
    );
};

export default Player;
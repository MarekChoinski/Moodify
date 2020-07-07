import React from "react";

import { AlbumCover, Title, Author, PlayerWrapper } from './style';

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
        <PlayerWrapper>
            <AlbumCover src={albumCover} alt="Album cover" />
            <Title>{title}</Title>
            <Author>{artist}</Author>
        </PlayerWrapper>
    );
};

export default Player;
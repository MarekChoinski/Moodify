import { Dispatch } from "redux";

import * as types from './types';
import * as utils from './utils';
import axios from 'axios';
import { maxSongs } from '../../config/config';
import localforage from "localforage";


interface ITokenExpirationAction {
    type: typeof types.TOKEN_EXPIRED | typeof types.TOKEN_REFRESHED;
}

export const tokenExpired = (): ITokenExpirationAction => ({
    type: types.TOKEN_EXPIRED,
});

export const tokenRefreshed = (): ITokenExpirationAction => ({
    type: types.TOKEN_REFRESHED,
});

interface IPlayerActive {
    type: typeof types.NO_ACTIVE_PLAYER | typeof types.IS_ACTIVE_PLAYER;
}

export const noActivePlayer = (): IPlayerActive => ({
    type: types.NO_ACTIVE_PLAYER,
});

export const isActivePlayer = (): IPlayerActive => ({
    type: types.IS_ACTIVE_PLAYER,
});


interface ISetActualPlayingSongAction {
    type: typeof types.SET_ACTUAL_SONG;
    payload: {
        actualSong: types.Song & types.SongColor,
    }
}

export const setActualPlayingSong = (song: types.Song & types.SongColor): ISetActualPlayingSongAction => ({
    type: types.SET_ACTUAL_SONG,
    payload: {
        actualSong: song,
    }
});

//TODO is loading action
export const playMoodSong = () => async (
    dispatch: Dispatch,
    getState: () => any,
): Promise<void> => {
    try {
        console.log("weszlo");


        const allSongs: types.Song[] = [];
        const valence: number = getState().mood.valence
        const energy: number = getState().mood.energy
        const danceability: number = getState().mood.danceability

        await localforage.iterate((value: types.Song) => {
            allSongs.push(value);
        });

        if (!allSongs.length) return;

        let nearest = utils.getNearestSong(allSongs, valence, energy, danceability);
        let palette = await utils.getColorsFromAlbumCover(nearest.albumCover);


        dispatch(setActualPlayingSong({
            ...nearest,
            colors: palette,
        }));

        await axios.put('https://api.spotify.com/v1/me/player/play', {
            uris: [`spotify:track:${nearest.id}`],
        });

        // player is active and successfully plays song
        dispatch(isActivePlayer());

    } catch (error) {
        dispatch(setStatus("waiting"));

        if (error.message.includes("401") ||
            (error.response && error.response.status === 401)) {
            dispatch(tokenExpired());
        }

        if (error.message.includes("404")) {
            dispatch(noActivePlayer());
        }

        else {
            console.log(error);
        }
    }

};

interface ILoadingStatusAction {
    type: typeof types.LOADING_STATUS_CHANGE;
    payload: {
        songsLoadingStatus: types.loadingStatus,
    };
}

export const setStatus = (status: types.loadingStatus): ILoadingStatusAction => ({
    type: types.LOADING_STATUS_CHANGE,
    payload: {
        songsLoadingStatus: status,
    }
});

interface IGetSongsAction {
    type: typeof types.GET_SONGS;
    payload: {
        songs: types.Song[],
    };
}

export const getSongs = (songs: types.Song[]): IGetSongsAction => ({
    type: types.GET_SONGS,
    payload: {
        songs,
    }
});

//TODO is loading action
export const fetchSongs = (playMoodSong: () => Promise<void>) => async (
    dispatch: Dispatch,
): Promise<void> => {
    try {

        dispatch(setStatus("loading"));

        let len = await localforage.length();
        console.log(len, " localforage.length()");

        // let isSaved = await utils.songsSavedToIndexedDB

        if (!len) {
            let totalAmount = await utils.getSongsAmount();
            let songsDetails: types.SongInformation[] = [];

            let indexes = [...Array(Math.round(totalAmount / 50)).keys()];

            if (totalAmount > maxSongs) {
                // get random indexes in range of max amount
                indexes = utils.shuffleArray(indexes).slice(0, Math.round(maxSongs / 50));
            }

            for (let i of indexes) {
                const portion = await utils.fetchPortionSongDetails(i);
                songsDetails = [...songsDetails, ...portion];
            }

            const ids = songsDetails.map(details => details.id);

            let chunks: string[] = [];

            //splice to chunk of 100
            for (let i = 0; i < ids.length; i += 100) {
                chunks.push(ids.slice(i, i + 100).join(','))
            }

            let songsMood: types.SongMood[] = [];

            for (const chunk of chunks) {
                const portion = await utils.fetchPortionSongMood(chunk);
                songsMood = [...songsMood, ...portion];
            }

            const songs = (songsDetails as types.Song[]).map(itm => ({
                ...songsMood.find((item) => (item.id === itm.id) && item),
                ...itm
            }));

            await utils.saveSongsToIndexedDb(songs);
        }

        // dispatch(getSongs(songs));

        dispatch(setStatus("loaded"));

        await playMoodSong();

    } catch (error) {
        dispatch(setStatus("waiting"));

        if (error.message.includes("401") ||
            (error.response && error.response.status === 401)) {
            dispatch(tokenExpired());
        }

        else {
            console.log(error);
        }
    }

};

export type SpotifyActionsTypes =
    ITokenExpirationAction |
    IPlayerActive |
    IGetSongsAction |
    ILoadingStatusAction |
    ISetActualPlayingSongAction;



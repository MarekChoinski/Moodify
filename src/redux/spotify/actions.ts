import { Dispatch } from "redux";

import * as types from './types';
import axios, { AxiosResponse } from 'axios';

import Vibrant from 'node-vibrant'


interface ITokenExpirationAction {
    type: typeof types.TOKEN_EXPIRED | typeof types.TOKEN_REFRESHED;
}

export const tokenExpired = (): ITokenExpirationAction => ({
    type: types.TOKEN_EXPIRED,
});

export const tokenRefreshed = (): ITokenExpirationAction => ({
    type: types.TOKEN_REFRESHED,
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

        console.log("wszdl");


        const allSongs = getState().spotify.songs;
        const valence = getState().mood.valence
        const energy = getState().mood.energy
        const danceability = getState().mood.danceability

        console.log(allSongs.length);


        if (!allSongs.length) return;

        const distance = (song: types.Song) => {
            return Math.sqrt(
                Math.pow((song.valence - valence), 2) +
                Math.pow((song.energy - energy), 2) +
                Math.pow((song.danceability - danceability), 2)
            );
        };

        console.log(valence,
            energy,
            danceability);



        let nearest = allSongs.reduce((previous: types.Song, current: types.Song) =>
            distance(previous) < distance(current) ? previous : current
        );

        console.log(nearest.valence,
            nearest.energy,
            nearest.danceability);

        console.log(nearest, distance(nearest));


        let palette: any = await Vibrant.from(nearest.albumCover).getPalette();


        console.log(palette);

        palette = Object.assign({},
            ...Object.keys(palette).map(k => ({
                [k]: {
                    r: palette[k]._rgb[0].toFixed(0),
                    g: palette[k]._rgb[1].toFixed(0),
                    b: palette[k]._rgb[2].toFixed(0),
                }
            }))
        );

        nearest = {
            ...nearest,
            colors: palette,
        };


        console.log(nearest);



        console.log(palette);

        dispatch(setActualPlayingSong(nearest));

    } catch (error) {
        dispatch(setStatus("waiting"));

        if (error.response.status === 401) {
            dispatch(tokenExpired());
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

        let totalAmount = 0;
        let songsDetails: types.SongInformation[] = [];

        const fetchPortionSongDetails = async (
            offset: number,
        ) => await axios.get('https://api.spotify.com/v1/me/tracks', {
            params: {
                offset: offset * 50,
                limit: 50,
            }
        });

        const parseSongDetailsResponse = (response: AxiosResponse<any>) =>
            response.data.items.map((item: any) => ({
                id: item.track.id,
                title: item.track.name,
                artist: item.track.artists[0].name,
                albumCover: item.track.album.images[0].url,
            }));

        const shuffleArray = (a: any[]) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        const firstPortion = await fetchPortionSongDetails(0);

        totalAmount = firstPortion.data.total;

        if (totalAmount <= 50) {
            songsDetails = parseSongDetailsResponse(firstPortion);
        }

        else {
            let indexes = [...Array(Math.round(totalAmount / 50)).keys()];

            if (totalAmount > 1000) { //TODO: 1000
                // get 20 random indexes
                indexes = shuffleArray(indexes).slice(0, 20);//TODO: 20
            }

            for (let i of indexes) {
                const response = await fetchPortionSongDetails(i);
                const portion = parseSongDetailsResponse(response);
                songsDetails = [...songsDetails, ...portion];
            }
        }

        const ids = songsDetails.map(details => details.id);

        let chunks: string[] = [];

        //splice to chunk of 100
        for (let i = 0; i < ids.length; i += 100) {
            chunks.push(ids.slice(i, i + 100).join(','))
        }
        // console.log(chunks);



        const fetchPortionSongMood = async (
            ids: string,
        ) => await axios.get('https://api.spotify.com/v1/audio-features', {
            params: {
                ids
            }
        });

        let songsMood: types.SongMood[] = [];

        const parseSongMoodResponse = (response: AxiosResponse<any>) =>
            response.data.audio_features.map((item: any) => ({
                id: item.id,
                valence: item.valence,
                energy: item.energy,
                danceability: item.danceability,
            }));

        // console.log(r);

        for (const chunk of chunks) {
            const response = await fetchPortionSongMood(chunk);
            const portion = parseSongMoodResponse(response);
            songsMood = [...songsMood, ...portion];
        }

        const songs = <types.Song[]>songsDetails.map(itm => ({
            ...songsMood.find((item) => (item.id === itm.id) && item),
            ...itm
        }));


        dispatch(getSongs(songs));
        dispatch(setStatus("loaded"));

        playMoodSong!();


    } catch (error) {
        dispatch(setStatus("waiting"));
        if (error.response.status === 401) {
            dispatch(tokenExpired());
        }

        else {
            console.log(error);
        }
    }

};




export type SpotifyActionsTypes =
    ITokenExpirationAction |
    IGetSongsAction |
    ILoadingStatusAction |
    ISetActualPlayingSongAction;



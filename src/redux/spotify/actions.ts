import { Dispatch } from "redux";

import * as types from './types';
import axios, { AxiosResponse } from 'axios';


interface ITokenExpirationAction {
    type: typeof types.TOKEN_EXPIRED | typeof types.TOKEN_REFRESHED;
}

export const tokenExpired = (): ITokenExpirationAction => ({
    type: types.TOKEN_EXPIRED,
});

export const tokenRefreshed = (): ITokenExpirationAction => ({
    type: types.TOKEN_REFRESHED,
});

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
export const fetchSongs = () => async (
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

            if (totalAmount > 1000) {
                // get 20 random indexes
                indexes = shuffleArray(indexes).slice(0, 20);
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

        console.log(songsMood);


        const songs = songsDetails.map(itm => ({
            ...songsMood.find((item) => (item.id === itm.id) && item),
            ...itm
        }));

        // https://stackoverflow.com/questions/19480008/javascript-merging-objects-by-id



        dispatch(getSongs(songs));
        dispatch(setStatus("loaded"));

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
    ILoadingStatusAction;



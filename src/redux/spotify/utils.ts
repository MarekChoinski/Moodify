import axios, {
    AxiosResponse
} from 'axios';

import * as types from './types';
import Vibrant from 'node-vibrant';

import localforage from 'localforage';

export const shuffleArray = (a: number[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const getSongsAmount = async (): Promise<number> => {
    try {
        const portion = await axios.get('https://api.spotify.com/v1/me/tracks', {
            params: {
                limit: 1,
            }
        });

        return portion.data.total;

    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPortionSongDetails = async (
    offset: number,
): Promise<types.SongInformation[]> => {
    try {
        const portion = await axios.get('https://api.spotify.com/v1/me/tracks', {
            params: {
                offset: offset * 50,
                limit: 50, // max limit according to spotify documentation
            }
        });

        return portion.data.items.map((item: any) => ({
            id: item.track.id,
            title: item.track.name,
            artist: item.track.artists[0].name,
            albumCover: item.track.album.images[0].url,
        }));
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchPortionSongMood = async (
    ids: string,
): Promise<types.SongMood[]> => {
    try {
        const portion = await axios.get('https://api.spotify.com/v1/audio-features', {
            params: {
                ids
            }
        });

        return portion.data.audio_features.map((item: any) => ({
            id: item.id,
            valence: item.valence,
            energy: item.energy,
            danceability: item.danceability,
        }));
    } catch (error) {
        throw new Error(error);
    }
};

export const getNearestSong = (
    allSongs: types.Song[],
    valence: number,
    energy: number,
    danceability: number,
): types.Song => {
    const distance = (song: types.Song) => {
        return Math.sqrt(
            Math.pow((song.valence - valence), 2) +
            Math.pow((song.energy - energy), 2) +
            Math.pow((song.danceability - danceability), 2)
        );
    };

    return allSongs.reduce((previous: types.Song, current: types.Song) =>
        distance(previous) < distance(current) ? previous : current
    );

};

export const getColorsFromAlbumCover = async (albumCover: string) => {
    let palette: any = await Vibrant.from(albumCover).getPalette();

    return Object.assign({},
        ...Object.keys(palette).map(k => ({
            [k]: {
                r: palette[k]._rgb[0].toFixed(0),
                g: palette[k]._rgb[1].toFixed(0),
                b: palette[k]._rgb[2].toFixed(0),
            }
        }))
    );
}

export const saveSongsToIndexedDb = async (allSongs: types.Song[]): Promise<void> => {
    try {
        //await localforage.clear(); //TODO not neccesary tbh
        for (const song of allSongs) {
            await localforage.setItem(song.id, song);
        }
    } catch (error) {
        throw new Error(error);
    }
};

//TODO dont work
export const songsSavedToIndexedDB = async (): Promise<boolean> => {
    try {
        let len = await localforage.length();
        console.log(len, " localforage.length()");

        return !!len;
    } catch (error) {
        throw new Error(error);
    }
};
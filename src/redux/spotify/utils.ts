import axios, {
    AxiosResponse
} from 'axios';

import * as types from './types';
import Vibrant from 'node-vibrant';

import localforage from 'localforage';


//tested
export const shuffleArray = (array: number[]) => {
    let shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

//tested
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

//tested
export const fetchPortionSongDetails = async (
    offset: number,
): Promise<types.SongInformation[]> => {
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
};

//tested
export const fetchPortionSongMood = async (
    ids: string,
): Promise<types.SongMood[]> => {
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
};

//testing
export const getColorsFromAlbumCover = async (albumCover: string) => {
    let palette: any = await Vibrant.from(albumCover).getPalette();

    // return palette;

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
    //await localforage.clear(); //TODO not neccesary tbh
    for (const song of allSongs) {
        await localforage.setItem(song.id, song);
    }
};

//TODO dont work
export const songsSavedToIndexedDB = async (): Promise<boolean> => {
    let len = await localforage.length();
    console.log(len, " localforage.length()");

    return !!len;
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
import axios, {
    AxiosResponse
} from 'axios';

import * as types from './types';

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
): Promise<types.SongInformation> => {
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
}
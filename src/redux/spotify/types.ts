export const TOKEN_EXPIRED = "moodify/TOKEN_EXPIRED";
export const TOKEN_REFRESHED = "moodify/TOKEN_REFRESHED";
export const GET_SONGS = "moodify/GET_SONGS";
export const LOADING_STATUS_CHANGE = "moodify/LOADING_STATUS_CHANGE";
export const SET_ACTUAL_SONG = "moodify/SET_ACTUAL_SONG";

export type SongInformation = {
    id: string,
    title: string,
    artist: string,
    albumCover: string,
}

export type SongMood = {
    id: string,
    valence: number,
    energy: number,
    danceability: number,
};

export type Song = SongInformation & SongMood;

export type loadingStatus = "waiting" | "loading" | "loaded";

export interface ISpotifyState {
    readonly isTokenExpired: boolean,
    readonly songsLoadingStatus: loadingStatus,
    readonly songs: Song[],
    readonly actualSong: Song | null,
}



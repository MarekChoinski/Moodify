export const TOKEN_EXPIRED = "moodify/TOKEN_EXPIRED";
export const TOKEN_REFRESHED = "moodify/TOKEN_REFRESHED";

export interface ISpotifyState {
    readonly tokenExpired: boolean,
    readonly loadingSongs: boolean,
    readonly songs: any[],
}



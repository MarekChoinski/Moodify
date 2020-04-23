export const SET_VALENCE = "moodify/SET_VALENCE";
export const SET_ENERGY = "moodify/SET_ENERGY";
export const SET_DANCEABILITY = "moodify/SET_DANCEABILITY";

export interface IMoodState {
    readonly valence: number,
    readonly energy: number,
    readonly danceability: number,
}



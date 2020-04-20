export const SET_VALENCY = "moodify/SET_VALENCY";
export const SET_ENERGY = "moodify/SET_ENERGY";
export const SET_DANCEABILITY = "moodify/SET_DANCEABILITY";

export interface IMoodState {
    readonly valency: number,
    readonly energy: number,
    readonly danceability: number,
}



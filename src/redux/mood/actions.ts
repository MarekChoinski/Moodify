import * as types from './types';

interface ISetValenceAction {
    type: typeof types.SET_VALENCE;
    payload: {
        valence: number,
    };
}

export const setValency = (valence: number): ISetValenceAction => ({
    type: types.SET_VALENCE,
    payload: {
        valence,
    },
});

interface ISetEnergyAction {
    type: typeof types.SET_ENERGY;
    payload: {
        energy: number,
    };
}

export const setEnergy = (energy: number): ISetEnergyAction => ({
    type: types.SET_ENERGY,
    payload: {
        energy,
    },
});

interface ISetDanceabilityAction {
    type: typeof types.SET_DANCEABILITY;
    payload: {
        danceability: number,
    };
}

export const setDanceability = (danceability: number): ISetDanceabilityAction => ({
    type: types.SET_DANCEABILITY,
    payload: {
        danceability,
    },
});


export type MoodActionsTypes =
    ISetValenceAction |
    ISetEnergyAction |
    ISetDanceabilityAction;


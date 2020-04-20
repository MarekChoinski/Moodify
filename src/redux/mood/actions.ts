import * as types from './types';

interface ISetValencyAction {
    type: typeof types.SET_VALENCY;
    payload: {
        valency: number,
    };
}

export const setValency = (valency: number): ISetValencyAction => ({
    type: types.SET_VALENCY,
    payload: {
        valency,
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
    ISetValencyAction |
    ISetEnergyAction |
    ISetDanceabilityAction;


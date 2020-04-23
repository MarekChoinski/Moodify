
import * as types from './types';
import { MoodActionsTypes } from './actions';

const initialState: types.IMoodState = {
    valence: 0.5,
    energy: 0.5,
    danceability: 0.5,
};

const reducer = (
    state = initialState,
    action: MoodActionsTypes,
): types.IMoodState => {

    switch (action.type) {
        case types.SET_VALENCE:
        case types.SET_ENERGY:
        case types.SET_DANCEABILITY:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default reducer;

import * as types from './types';
import { SpotifyActionsTypes } from './actions';

const initialState: types.ISpotifyState = {
    isTokenExpired: false,
    loadingSongs: false,
    songs: [],
};

const reducer = (
    state = initialState,
    action: SpotifyActionsTypes,
): types.ISpotifyState => {

    switch (action.type) {
        // case GET_TOKEN:
        //     return {
        //         ...state,
        //         ...action.payload,
        //     }
        case types.TOKEN_EXPIRED:
            return {
                ...state,
                isTokenExpired: true,
            }
        case types.TOKEN_REFRESHED:
            return {
                ...state,
                isTokenExpired: false,
            }
        default:
            return state;
    }
};

export default reducer;

import * as types from './types';
import { SpotifyActionsTypes } from './actions';

const initialState: types.ISpotifyState = {
    isTokenExpired: false,
    songsLoadingStatus: "waiting",
    songs: [],
    actualSong: null,
    isSpotifyPlayerActive: true,
};

const reducer = (
    state = initialState,
    action: SpotifyActionsTypes,
): types.ISpotifyState => {

    switch (action.type) {
        case types.GET_SONGS:
        case types.SET_ACTUAL_SONG:
        case types.LOADING_STATUS_CHANGE:
            return {
                ...state,
                ...action.payload,
            }
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
        case types.IS_ACTIVE_PLAYER:
            return {
                ...state,
                isSpotifyPlayerActive: true,
            }
        case types.NO_ACTIVE_PLAYER:
            return {
                ...state,
                isSpotifyPlayerActive: false,
            }
        default:
            return state;
    }
};

export default reducer;
import { Dispatch } from "redux";

import * as types from './types';
import axios from 'axios';


interface ITokenExpiration {
    type: typeof types.TOKEN_EXPIRED | typeof types.TOKEN_REFRESHED;
}

export const tokenExpired = (): ITokenExpiration => ({
    type: types.TOKEN_EXPIRED,
});

export const tokenRefreshed = (): ITokenExpiration => ({
    type: types.TOKEN_REFRESHED,
});

export const getSongs = () => async (
    dispatch: Dispatch,
): Promise<void> => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
            params: {
                limit: 50,
                offset: 0,
            }
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }

};


export type SpotifyActionsTypes =
    ITokenExpiration;



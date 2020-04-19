import { Dispatch } from "redux";

import * as types from './types';


interface ITokenExpiration {
    type: typeof types.TOKEN_EXPIRED | typeof types.TOKEN_REFRESHED;
}

export const tokenExpired = (): ITokenExpiration => ({
    type: types.TOKEN_EXPIRED,
});

export const tokenRefreshed = (): ITokenExpiration => ({
    type: types.TOKEN_REFRESHED,
});

export const getSongs = (
    content: string,
    attachedPhoto?: File,
) => async (
    dispatch: Dispatch<any>,
    ): Promise<void> => {

        try {


        } catch (error) {
            // TODO here should came action with meta error
            console.error(error);
        }

    };


export type SpotifyActionsTypes =
    ITokenExpiration;



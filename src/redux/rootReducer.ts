import { combineReducers } from 'redux';

import spotifyReducer from './spotify/reducer';


const rootReducer = combineReducers({
    spotify: spotifyReducer,
    // game: gameReducer,
    // auth: authReducer,
    // ui: uiReducer
});

export default rootReducer;
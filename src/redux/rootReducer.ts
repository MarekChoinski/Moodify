import { combineReducers } from 'redux';

import spotifyReducer from './spotify/reducer';
import moodReducer from './mood/reducer';

const rootReducer = combineReducers({
    spotify: spotifyReducer,
    mood: moodReducer,
});

export default rootReducer;
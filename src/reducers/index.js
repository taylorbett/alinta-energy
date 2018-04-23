import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';

const combinedReducer = combineReducers({
    movies: moviesReducer,
});

export default combinedReducer;
import { 
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_ERROR 
} from '../constants';

export const fetchMoviesRequest = () => ({
    type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (data) => ({
    type: FETCH_MOVIES_SUCCESS,
    data,
});

export const fetchMoviesError = () => ({
    type: FETCH_MOVIES_ERROR,
});
import * as MoviesActions from './moviesActions';
import * as constants from '../constants';

describe('moviesActions', () => {
    it('should create an action to fetch movies', () => {
        const expectedAction = {
            type: constants.FETCH_MOVIES_REQUEST
        };
        expect(MoviesActions.fetchMoviesRequest()).toEqual(expectedAction);
    });

    it('should create an action when movies successfully retrieved', () => {
        const data = {};
        
        const expectedAction = {
            type: constants.FETCH_MOVIES_SUCCESS,
            data: {}
        };
        expect(MoviesActions.fetchMoviesSuccess(data)).toEqual(expectedAction);
    });

    it('should create an action when movies failed to retrieve', () => {
        const expectedAction = {
            type: constants.FETCH_MOVIES_ERROR
        };
        expect(MoviesActions.fetchMoviesError()).toEqual(expectedAction);
    });
});
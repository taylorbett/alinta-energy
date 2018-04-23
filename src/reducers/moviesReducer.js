import { 
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
} from '../constants';


const initialState = {
    isFetching: false,
    data: [],
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case FETCH_MOVIES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            });
        default:
            return state;
    }
};

export default moviesReducer;
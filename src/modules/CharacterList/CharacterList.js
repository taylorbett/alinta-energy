import React from 'react';
import { connect } from 'react-redux';

class CharacterList extends React.Component {
    render() {
        return (
            <div className="character-list">
                Hello
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovies: () => dispatch({ type: 'FETCH_MOVIES' }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
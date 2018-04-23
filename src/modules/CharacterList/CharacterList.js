import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as MoviesActions from '../../actions/moviesActions';

class CharacterList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortRolesBy: 'movie',
        }

        this.fetchMovies = this.fetchMovies.bind(this);
        this.sortByActor = this.sortByActor.bind(this);
        this.renderRoles = this.renderRoles.bind(this);
        this.renderActors = this.renderActors.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        if (!this.props.movies.data.length) {
            this.props.dispatch(MoviesActions.fetchMoviesRequest());
            this.fetchMovies();
        }
    }

    async fetchMovies() {
        // const fetchUrl = 'https://alintacodingtest.azurewebsites.net/api/Movies';
        // const request = await fetch(fetchUrl, fetchOptions);
        const requestData = [{"name":"Beverly Hills Cop","roles":[{"name":"Axel Foley","actor":"Eddie Murphy"},{"name":"Billy Rosewood","actor":"Judge Reinhold"},{"name":"Sgt. Taggart","actor":"John Ashton"},{"name":"Jenny Summers","actor":"Lisa Eilbacher"},{"name":"Mikey Tandino","actor":""}]},{"name":"Stand By Me","roles":[{"name":"Gorgie Lachance","actor":"Wil Wheaton"},{"name":"Chris Chambers","actor":"River Phoenix"},{"name":"Teddy Duchamp","actor":"Corey Feldman"},{"name":"Ace Merrill","actor":"Keifer Sutherland"},{"name":"The Writer","actor":"Richard Dreyfuss"}]},{"name":"Star Trek","roles":[{"name":"Romulan","actor":"Wil Wheaton"},{"name":"Kirk","actor":"Chris Pine"},{"name":"Nero","actor":"Eric Bana"},{"name":"Spock","actor":"Leonard Nimoy"},{"name":"Scotty","actor":"Simon Pegg"},{"name":"Amanda Grayson","actor":"Winona Ryder"}]},{"name":"Family Guy","roles":[{"name":"Meg Griffin","actor":"Mila Kunis"},{"name":"Meg Griffin","actor":"Mila Kunis"},{"name":"Chris Griffin","actor":"Seth Green"},{"name":"Luke Skywalker","actor":"Seth Green"},{"name":"Joe Swanson"},{"name":"Lois Griffin","actor":"Alex Borstein"}]},{"roles":[{"name":"Dr Barry Wolfson","actor":"Keifer Sutherland"}]}];
        this.props.dispatch(MoviesActions.fetchMoviesSuccess(requestData));
    }

    sortByActor(movies) {
        let output = [];
        movies.forEach(movie => {
            movie.roles.forEach(role => {
                let existingEntries = output.filter(item => item.actor === role.actor);
                if (!existingEntries.length) {
                    if (role.actor !== undefined && role.actor) output.push({
                        actor: role.actor,
                        roles: [
                            {
                                movie: movie.name || '',
                                character: role.name
                            }
                        ]
                    });
                } else if (!existingEntries[0].roles.filter(item => item.character === role.name).length) {
                    existingEntries[0].roles.push({
                        movie: movie.name || '',
                        character: role.name
                    });
                }
            })
        });
        return output;
    }

    renderRoles(actor) {
        return actor.roles.sort((a, b) => {
            const strA = a[this.state.sortRolesBy].toLowerCase();
            const strB = b[this.state.sortRolesBy].toLowerCase();
            if (strA < strB) return -1;
            if (strA > strB) return 1;
            return 0;
        }).map((role, index) => {
            return (
                <li key={index}>{role.character}</li>
            );
        });
    }

    renderActors() {
        return this.sortByActor(this.props.movies.data).map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <p>{item.actor}</p>
                    <ul>
                        {this.renderRoles(item)}
                    </ul>
                </React.Fragment>
            )
        })
    }

    handleChange(event) {
        this.setState({
            sortRolesBy: event.target.value
        });
    }
    
    render() {
        if (!this.props.movies.data.length) {
            return null;
        }

        return (
            <div className="character-list">
                <label>
                    Sort roles by
                    <select value={this.state.sortRolesBy} onChange={this.handleChange} name="role-sort">
                        <option value="movie">movie</option>
                        <option value="character">character</option>
                    </select>
                </label>
                {this.renderActors()}
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
        actions: bindActionCreators(MoviesActions, dispatch),
        dispatch,
    };
}

CharacterList.propTypes = {
    movies: PropTypes.shape({
        isFetching: PropTypes.bool,
        data: PropTypes.array,
    }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as MoviesActions from '../../actions/moviesActions';

class CharacterList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchMovies = this.fetchMovies.bind(this);
        this.sortByActor = this.sortByActor.bind(this);
        this.renderRoles = this.renderRoles.bind(this);
        this.renderActors = this.renderActors.bind(this);
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
                if (!output.filter(item => item.actor === role.actor).length) {
                    if (role.actor !== undefined && role.actor) output.push({
                        actor: role.actor,
                        roles: [
                            {
                                movie: movie.name || '',
                                character: role.name
                            }
                        ]
                    });
                } else {
                    output.filter(item => item.actor === role.actor)[0].roles.push({
                        movie: movie.name || '',
                        character: role.name
                    });
                }
            })
        });
        console.log(output);
        return output;
    }

    renderRoles(actor, sortParam = 'movie') {
        return actor.roles.sort((a, b) => {
            const strA = a[sortParam].toLowerCase();
            const strB = b[sortParam].toLowerCase();
            if (strA < strB) return -1;
            if (strA > strB) return 1;
            return 0;
        }).map((role, index) => {
            return (
                <li key={index}>{role.character}</li>
            )
        })
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
    
    render() {
        if (!this.props.movies.data.length) {
            return null;
        }

        return (
            <div className="character-list">
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
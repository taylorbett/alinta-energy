import React from 'react';
import { CharacterList } from './CharacterList';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const movies = {
        isFetching: false,
        data: [{
            "name":"Beverly Hills Cop",
            "roles":[{
                "name":"Axel Foley",
                "actor":"Eddie Murphy"
            }, {
                "name":"Billy Rosewood",
                "actor":"Judge Reinhold"
            }],
        }, {
            "name": "Stand By Me",
            "roles": [{
                "name": "Gorgie Lachance",
                "actor": "Wil Wheaton"
            }],
        }, {
            "name":"Family Guy",
            "roles":[{
                "name":"Meg Griffin",
                "actor":"Mila Kunis"
            }, {
                "name":"Meg Griffin",
                "actor":"Mila Kunis"
            }, {
                "name":"Chris Griffin",
                "actor":"Seth Green"
            }]
        }, {
            "roles":[{
                "name": "Dr Barry Wolfson",
                "actor": "Keifer Sutherland"
            }]
        }],
    };
    const tree = renderer
        .create(<CharacterList movies={movies} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


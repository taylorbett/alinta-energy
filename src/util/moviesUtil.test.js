import { sortByActor } from './moviesUtil';

describe('moviesUtil', () => {
    it('should reshape API data to be grouped by actors name', () => {
        const movies = [{
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
        }];
        const expectedOutput = [{
            "actor":"Eddie Murphy",
            "roles":[{
                "movie": "Beverly Hills Cop",
                "character":"Axel Foley",
            }]
        }, {
            "actor":"Judge Reinhold",
            "roles":[{
                "movie": "Beverly Hills Cop",
                "character":"Billy Rosewood",
            }]
        }, {
            "actor":"Wil Wheaton",
            "roles":[{
                "movie": "Stand By Me",
                "character":"Gorgie Lachance",
            }]
        }];
        expect(sortByActor(movies)).toEqual(expectedOutput);
    });

    it('should handle duplicate roles', () => {
        const movies = [{
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
        }];
        const expectedOutput = [{
            "actor":"Mila Kunis",
            "roles":[{
                "movie": "Family Guy",
                "character":"Meg Griffin",
            }]
        }, {
            "actor":"Seth Green",
            "roles":[{
                "movie": "Family Guy",
                "character":"Chris Griffin",
            }]
        }];
        expect(sortByActor(movies)).toEqual(expectedOutput);
    });

    it('should handle undefined/null film names', () => {
        const movies = [{
            "roles":[{
                "name": "Dr Barry Wolfson",
                "actor": "Keifer Sutherland"
            }]
        }];
        const expectedOutput = [{
            "actor":"Keifer Sutherland",
            "roles":[{
                "movie": "",
                "character":"Dr Barry Wolfson",
            }]
        }];
        expect(sortByActor(movies)).toEqual(expectedOutput);
    });

    it('should handle undefined/null character names', () => {
        const movies = [{
            "name": "The Big Lebowski",
            "roles":[{
                "name": "",
                "actor": "Keifer Sutherland"
            }]
        }];
        const expectedOutput = [{
            "actor":"Keifer Sutherland",
            "roles":[{
                "movie": "The Big Lebowski",
                "character":"",
            }]
        }];
        expect(sortByActor(movies)).toEqual(expectedOutput);
    });

    it('should handle empty actor names', () => {
        const movies = [{
            "name": "Beverly Hills Cop",
            "roles":[{
                "name": "Jenny Summers",
                "actor": "Lisa Eilbacher"
            }, {
                "name": "Mikey Tandino",
                "actor": ""
            }]
        }];
        const expectedOutput = [{
            "actor":"Lisa Eilbacher",
            "roles":[{
                "movie": "Beverly Hills Cop",
                "character":"Jenny Summers",
            }]
        }];
        expect(sortByActor(movies)).toEqual(expectedOutput);
    });

    it('should handle undefined input', () => {
        const expectedOutput = [];
        expect(sortByActor()).toEqual(expectedOutput);
    });

    it('should handle null input', () => {
        const expectedOutput = [];
        expect(sortByActor(null)).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const expectedOutput = [];
        expect(sortByActor([])).toEqual(expectedOutput);
    });
});
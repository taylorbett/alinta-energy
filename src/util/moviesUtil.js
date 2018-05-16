export const sortByActor = (movies) => {
    let output = [];
    if (movies === undefined || !movies || !movies.length) {
        return output;
    }
    movies.forEach(movie => {
        movie.roles.forEach(role => {
            let existingEntries = output.filter(item => item.actor === role.actor);
            if (!existingEntries.length) {
                if (role.actor !== undefined && role.actor) {
                    output.push({
                        actor: role.actor,
                        roles: [
                            {
                                movie: movie.name || '',
                                character: role.name || '',
                            }
                        ]
                    });
                }
            } else if (!existingEntries[0].roles.filter(item => item.character === role.name).length) {
                existingEntries[0].roles.push({
                    movie: movie.name || '',
                    character: role.name || '',
                });
            }
        });
    });
    return output;
};
/**
 * findAllSnakePaths
 *
 * @param {*} word
 * @param {*} grid_size
 * @returns
 */
function findAllSnakePaths(word, limit = Infinity, grid_size, directions) {

    grid_size = grid_size || word.length;

    directions = directions || [
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
        [1, 1], // Down and Right
        [-1, -1], // Up and Left
        [1, -1], // Down and Left
        [-1, 1], // Up and Right
    ];

    directions.sort((a, b) => Math.random() - 0.5);

    // @todo - Implement bends options

    let validPaths = [];

    const center = Math.floor(grid_size / 2);

    function isInsideGrid(x, y) {
        return x >= 0 && x < grid_size && y >= 0 && y < grid_size;
    }

    function findPathsRecursive(x, y, path) {

        if (path.length === word.length) {
            validPaths.push([...path]);
            return;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (
                isInsideGrid(newX, newY) &&
                !path.some((coords) => coords[0] === newX && coords[1] === newY)
            ) {
                path.push([newX, newY]);
                if (validPaths.length < limit) {
                    findPathsRecursive(newX, newY, path);
                }
                path.pop();
            }
        }

    }

    findPathsRecursive(center, center, [[center, center]]);

    validPaths.sort((a, b) => Math.random() - 0.5);

    return validPaths;

}

export {findAllSnakePaths};

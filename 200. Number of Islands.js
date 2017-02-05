// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// 11110
// 11010
// 11000
// 00000
// Answer: 1

// Example 2:

// 11000
// 11000
// 00100
// 00011
// Answer: 3


/**
 * @param {character[][]} grid
 * @return {number}
 */
// dfs could be stack overflow so, bfs is better
// BFS
var numIslands = function(grid) {
    if (grid === null || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    
    const m = grid.length,
          n = grid[0].length;
    
    let islands = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                bfs(grid, i, j, m, n);
                islands++;
            }
        }
    }
    
    return islands;
};

function bfs(grid, x, y, m, n) {
    let queue = [];
    const directionX = [0, 1, -1, 0];
    const directionY = [1, 0, 0, -1];
    
    // 放进去的不是grid[x][y]本身！是x, y坐标
    queue.push({x: x, y: y});
    grid[x][y] = '0';
    
    while (queue.length > 0) {
        let head = queue.shift();

        for (let s = 0; s < 4; s++) {
            // shift出来的head的x, y！！！不是直接的x，y
            let nei = {x: head.x + directionX[s],
                      y: head.y + directionY[s]
            };

            if (nei.x < 0 || nei.y < 0 || nei.x >= m || nei.y >= n) {
                continue;
            }

            if (grid[nei.x][nei.y] === '1') {
                // 不是push grid。 push nei！
                queue.push(nei);
                // weird typo... 变量名不要太长 不然【】会看错
                grid[nei.x][nei.y] = '0';
            }
        }
    }
    return;
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (grid === null || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    
    var m = grid.length,
        n = grid[0].length,
        answer = 0;
        
    // two for loop every one in the grid
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            // they are string '0' or '1'
            if (grid[i][j] === '0') {
                continue;
            } else if (grid[i][j] === '1') {
                answer++;
                dfs(grid, i, j, m, n);
            }
        }
    }
    
    return answer;
};

function dfs(grid, i, j, m, n) {
    // if going up down, left, right is out of the matrix edge, just return
    if (i < 0 || i >= m || j < 0 || j >= n) {
        return;
    }
    
    // if === '1', change it to '0'
    // when for loop passes through it, it will be 0, so the answer won't + 1
    if (grid[i][j] === '1') {
        grid[i][j] = '0';
        // check its up, down, left, right
        dfs(grid, i - 1, j, m, n);
        dfs(grid, i + 1, j, m, n);
        dfs(grid, i, j - 1, m, n);
        dfs(grid, i, j + 1, m, n);
    }
}
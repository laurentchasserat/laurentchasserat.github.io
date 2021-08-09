let createBlankGrid = function (width, height) {
    let grid = [];
    for (let i = 0; i < width; i++) {
        grid.push([]);
        for (let j = 0; j < height; j++) {
            grid[i].push(0);
        }
    }
    return grid;
}

let grid = createBlankGrid(25, 25);

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtnGame");

// Get the button that opens the modal
var stepBtn = document.getElementById("stepBtn");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        stopGame();
    }
}

stepBtn.onclick = function () {
    nextStep();
}

let ctx = document.getElementById('myCanvas').getContext('2d');
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, 526, 526);

let startGame = function () {
    console.log("Game of Life started !");
    drawGrid();
}

let stopGame = function () {
    document.getElementById("auto").checked = false;
}

let displayGrid = function () {
    let line = "";
    for (let i = 0; i < grid.length; i++) {
        line = "[ ";
        for (let j = 0; j < grid[i].length; j++) {
            line += grid[i][j].toString() + " ";
        }
        line += "]";
        console.log(line)
    }
}

let drawGrid = function () {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                ctx.fillStyle = "#eeeeee";
            } else if (grid[i][j] === 1) {
                ctx.fillStyle = "#007bff";
            } else {
                ctx.fillStyle = "#ff0000";
            }
            ctx.fillRect((21 * i) + 1, (21 * j) + 1, 20, 20);
        }
    }
}

$(myCanvas).click(function (jqEvent) {
    var coords = {
        x: jqEvent.pageX - $(myCanvas).offset().left,
        y: jqEvent.pageY - $(myCanvas).offset().top
    };
    flip(Math.floor(coords.x / 21), Math.floor(Math.floor(coords.y) / 21))
    drawGrid()
});

let flip = function (x, y) {
    if (grid[x][y] === 0) {
        grid[x][y] = 1;
    } else if (grid[x][y] === 1) {
        grid[x][y] = 0;
    }
}

let computeNbSurroundingAlive = function (x, y) {
    let nbSurroundingAlive;
    if (x === 0 && y === 0) {
        nbSurroundingAlive = grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 1][y];
    } else if (x === 24 && y === 24) {
        nbSurroundingAlive = grid[x][y - 1] + grid[x - 1][y - 1] + grid[x - 1][y];
    } else if (x === 0 && y === 24) {
        nbSurroundingAlive = grid[x][y - 1] + grid[x + 1][y - 1] + grid[x + 1][y];
    } else if (x === 24 && y === 0) {
        nbSurroundingAlive = grid[x - 1][y] + grid[x - 1][y + 1] + grid[x][y + 1];
    } else if (x === 0) {
        nbSurroundingAlive = grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 1][y] + grid[x + 1][y - 1] + grid[x][y - 1];
    } else if (x === 24) {
        nbSurroundingAlive = grid[x][y + 1] + grid[x][y - 1] + grid[x - 1][y - 1] + grid[x - 1][y] + grid[x - 1][y + 1];
    } else if (y === 0) {
        nbSurroundingAlive = grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 1][y] + grid[x - 1][y] + grid[x - 1][y + 1];
    } else if (y === 24) {
        nbSurroundingAlive = grid[x + 1][y] + grid[x + 1][y - 1] + grid[x][y - 1] + grid[x - 1][y - 1] + grid[x - 1][y];
    } else {
        nbSurroundingAlive = grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 1][y] + grid[x + 1][y - 1] + grid[x][y - 1] + grid[x - 1][y - 1] + grid[x - 1][y] + grid[x - 1][y + 1];
    }
    return nbSurroundingAlive
}

let nextStep = function () {
    let newGrid = [];
    for (let i = 0; i < 25; i++) {
        newGrid.push([]);
        for (let j = 0; j < 25; j++) {
            if (grid[i][j] === 0) {
                if (computeNbSurroundingAlive(i, j) === 3) {
                    newGrid[i].push(1)
                } else {
                    newGrid[i].push(0)
                }
            } else if (grid[i][j] === 1) {
                if (computeNbSurroundingAlive(i, j) === 2 || computeNbSurroundingAlive(i, j) === 3) {
                    newGrid[i].push(1)
                } else {
                    newGrid[i].push(0)
                }
            }
        }
    }
    grid = newGrid;
    drawGrid();
}

let tryNextStep = function () {
    if (document.getElementById("auto").checked) {
        nextStep();
    }
}

setInterval(tryNextStep, 500);
startGame();

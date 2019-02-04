/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let count = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    count = 0;
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    var isWinner = checkWinner(1);
    if(isWinner) announceWinner("Congrats! You won."); 
    count++;
    if(count < 9) computer();
    else if(!isWinner) announceWinner("It is a draw!");
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function computer() {
    var x, y, isWinner;
    while(1) {
        x = Math.floor((Math.random() * 3));
        y = Math.floor((Math.random() * 3));
        if(grid[x][y] == 0) {
            grid[x][y] = 2;
            renderMainGrid();
            addClickHandlers();
            isWinner = checkWinner(2);
            if(isWinner) announceWinner("Oops! You Lost."); 
            count++;
            break;
        }
    }
}

function announceWinner(message) {
    var div = document.getElementById('announcement');
    div.style.visibility = 'visible';
    var text = document.getElementById('resultText');
    text.innerHTML += message;
    setTimeout(function() {
        location.reload();
    }, 1500);
}

function checkWinner(value) {
    var i, j, k;
    for(i = 0; i < 3; i++) {
        if((grid[i][0] === value && grid[i][1] === value && grid[i][2] === value) || 
            (grid[0][i] === value && grid[1][i] === value && grid[2][i] === value)) {
            return true;
        }
    }

    if((grid[0][0] === value && grid[1][1] === value && grid[2][2] === value) || 
        (grid[2][0] === value && grid[1][1] === value && grid[0][2] === value)) {
        return true;
    } 
    return false;
}


function reset() {
    location.reload();
}


initializeGrid();
renderMainGrid();
addClickHandlers();

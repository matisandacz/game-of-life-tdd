var {Cell, cellState} = require('./Cell.js');

var gameOfLifeExceptions = 
{ 	'gridDimensionsShouldBePositiveErrorDescriptionMessage': 'Grid dimensions should be positive',
	'gridElementsShouldBeOfTypeCellErroDescriptionMessage' : 'Grid elements should be of type Cell',
	'gridRowsShouldBeOfSameLengthErrorDescriptionMessage' : 'Grid rows should be of same length',
	'gridShouldNotBeEmptyErrorDescriptionMessage' : 'Grid should not be empty',
	'gridShouldBeSquareErrorDescriptionMessage' : 'Grid should be square'
};

class GameOfLife{

    constructor(grid){
		this.assertValidGrid(grid);
        this.grid = grid;
		this.numberOfRows = grid.length;
		this.numberOfColumns = grid[0].length;
    }

	assertValidGrid(grid){
    	this.assertGridIsNotEmpty(grid);
		this.assertGridContainsCellStates(grid);
        this.assertGridRowsHaveSameLength(grid);
        this.assertGridIsSquare(grid);
    }

	assertGridIsNotEmpty(grid){
    	if(grid.length == 0 || grid[0].length == 0){
    		throw gameOfLifeExceptions.gridShouldNotBeEmptyErrorDescriptionMessage;
    	}
    }

	assertGridContainsCellStates(grid) {
		grid.map((row) => {
			row.map((aCellState) => {
				new Cell(cellState.ALIVE).assertValidState(aCellState);
			});
		});
	}

    assertGridRowsHaveSameLength(grid){
    	let expectedRowLength = grid[0].length;

		grid.map((row) => {
			if(row.length != expectedRowLength){
				throw gameOfLifeExceptions.gridRowsShouldBeOfSameLengthErrorDescriptionMessage;
			}
		})
	}


    assertGridIsSquare(grid){
    	if(grid.length != grid[0].length){
    		throw gameOfLifeExceptions.gridShouldBeSquareErrorDescriptionMessage;
    	}
    }

    neighboursAt(targetRow, targetCol){
    
    	let aliveNeighbours = 0;

    	for(let rowIndex = targetRow-1; rowIndex <= targetRow+1; rowIndex++){
    		for(let colIndex = targetCol-1; colIndex <= targetCol+1; colIndex++){
    			if(this.IsValidPosition(rowIndex,colIndex) && this.positionsAreDifferent(rowIndex,colIndex,targetRow,targetCol)){
    				aliveNeighbours += this.grid[rowIndex][colIndex]
    			}
    		}
    	}

    	return aliveNeighbours;
    }

	IsValidPosition(rowIndex, colIndex){
    	return rowIndex >= 0 && colIndex >=0 && rowIndex < this.numberOfRows && colIndex < this.numberOfColumns
    }

    positionsAreDifferent(rowIndex, colIndex, targetRow, targetCol){
    	return (rowIndex != targetRow || colIndex != targetCol);
    }

    stateAt(row, col){
    	return this.grid[row][col];
    }

	tick(){
	
		return this.grid.map((row, rowIndex) => {
			return row.map((cellState, colIndex) => {
				let numberOfNeighbours = this.neighboursAt(rowIndex,colIndex);
				let cell = new Cell(cellState);
				return cell.nextStateWhenNeighbours(numberOfNeighbours);
			})
		})
    }
	
};

module.exports = {GameOfLife, gameOfLifeExceptions};
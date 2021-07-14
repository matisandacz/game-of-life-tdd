var {GameOfLife, gameOfLifeExceptions} = require('../GameOfLife.js');
var {Cell, cellState, cellExceptions} = require('../Cell.js');

test('Grid should contain at least one row', () => {

	let grid = [];

	expect( () => {
		new GameOfLife(grid)
	}).toThrow(gameOfLifeExceptions.gridShouldNotBeEmptyErrorDescriptionMessage);
})

test('Grid should contain at least one column', () => {

	let grid = [[]];

	expect( () => {
		new GameOfLife(grid)
	}).toThrow(gameOfLifeExceptions.gridShouldNotBeEmptyErrorDescriptionMessage);
})


test('Grid elements should be Cell States', () => {

	let grid = [[cellState.ALIVE, cellState.ALIVE], [cellState.DEAD, 5]]

	expect( () => {
		new GameOfLife(grid)
	}).toThrow(cellExceptions.invalidCellStateErrorDescriptionMessage)
})

test('All rows should be of equal length', () => {

	let grid = [[cellState.ALIVE, cellState.ALIVE], [cellState.DEAD]]

	expect( () => {
		new GameOfLife(grid)
	}).toThrow(gameOfLifeExceptions.gridRowsShouldBeOfSameLengthErrorDescriptionMessage);
})


test('Grid should be square', () => {

	let grid = [[cellState.ALIVE], [cellState.DEAD]]

	expect( () => {
		new GameOfLife(grid)
	}).toThrow(gameOfLifeExceptions.gridShouldBeSquareErrorDescriptionMessage);
})


test('Calculates neighbours for cell in the middle of grid', () => {

				/*	
				| CELL 0| CELL 1| CELL 0|
				| CELL 1| CELL 1| CELL 1|
				| CELL 0| CELL 1| CELL 0|
				*/

	let firstRow = [cellState.DEAD, cellState.ALIVE, cellState.DEAD];
	let secondRow = [cellState.ALIVE, cellState.ALIVE, cellState.ALIVE];
	let thirdRow = [cellState.DEAD, cellState.ALIVE, cellState.DEAD];

	let grid = [firstRow, secondRow, thirdRow];

	let game = new GameOfLife(grid);

	expect(
		game.neighboursAt(1,1)
	).toEqual(4)
})


test('Calculates neighbours for cell not in the middle of grid', () => {

				/*	
				| CELL 0| CELL 0| CELL 0| CELL 0 |
				| CELL 0| CELL 1| CELL 0| CELL 0 |
				| CELL 0| CELL 0| CELL 1| CELL 1 |
				| CELL 0| CELL 0| CELL 1| CELL 0 |	
				*/
				

	let firstRow = [cellState.DEAD, cellState.DEAD, cellState.DEAD, cellState.DEAD];
	let secondRow = [cellState.DEAD, cellState.ALIVE, cellState.DEAD, cellState.DEAD];
	let thirdRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.ALIVE];
	let fourthRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.DEAD];

	let grid = [firstRow, secondRow, thirdRow, fourthRow];

	let game = new GameOfLife(grid);

	expect(
		game.neighboursAt(3,3)
	).toEqual(3)

})


test('Game tick updates all states', () => {

				
			/*  | CELL 0| CELL 1| CELL 0| CELL 0 |
				| CELL 1| CELL 1| CELL 0| CELL 1 |
				| CELL 0| CELL 0| CELL 1| CELL 1 |
				| CELL 0| CELL 0| CELL 1| CELL 1 
			*/	
			

	let firstRow = [cellState.DEAD, cellState.ALIVE, cellState.DEAD, cellState.DEAD];
	let secondRow = [cellState.ALIVE, cellState.ALIVE, cellState.DEAD, cellState.ALIVE];
	let thirdRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.ALIVE];
	let fourthRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.ALIVE];

	let grid = [firstRow, secondRow, thirdRow, fourthRow];

	let game = new GameOfLife(grid);

	let gameAfterTick = new GameOfLife(game.tick());

	expect(
		gameAfterTick.stateAt(0,0)
	).toEqual(cellState.ALIVE)

	expect(
		gameAfterTick.stateAt(0,1)
	).toEqual(cellState.ALIVE)

	expect(
		gameAfterTick.stateAt(0,2)
	).toEqual(cellState.ALIVE)

	expect(
		gameAfterTick.stateAt(2,3)
	).toEqual(cellState.DEAD)

})

test('Game tick does not modify game grid', () => {

				
		/*  | CELL 0| CELL 1| CELL 0| CELL 0 |
			| CELL 1| CELL 1| CELL 0| CELL 1 |
			| CELL 0| CELL 0| CELL 1| CELL 1 |
			| CELL 0| CELL 0| CELL 1| CELL 1 
		*/	
		

	let firstRow = [cellState.DEAD, cellState.ALIVE, cellState.DEAD, cellState.DEAD];
	let secondRow = [cellState.ALIVE, cellState.ALIVE, cellState.DEAD, cellState.ALIVE];
	let thirdRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.ALIVE];
	let fourthRow = [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.ALIVE];

	let grid = [firstRow, secondRow, thirdRow, fourthRow];

	let game = new GameOfLife(grid);

	game.tick();

	expect(
		game.stateAt(0,0)
	).toEqual(cellState.DEAD)

	expect(
		game.stateAt(0,1)
	).toEqual(cellState.ALIVE)

	expect(
		game.stateAt(0,2)
	).toEqual(cellState.DEAD)

	expect(
		game.stateAt(2,3)
	).toEqual(cellState.ALIVE)

})

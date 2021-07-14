var {Cell, cellState, cellExceptions} = require('../Cell.js');

test('Cell should be alive if initialized as alive', () => {

    var aliveCell = new Cell(cellState.ALIVE);

    expect(
        aliveCell.state
    ).toBe(cellState.ALIVE);

})

test('Alive cell with two neighbours should survive', () => {
    const NUMBER_OF_NEIGHBOURS = 2;
    var aliveCell = new Cell(cellState.ALIVE);

    expect(
        aliveCell.nextStateWhenNeighbours(NUMBER_OF_NEIGHBOURS)
    ).toBe(cellState.ALIVE);
})

test('Dead cell with two neighbours should remain dead', () => {
    const NUMBER_OF_NEIGHBOURS = 2;
    var deadCell = new Cell(cellState.DEAD);

    expect(
        deadCell.nextStateWhenNeighbours(NUMBER_OF_NEIGHBOURS)
    ).toBe(cellState.DEAD);
})


test('Cell with more than three neighbours should die', () => {
    const NUMBER_OF_NEIGHBOURS = 4;
    var aliveCell = new Cell(cellState.ALIVE);

    expect(
        aliveCell.nextStateWhenNeighbours(NUMBER_OF_NEIGHBOURS)
    ).toBe(cellState.DEAD);
})

test('Alive cell with three neighbours should survive', () => {
    const NUMBER_OF_NEIGHBOURS = 3;
    var aliveCell = new Cell(cellState.ALIVE);

    expect(
        aliveCell.nextStateWhenNeighbours(NUMBER_OF_NEIGHBOURS)
    ).toBe(cellState.ALIVE);
})

test('Dead cell with three neighbours becomes a live cell', () => {
    const NUMBER_OF_NEIGHBOURS = 3;
    var deadCell = new Cell(cellState.DEAD);

    expect(
        deadCell.nextStateWhenNeighbours(NUMBER_OF_NEIGHBOURS)
    ).toBe(cellState.ALIVE);
})

test('Can not initialize Cell with invalid state', () => {

    const anInvalidState = 3;

    expect( () => {
        new Cell(anInvalidState);
     }).toThrow(cellExceptions.invalidCellStateErrorDescriptionMessage);
})

test('Can not set invalid state', () => {

    const anInvalidState = 3;
    let cell = new Cell(cellState.ALIVE);

    expect( () => {
        cell.setState(anInvalidState);
     }).toThrow(cellExceptions.invalidCellStateErrorDescriptionMessage);
})
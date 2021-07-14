const cellState = {DEAD:0, ALIVE:1}

const cellExceptions = 
{ 	'invalidCellStateErrorDescriptionMessage': 'Invalid cell state'};

class Cell{

    constructor(aCellState){
        this.assertValidState(aCellState);
        this.state = aCellState;
    }

    getState(){
        return this.state;
    }

    setState(aNewState){
        this.assertValidState(aNewState);
        this.state = aNewState;
    }

    assertValidState(aState) {
        if (!Object.values(cellState).includes(aState)) {
            throw cellExceptions.invalidCellStateErrorDescriptionMessage;
        }
    }

    nextStateWhenNeighbours(aNumberOfNeighbours){
    	switch(aNumberOfNeighbours){
    		case 2:
    				return this.state;
    		case 3:
    				return cellState.ALIVE;
    		default:
    				return cellState.DEAD;
    	}
    }
};

module.exports = {Cell, cellState, cellExceptions};
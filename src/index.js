import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {Cell, cellState} from './Cell.js';
import {GameOfLife} from './GameOfLife.js';
import './index.css';

function Square(props){

  return (

      <button 
        className="square" 
        style= {{background: props.background}}
        onClick = {() => {props.onClick()}}>
      </button> 

    );
}

class Board extends React.Component {

  constructor(props){
    super(props);
    let grid = new Array(10).fill(cellState.DEAD).map(() => new Array(10).fill(cellState.DEAD));
    this.state = {
      grid : grid,
    };
  }

  drawCell(rowIndex, colIndex){
    let newGrid = this.state.grid.slice();
    newGrid[rowIndex][colIndex] = (1 - newGrid[rowIndex][colIndex]);
    this.setState({grid:newGrid});
  }

  renderSquare(rowIndex, colIndex) {
    return <Square background={ (this.state.grid[rowIndex][colIndex] == cellState.ALIVE ? 'black' : 'white') }
                   onClick = { () => this.drawCell(rowIndex, colIndex) }/>;
  }

  nextState(){
    let game = new GameOfLife(this.state.grid)
    let newGrid = game.tick();
    this.setState({grid: newGrid});
  }

  restart(){
    let emptyGrid = new Array(10).fill(cellState.DEAD).map(() => new Array(10).fill(cellState.DEAD));
    this.setState({grid:emptyGrid});
  }

  render() {

    return (
      <div> 
        <h1> Conway's Game Of Life </h1>
        
        {
          this.state.grid.map( (row, rowNumber) => {
            return (
            <div className="board-row">
              {
                row.map( (cell, colNumber) => {
                  return this.renderSquare(rowNumber,colNumber)
                })
              }
            </div>
            )
          })
        }

        <div className = "buttons">
          <Button onClick = {() => this.nextState()}> Next State </Button>
          <Button onClick = {() => this.restart()}> Restart </Button>
        </div>
      </div>

    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

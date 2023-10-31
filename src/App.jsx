import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from './components/winning-combinations';
import { GameOver } from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const FirstSquareSymbol = gameBoard[a.row][a.column];
    const SecondSquareSymbol = gameBoard[b.row][b.column];
    const ThirdSquareSymbol = gameBoard[c.row][c.column];

    if (FirstSquareSymbol && FirstSquareSymbol === SecondSquareSymbol && FirstSquareSymbol === ThirdSquareSymbol) {
      winner = FirstSquareSymbol;
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        {/* players */}
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart}/>}
        {/* game */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      {/* logs */}
      <Logs board={gameTurns} />
    </main>
  );
}

export default App;

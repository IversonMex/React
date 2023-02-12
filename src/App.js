/* Libreria especial para que las casillas "recuerden" que hayan sido clickeadas */
import { useState } from 'react';

/* Se define la funcion que imprimira en pantalla los cuadros del tablero
   con un accesorio para saber si cada recuadro tendra una X o O o estara vacio
   entre corchetes para renderizar la variable JS*/
function Square({ value, onSquareClick }) {
  return (
    /* Boton que se imprimira en el tablero con una funcion para detectar
       cuando se hace click sobre el */
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/* Funcion que dibuja el tablero de juego */
function Board({ xIsNext, squares, onPlay }) {
  /* Función donde se define en que orden apareceran las X y O empezando con las X y despues las O */
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /* Condicion que comprueba que un cuadro ya este clickeado  */
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  /* Se define al ganador verificando si hay mas turnos y al ganador si es X o O o no hay ninguno segun corresponda */
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  /* agrupando los cuadros en filas de 3 y dandole valor a cada uno de los cuadros del tablero, conectando la funcion de valor 
  a cada uno para saber si el cuadro es nulo o es X o O*/
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/* Se define una función accesible desde los otros archivos con el nombre "Game" y el valor que tendran los cuadrados del tablero*/
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  /* guarda en una variable el estado del tablero que esta viendo el usuario */
  const [currentMove, setCurrentMove] = useState(0);
  /* le da funcion a los botones que muestran los pasos anteriores o reinician el juego */
  const xIsNext = currentMove % 2 === 0;
  /* muestra en pantalla el movimiento actual seleccionado */
  const currentSquares = history[currentMove];

  /* funcion para seguir el juego a partir de algun punto anterior que el usuario quiera repetir */
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  /* funcion para mostrar una lista de movimientos pasados */
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
/* Matriz que se usa en la funcion para determinar al ganador */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

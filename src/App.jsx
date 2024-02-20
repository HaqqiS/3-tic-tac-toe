import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Square({ value, onSquareClick }) { //component untuk membuat kotak pada game tictactoe menggunakan button
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) { //component untuk membungkus 9 kotak dan mengambil nilai xIsNext, squares, dan onPlay
  function handleClick(i) { //fungsi untuk menghandle klik
    if (squares[i] || calculateWinner(squares)) return; //jika kotak sudah terisi atau ada pemenang maka tidak bisa diklik
    const nextSquares = squares.slice(); //membuat salinan array
    /*************************
     *    IF (XISNEXT) {     *
     * NEXTSQUARES[I] = 'X'; *
     *       } ELSE {        *
     * NEXTSQUARES[I] = 'O'; *
     *           }           *
     *************************/
    nextSquares[i] = xIsNext ? "X" : "O"; //mengisi kotak sesuai dengan xIsNext atau giliran, menggunakan ternary operator

    onPlay(nextSquares); //memanggil fungsi onPlay
  }

  const winner = calculateWinner(squares); //variable untuk menampung hasil fungsi calculateWinner
  let status = ""; //variable untuk menampung status permainan
  if (winner) {
    status = "Winner: " + winner; 
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); //menentukan giliran
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //array untuk menampung history/langkah
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; //menentukan giliran X/O dengan modulus currentMove
  const currentSquares = history[currentMove]; //untuk menyimpan status papan permainan saat ini berdasarkan langkah yang sedang berlangsung

  function jumpTo(nextMove) { //fungsi untuk mengganti langkah dengan mengambil nilai move
    setCurrentMove(nextMove); 
  }

  function handlePlay(nextSquares) { //memperbarui history permainan dengan menambahkan langkah baru ke array history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => { //hasil dari pemetaan array history yang menghasilkan daftar langkah-langkah permainan.
    let description = "";
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

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

function calculateWinner(squares) { //fungsi untuk menentukan pemenang 
  const lines = [ //ketentuan untuk menentukan memenang permainan
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) { //perulangan sesuai dengan jumlah ketentuan
    /*******************************
     * CONST A = LINES[I][0]; // 0 *
     * CONST B = LINES[I][1]; // 1 *
     * CONST C = LINES[I][2]; // 2 *
     *******************************/
    const [a, b, c] = lines[i];
    //State: ["X", "X", "X", "O", "O", null, null, null, null];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) //algoritma untuk menentukan pemenang
      return squares[a]; //mengembalikan nilai pemenang
  }
  return false; //mengembalikan nilai false
}

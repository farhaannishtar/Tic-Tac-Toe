import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Board from '../components/Board.js';
import determineWinner from '../determineWinner';


export default function Home() {

  const [OWins, setOwins] = useState(0);
  const [XWins, setXwins] = useState(0);
  const [XTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState('');
  
  const [boardValues, setBoardValues] = useState(['-', '-', '-', 
                                                  '-', '-', '-',
                                                  '-', '-', '-',]);

  const resetBoard = () => {
    setBoardValues(['-', '-', '-', '-', '-', '-','-', '-', '-',])
  }

  const handleSquareClick = (position) => {
    console.log(`${position} I've been clicked`);

    
    let cloneBoardValues = [...boardValues];
    if (cloneBoardValues[position] !== '-') {
      return;
    }
    else if (XTurn) {
      cloneBoardValues[position] = 'X';
      setXTurn(false) 
    } else {
      cloneBoardValues[position] = 'O';
      setXTurn(true) 
    }
    setBoardValues(cloneBoardValues);
    let winner = determineWinner(cloneBoardValues);
    if (winner === 'X' && winner !== '-') {
      setXwins(XWins + 1);
      resetBoard();
    } else if (winner === 'O' && winner !== '-') {
      setOwins(OWins + 1);
      resetBoard();
    }
    setWinner(winner);
  }

  function computerMode() {
    resetBoard();
    setOwins(0);
    setXwins(0);
    setWinner('');
  }

  return (
    <div className={styles.container}>  
      <h2>Tic-Tac-Tito</h2>
        <div className={styles.container2}>
          <Board boardValues={boardValues} handleSquareClick={handleSquareClick}/>
          <div className={styles.scoreboard}>
            <h3>O wins: {OWins} X wins: {XWins}</h3>
            <h3>The Winner: {winner}</h3>
          </div>
        </div>
      <button className={styles.button} onClick={computerMode}>Play Against Computer</button>
    </div>
  )
}

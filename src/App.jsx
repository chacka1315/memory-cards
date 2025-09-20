import { useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import CardsContainer from './components/CardsContainer';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRestart = () => {
    setClickedIds([]);
    setIsGameOver(false);
  };

  return (
    <div className="gameLayout">
      <DashBoard
        score={clickedIds.length}
        bestScore={bestScore}
        isGameOver={isGameOver}
        restart={handleRestart}
      />
      <GameMsg isGameOver={isGameOver} score={clickedIds.length} />
      <CardsContainer
        updateClickedIds={setClickedIds}
        clickedIds={clickedIds}
        updateBestScore={setBestScore}
        bestScore={bestScore}
        isGameOver={isGameOver}
        updateIsGameOver={() => setIsGameOver(true)}
      />
    </div>
  );
}
function GameMsg({ isGameOver, score }) {
  return (
    <div
      className={isGameOver ? 'gameOverMsg showMsg ' : ' gameOverMsg hideMsg'}
    >
      <p>Game Over...</p>
      <p>Score : {score}</p>
    </div>
  );
}
export default App;

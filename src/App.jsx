import { useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import CardsContainer from './components/CardsContainer';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <>
      <DashBoard
        score={clickedIds.length}
        bestScore={bestScore}
        restart={() => setIsGameOver(false)}
      />
      <GameMsg isGameOver={isGameOver} />
      <CardsContainer
        updateClickedIds={setClickedIds}
        clickedIds={clickedIds}
        updateBestScore={setBestScore}
        bestScore={bestScore}
        isGameOver={isGameOver}
        updateIsGameOver={() => setIsGameOver(true)}
      />
    </>
  );
}
function GameMsg({ isGameOver }) {
  return (
    <div
      className={isGameOver ? 'gameOverMsg hideMsg' : ' gameOverMsg showMsg'}
    >
      Game Over...
    </div>
  );
}
export default App;

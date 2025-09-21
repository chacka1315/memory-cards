import { useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import CardsContainer from './components/CardsContainer';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [onShowHelp, setOneShowHelp] = useState(false);

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
        toggleShowHelp={() => setOneShowHelp(!onShowHelp)}
      />
      <GameMsg isGameOver={isGameOver} score={clickedIds.length} />
      <HelpMsg onShowHelp={onShowHelp} />
      <CardsContainer
        updateClickedIds={setClickedIds}
        clickedIds={clickedIds}
        updateBestScore={setBestScore}
        bestScore={bestScore}
        isGameOver={isGameOver}
        onShowHelp={onShowHelp}
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

function HelpMsg({ onShowHelp }) {
  return (
    <div className={onShowHelp ? 'help-msg showMsg' : 'help-msg hideMsg'}>
      <h2>Welcome to Pockecard</h2>
      <h3>Memory Card Challenge</h3>
      <hr />
      <p>
        Test your memory and focus in this fun card game! All cards are revealed
        — your goal is to remember which ones you’ve already clicked.
        <br />
        Click on a card to score. After each click, the board shuffles. Don’t
        click the same card twice, or the game is over. How long can you keep
        your streak alive?
      </p>
    </div>
  );
}
export default App;

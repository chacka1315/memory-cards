import { useState, useMemo, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import CardsContainer from './components/CardsContainer';
import closeButton from './assets/close-button.svg';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [inShowHelp, setInShowHelp] = useState(false);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [cardCount, setCardCount] = useState(10);
  const [cardSize, setCardSize] = useState(100);
  const gameSound = useMemo(() => new Audio('/game-sound.mp3'), []);
  gameSound.loop = true;

  useEffect(() => {
    if (!canPlaySound) return;
    gameSound.play();

    return () => gameSound.pause();
  }, [canPlaySound, gameSound]);

  const handleRestart = () => {
    setClickedIds([]);
    setIsGameOver(false);
  };
  const isWin = clickedIds.length === cardCount;
  return (
    <div className={isGameOver ? 'gameLayout fixeBoard' : 'gameLayout'}>
      <DashBoard
        score={clickedIds.length}
        bestScore={bestScore}
        isGameOver={isGameOver}
        isWin={isWin}
        restart={handleRestart}
        canPlaySound={canPlaySound}
        toggleShowHelp={() => setInShowHelp(!inShowHelp)}
        togglePlaySound={() => setCanPlaySound(!canPlaySound)}
        updateCardCount={setCardCount}
        cardCount={cardCount}
        updateCardSize={setCardSize}
        cardSize={cardSize}
      />
      <GameOverMsg isGameOver={isGameOver} score={clickedIds.length} />
      <WinMsg score={clickedIds.length} isWin={isWin} cardCount={cardCount} />
      <HelpMsg
        inShowHelp={inShowHelp}
        toggleShowHelp={() => setInShowHelp(!inShowHelp)}
      />
      <CardsContainer
        updateClickedIds={setClickedIds}
        clickedIds={clickedIds}
        updateBestScore={setBestScore}
        bestScore={bestScore}
        isGameOver={isGameOver}
        isWin={isWin}
        inShowHelp={inShowHelp}
        updateIsGameOver={() => setIsGameOver(true)}
        canPlaySound={canPlaySound}
        cardCount={cardCount}
        cardSize={cardSize}
      />
    </div>
  );
}
function GameOverMsg({ isGameOver, score }) {
  return (
    <div
      className={isGameOver ? 'gameOverMsg showMsg ' : ' gameOverMsg hideMsg'}
    >
      <p>Game Over...</p>
      <p>Score : {score}</p>
    </div>
  );
}

function HelpMsg({ inShowHelp, toggleShowHelp }) {
  return (
    <div className={inShowHelp ? 'help-msg showMsg' : 'help-msg hideMsg'}>
      <button type="button" className="help-close-btn" onClick={toggleShowHelp}>
        <img src={closeButton} alt="Close button" />
      </button>
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

function WinMsg({ isWin, score, cardCount }) {
  return (
    <div className={isWin ? 'gameWinMsg showMsg ' : ' gameWinMsg hideMsg'}>
      <p>Perfect...</p>
      <p>
        Score : {score}/{cardCount}
      </p>
    </div>
  );
}
export default App;

import { useMemo, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard.tsx';
import CardsContainer from './components/CardsContainer.tsx';
import closeButton from './assets/close-button.svg';
import useStore from './store/store.ts';
import { useShallow } from 'zustand/react/shallow';

function App() {
  const { canPlaySound, isGameOver } = useStore(
    useShallow((s) => ({
      isGameOver: s.isGameOver,
      canPlaySound: s.canPlaySound,
    }))
  );

  const gameSound = useMemo(() => new Audio('/game-sound.mp3'), []);
  gameSound.loop = true;

  useEffect(() => {
    if (!canPlaySound) return;
    gameSound.play();

    return () => gameSound.pause();
  }, [canPlaySound, gameSound]);

  return (
    <div className={isGameOver ? 'gameLayout fixeBoard' : 'gameLayout'}>
      <DashBoard />
      <GameOverMsg />
      <WinMsg />
      <HelpMsg />
      <CardsContainer />
    </div>
  );
}

function GameOverMsg() {
  const isGameOver = useStore((s) => s.isGameOver);
  const score = useStore((s) => s.clickedIds.length);

  return (
    <div
      className={isGameOver ? 'gameOverMsg showMsg ' : ' gameOverMsg hideMsg'}
    >
      <p>Game Over...</p>
      <p>Score : {score}</p>
    </div>
  );
}

function HelpMsg() {
  const inShowHelp = useStore((s) => s.inShowHelp);
  const toggleHelp = useStore((s) => s.toggleHelp);
  return (
    <div className={inShowHelp ? 'help-msg showMsg' : 'help-msg hideMsg'}>
      <button type="button" className="help-close-btn" onClick={toggleHelp}>
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

function WinMsg() {
  const score = useStore((s) => s.clickedIds.length);
  const isWin = useStore((s) => s.cardCount === s.clickedIds.length);
  const cardCount = useStore((s) => s.cardCount);
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

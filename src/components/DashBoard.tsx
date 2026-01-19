import React, { useState, type ChangeEvent } from 'react';
import '../styles/dashBoard.css';
import useStore from '../store/store';
import { useShallow } from 'zustand/react/shallow';

export default function DashBoard() {
  const state = useStore(
    useShallow((s) => ({
      isGameOver: s.isGameOver,
      canPlaySound: s.canPlaySound,
      bestScore: s.bestScore,
      toggleHelp: s.toggleHelp,
      toggleSound: s.toggleSound,
      cardCount: s.cardCount,
      cardSize: s.cardSize,
      restart: s.restart,
      setCardCount: s.setCardCount,
      setCardSize: s.setCardSize,
      clickedIds: s.clickedIds,
      setMenuIsOpen: s.setMenuIsOpen,
      menuIsOpen: s.menuIsOpen,
    }))
  );

  const [countInputValue, setCountInputValue] = useState<number | string>(
    state.cardCount
  );

  const [sizeInputValue, setSizeInputValue] = useState<number | string>(
    state.cardSize
  );

  const handleCardCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCountInputValue(e.target.value);
    const count = Number(e.target.value);
    const isNumber = typeof count === 'number';
    if (count >= 4 && count <= 100 && isNumber) {
      state.setCardCount(count);
    }
  };

  const handleCardSize = (e: ChangeEvent<HTMLInputElement>) => {
    setSizeInputValue(e.target.value);
    const size = Number(e.target.value);
    const isNumber = typeof size === 'number';
    if (size >= 50 && size <= 500 && isNumber) {
      state.setCardSize(size);
    }
  };

  const toggleMenu = () => state.setMenuIsOpen(!state.menuIsOpen);
  const isWin = state.clickedIds.length === state.cardCount;
  return (
    <header className="dashBoard">
      <button type="button" className="menuBtn" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>menu</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>

      <div className="gameParam">
        <label>
          Cards count
          <input
            type="number"
            min="4"
            max="30"
            value={countInputValue}
            onChange={handleCardCount}
            disabled={state.isGameOver || isWin}
          />
        </label>
        <label>
          Cards size
          <input
            type="number"
            min="50"
            max="500"
            value={sizeInputValue}
            onChange={handleCardSize}
            disabled={state.isGameOver || isWin}
          />
        </label>
      </div>

      <div id="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50}>
          <title>Logo</title>
          <path d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
        </svg>
        <h1>Pokecard</h1>
      </div>

      <button
        className="restart"
        type="button"
        onClick={state.restart}
        disabled={!state.isGameOver && !isWin}
      >
        Restart
      </button>
      <div className="scores">
        <p>Score : {state.clickedIds.length}</p>
        <p>Best score : {state.bestScore}</p>
      </div>

      <div className="helpNvolume">
        <button
          type="button"
          className="gameDetails"
          onClick={state.toggleHelp}
        >
          ?
        </button>
        <button
          type="button"
          className={state.canPlaySound ? 'volumeBtn loud' : 'volumeBtn mute'}
          onClick={state.toggleSound}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>volume</title>
            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
          </svg>
        </button>
      </div>

      <Menu className={state.menuIsOpen ? 'showMenu menu' : 'hideMenu'}>
        <div>
          <label htmlFor="cardCount">Cards count </label>
          <input
            id="cardCount"
            type="number"
            min="4"
            max="30"
            value={countInputValue}
            onChange={handleCardCount}
            disabled={state.isGameOver || isWin}
          />
        </div>
        <div>
          <label htmlFor="cardSize">Cards size </label>
          <input
            id="cardSize"
            type="number"
            min="50"
            max="500"
            value={sizeInputValue}
            onChange={handleCardSize}
            disabled={state.isGameOver || isWin}
          />
        </div>
        <div className="helpNvolume">
          <button
            type="button"
            className="gameDetails"
            onClick={state.toggleHelp}
          >
            ?
          </button>
          <button
            type="button"
            className={state.canPlaySound ? 'volumeBtn loud' : 'volumeBtn mute'}
            onClick={state.toggleSound}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>volume</title>
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
          </button>
        </div>
      </Menu>
    </header>
  );
}

function Menu({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <div className={className}>{children}</div>;
}

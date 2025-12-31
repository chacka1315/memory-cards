import type React from 'react';

export type CardContainerProps = {
  updateClickedIds: React.Dispatch<React.SetStateAction<number[]>>;
  clickedIds: number[];
  updateBestScore: React.Dispatch<React.SetStateAction<number>>;
  bestScore: number;
  isGameOver: boolean;
  isWin: boolean;
  inShowHelp: boolean;
  updateIsGameOver: () => void;
  canPlaySound: boolean;
  cardCount: number;
  cardSize: number;
};

export type CardProps = {
  src: string;
  name: string;
  onClick: () => void;
  cardSize: number;
};

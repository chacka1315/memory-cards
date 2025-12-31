import type React from 'react';

export type DashboardProps = {
  score: number;
  restart: () => void;
  toggleShowHelp: () => void;
  togglePlaySound: () => void;
  updateCardCount: React.Dispatch<React.SetStateAction<number>>;
  updateCardSize: React.Dispatch<React.SetStateAction<number>>;
  bestScore: number;
  isGameOver: boolean;
  isWin: boolean;
  canPlaySound: boolean;
  cardCount: number;
  cardSize: number;
};

import type { StateCreator } from 'zustand';
import type { CardData } from '../types/images-data';

export type ContainerSlice = {
  visibleCards: CardData[];
  setVisibleCards: (cards: CardData[]) => void;
};

export const createContainerSlice: StateCreator<ContainerSlice> = (set) => ({
  visibleCards: [],
  setVisibleCards: (cards) => set({ visibleCards: cards }),
});

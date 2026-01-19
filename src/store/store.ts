import { create } from 'zustand';
import type { DashboardSlice } from './dashboardSlice';
import type { ContainerSlice } from './containerSlice';
import { creatDashboardSlice } from './dashboardSlice';
import { createContainerSlice } from './containerSlice';

type State = {
  clickedIds: number[];
  bestScore: number;
  isGameOver: boolean;
  inShowHelp: boolean;
  canPlaySound: boolean;
  cardCount: number;
  cardSize: number;
};

type Action = {
  addClickedId: (id: number) => void;
  setBestScore: (score: number) => void;
  setGameOver: (value: boolean) => void;
  toggleSound: () => void;
  toggleHelp: () => void;
  setCardCount: (count: number) => void;
  setCardSize: (size: number) => void;
  restart: () => void;
};

type StateType = Action & State & DashboardSlice & ContainerSlice;

const initialState: State = {
  clickedIds: [],
  bestScore: 0,
  isGameOver: false,
  inShowHelp: false,
  canPlaySound: false,
  cardCount: 10,
  cardSize: 100,
};

const useStore = create<StateType>()((set, get, api) => ({
  ...initialState,
  ...creatDashboardSlice(set, get, api),
  ...createContainerSlice(set, get, api),
  addClickedId: (id) => {
    set((state) => ({ clickedIds: [...state.clickedIds, id] }));
  },
  setBestScore: (score) => set({ bestScore: score }),
  setGameOver: (value) => set({ isGameOver: value }),
  toggleSound: () => set((state) => ({ canPlaySound: !state.canPlaySound })),
  toggleHelp: () => set((state) => ({ inShowHelp: !state.inShowHelp })),
  setCardCount: (count) => set({ cardCount: count }),
  setCardSize: (size) => set({ cardSize: size }),
  restart: () => set({ clickedIds: [], isGameOver: false }),
}));

export default useStore;

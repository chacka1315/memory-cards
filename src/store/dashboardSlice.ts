import type { StateCreator } from 'zustand';

export type DashboardSlice = {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: boolean) => void;
};
export const creatDashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (value) => set({ menuIsOpen: value }),
});

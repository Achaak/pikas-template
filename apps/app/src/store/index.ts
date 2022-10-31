import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type BearState = {
  bears: number;
  increase: (by: number) => void;
};

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);

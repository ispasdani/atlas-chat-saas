import create from "zustand";

interface CreditStoreState {
  credits: number;
  setCredits: (credits: number) => void;
  addCredits: (credits: number) => void;
  subtractCredits: (credits: number) => void;
}

export const useCreditStore = create<CreditStoreState>((set) => ({
  credits: 0,
  setCredits: (credits) => set({ credits }),
  addCredits: (credits) =>
    set((state) => ({ credits: state.credits + credits })),
  subtractCredits: (credits) =>
    set((state) => ({ credits: state.credits - credits })),
}));

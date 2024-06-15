import { Payment } from "@/types/Payment";
import create from "zustand";

interface PaymentStore {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
}));

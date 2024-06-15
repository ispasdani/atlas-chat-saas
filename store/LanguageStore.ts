import {
  LanguagesSupported,
  LanguagesSupportedMap,
} from "@/types/LanguagesSupported";
import { create } from "zustand";

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: Object.keys(LanguagesSupportedMap) as LanguagesSupported[],
}));

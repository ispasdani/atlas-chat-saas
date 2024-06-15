"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { SpokeSpinner } from "../loadingSpinner/LoadingSpinner";
import Link from "next/link";
import { useLanguageStore } from "@/store/LanguageStore";
import {
  LanguagesSupported,
  LanguagesSupportedMap,
} from "@/types/LanguagesSupported";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function LanguageSelectBtn() {
  const [language, setLanguage, getLanguages] = useLanguageStore((state) => [
    state.language,
    state.setLanguage,
    state.getLanguages,
  ]);

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] h-[45px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguagesSupportedMap[language]}
              className=""
            />
          </SelectTrigger>
          <SelectContent>
            <>
              {getLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {LanguagesSupportedMap[language]}
                </SelectItem>
              ))}
            </>
          </SelectContent>
        </Select>
      </div>
    )
  );
}

export default LanguageSelectBtn;

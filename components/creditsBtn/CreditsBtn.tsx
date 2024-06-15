"use client";

import { useCreditStore } from "@/store/CreditStoreState";
import { Coins } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreditsBtn = () => {
  const credits = useCreditStore((state) => state.credits);

  return (
    <Link
      href={"/pricing"}
      prefetch={false}
      className="min-w-[50px] px-2 h-[45px] rounded-md bg-white hover:bg-gray-100 flex justify-center items-center border border-gray-200 mx-2 light-main-box-shadow"
    >
      <Coins />
      <p className="ml-3 text-lg">{credits}</p>
    </Link>
  );
};

export default CreditsBtn;

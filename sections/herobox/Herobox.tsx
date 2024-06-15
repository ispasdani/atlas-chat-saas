import BlurryShapes from "@/components/blurryShapes/BlurryShapes";
import NoCreditBanner from "@/components/noCreditBanner/NoCreditBanner";
import { usePaymentStore } from "@/store/PaymentStore";
import Link from "next/link";
import React from "react";

async function Herobox() {
  return (
    <div className="relative overflow-hidden w-full min-h-[90vh] flex flex-col justify-start items-center">
      <BlurryShapes />
      <NoCreditBanner />
      <section className="flex flex-col justify-start items-center z-10">
        <h1 className="text-8xl font-bold mt-10 flex flex-row flex-wrap items-center justify-center">
          ATLAS<span className="mx-2 gradient-text-main">.</span>
          <span className="gradient-text-main">chat</span>
        </h1>
        <h2 className="text-xl mt-4">is breaking down language barriers!</h2>
        <p className="mt-12 text-xl text-center z-10">
          Speak your native language freely with anyone.
        </p>
        <p className="mb-10 text-center z-10 text-xl mt-4">
          Let the{" "}
          <span className="border-b-[1px] gradient-text-main border-[#3f5efb]">
            AI handle the translation.
          </span>
        </p>
        <div className="w-full flex justify-center items-center mb-20 z-10">
          <Link
            href={"/chat"}
            className="h-10 px-5 bg-[#3F5EFB] text-white flex justify-center items-center rounded-lg mx-5 hover:main-gradient-bg transition-all ease-linear duration-300"
            prefetch={false}
          >
            Get started
          </Link>
          <Link
            href={"/pricing"}
            prefetch={false}
            className="h-10 px-5 border border-[#3F5EFB] text-[#3F5EFB] flex justify-center items-center rounded-lg mx-5 hover:main-gradient-bg hover:text-white hover:border-transparent transition-all ease-linear duration-300"
          >
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Herobox;

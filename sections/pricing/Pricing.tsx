import BlurryShapes from "@/components/blurryShapes/BlurryShapes";
import NoCreditBanner from "@/components/noCreditBanner/NoCreditBanner";
import PriceCard from "@/components/priceCard/PriceCard";
import { tiers } from "@/utils/Tiers";
import React from "react";

function Pricing() {
  return (
    <div className="relative overflow-hidden w-full min-h-[90vh] flex flex-col justify-start items-center">
      <BlurryShapes />
      <NoCreditBanner />
      <h1 className="text-8xl font-bold mt-10 text-center">
        Pric
        <span className="gradient-text-main">ing</span>
      </h1>
      <p className="text-lg pt-5 text-black dark:text-white text-center">
        Start expanding outside the boundries limit!
      </p>
      <p className="pt-5 text-center">
        This is a one time payment. We are not going to charge you monthly. You
        can purchase more credit once you ran out of it!
      </p>

      <div className="w-full flex justify-center items-center flex-wrap my-6 z-10">
        {tiers.map((tier, index) => (
          <PriceCard
            key={index * 283932}
            name={tier.name}
            id={tier.id}
            priceMonthly={tier.priceMonthly}
            priceId={tier.priceId}
            description={tier.description}
            features={tier.features}
          />
        ))}
      </div>
    </div>
  );
}

export default Pricing;

import { CheckIcon, StarIcon } from "lucide-react";
import React from "react";
import CheckoutBtn from "../checkoutBtn/CheckoutBtn";

interface Tier {
  name: string;
  id: string | null;
  priceMonthly: string | null;
  priceId: any;
  description: string;
  features: (string | undefined)[];
}

const PriceCard = ({
  name,
  id,
  priceMonthly,
  priceId,
  description,
  features,
}: Tier) => {
  return (
    <div
      className={`w-[340px] bg-white shadow-custom-shadow mx-2 my-8 rounded-xl py-3 px-4 flex flex-col justify-start items-start main-box-shadow ${
        id === "pro" ? "h-[500px]" : "h-[450px]"
      } hover:scale-105 transition duration-150`}
    >
      {id === "pro" && (
        <p className="py-1 px-2 text-sm main-gradient-bg text-white rounded-[20px] self-end">
          Popular
        </p>
      )}
      <div className="flex">
        {id === "pro" && (
          <StarIcon
            fill="#FF512F"
            stroke="#FF512F"
            className="mr-2 text-transparent gradient-text-main bg-clip-text"
          />
        )}
        <h3
          className={`font-bold text-black text-xl  ${
            id === "pro" && "text-transparent gradient-text-main bg-clip-text"
          }`}
        >
          {name}
        </h3>
      </div>
      <h2 className="text-6xl font-bold my-6">{priceMonthly}</h2>
      <p className="text-sm mb-6">{description}</p>
      <ul className="flex justify-start flex-col items-start min-h-[150px] mb-6">
        {features.map((feature, index) => (
          <li key={(index + 9857) * 90285} className="flex gap-x-3">
            <CheckIcon
              className="h-6 w-5 flex-none text-[#fc466b]"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
      <>{priceId && <CheckoutBtn priceId={priceId} id={id} />}</>
    </div>
  );
};

export default PriceCard;

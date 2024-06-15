import Link from "next/link";
import React, { useEffect } from "react";

const NoCreditBanner = () => {
  return (
    <Link
      href={"/pricing"}
      prefetch={false}
      className="main-gradient-bg w-full h-10 flex justify-center items-center text-white z-10 cursor-pointer"
    >
      Get credit and start chatting
    </Link>
  );
};

export default NoCreditBanner;

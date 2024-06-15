"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type CheckoutBtnProps = {
  priceId: any;
  id: string | null;
};

const CheckoutBtn = ({ priceId, id }: CheckoutBtnProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    if (!session) return;

    setLoading(true);
    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        mode: "payment",
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <button
      className={`${
        id === "pro"
          ? "main-gradient-bg text-white hover:scale-110"
          : "bg-white border-2 text-[#3f5efb] border-[#3f5efb] hover:main-gradient-bg hover:border-0 hover:text-white"
      } rounded-[30px] py-2 px-3 transition duration-150 cursor-pointer`}
      onClick={() => createCheckoutSession()}
    >
      {loading ? "Loading..." : "Buy Package"}
    </button>
  );
};

export default CheckoutBtn;

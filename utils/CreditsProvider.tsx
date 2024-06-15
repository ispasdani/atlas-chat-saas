"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { useCreditStore } from "@/store/CreditStoreState"; // Import CreditStore
import { db } from "@/firebase";

function CreditsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setCredits = useCreditStore((state) => state.setCredits); // Use CreditStore

  useEffect(() => {
    if (!session?.user.id) return;

    const fetchAndSetCredits = async () => {
      const userRef = doc(db, "users", session.user.id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const credits = userDoc.data()?.credits || 0;
        setCredits(credits);
      } else {
        console.error("User document does not exist!");
      }
    };

    fetchAndSetCredits();
  }, [session, setCredits]);

  return <>{children}</>;
}

export default CreditsProvider;

"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  onSnapshot,
  doc,
  getDocs,
  runTransaction,
  collection,
} from "firebase/firestore";
import { paymentRef } from "@/lib/converters/Payment";
import { db } from "@/firebase";

// Function to fetch credits mapping
const fetchCreditsMapping = async () => {
  const creditsMappingSnapshot = await getDocs(
    collection(db, "creditsMapping")
  );
  const creditsMapping: { [key: string]: number } = {};
  creditsMappingSnapshot.forEach((doc) => {
    const data = doc.data();
    creditsMapping[data.priceId] = data.credits;
  });
  return creditsMapping;
};

function PaymentProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user.id) return;

    // Fetch credits mapping
    let creditsMapping: { [key: string]: number } = {};

    const fetchAndSetCreditsMapping = async () => {
      creditsMapping = await fetchCreditsMapping();
    };

    fetchAndSetCreditsMapping();

    const unsubscribe = onSnapshot(
      paymentRef(session.user.id),
      async (snapshot) => {
        if (snapshot.empty) {
          console.log("User has no payments");
          return;
        } else {
          const payments = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          // Find the latest unprocessed successful payment
          const unprocessedPayments = payments.filter(
            (payment) => payment.status === "succeeded" && !payment.processed
          );
          if (unprocessedPayments.length === 0) return;

          const latestPayment = unprocessedPayments.reduce(
            (latest, payment) => {
              return latest.created > payment.created ? latest : payment;
            }
          );

          // Process the latest unprocessed successful payment
          let creditsToAdd = 0;

          for (const item of latestPayment.items) {
            const priceId = item.price.id;
            const itemCredits = creditsMapping[priceId];
            if (itemCredits) {
              creditsToAdd += itemCredits;
            }
          }

          if (creditsToAdd > 0) {
            const userRef = doc(db, "users", session.user.id);

            // Use a transaction to safely update the credits
            await runTransaction(db, async (transaction) => {
              const userDoc = await transaction.get(userRef);
              if (!userDoc.exists) {
                throw new Error("User document does not exist!");
              }

              const currentCredits = userDoc.data()?.credits || 0;
              const newCredits = currentCredits + creditsToAdd;

              transaction.update(userRef, { credits: newCredits });
              transaction.update(
                doc(
                  db,
                  "customers",
                  session.user.id,
                  "payments",
                  latestPayment.id
                ),
                { processed: true }
              );
            });

            console.log(
              `Added ${creditsToAdd} credits to user ${session.user.id}`
            );
          }
        }
      },
      (error) => {
        console.log("Error getting payments", error);
      }
    );

    return () => unsubscribe();
  }, [session]);

  return <>{children}</>;
}

export default PaymentProvider;

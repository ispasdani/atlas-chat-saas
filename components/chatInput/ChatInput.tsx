"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import {
  addDoc,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { User, messagesRef } from "@/lib/converters/Message";
import { useToast } from "../ui/use-toast";
import { db } from "@/firebase";
import { useCreditStore } from "@/store/CreditStoreState";

type ChatInputProps = {
  chatId: string;
};

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: ChatInputProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { setCredits, subtractCredits } = useCreditStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  useEffect(() => {
    if (!session?.user.id) return;

    const fetchCredits = async () => {
      const userRef = doc(db, "users", session.user.id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCredits(userDoc.data()?.credits || 0);
      } else {
        console.error("User document does not exist!");
      }
    };

    fetchCredits();
  }, [session?.user.id, setCredits]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputCopy = values.input.trim();
    form.reset();

    if (inputCopy.length === 0) {
      return;
    }

    if (!session?.user) {
      return;
    }

    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    // Subtract one credit from the user's account
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", session.user.id);
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const currentCredits = userDoc.data()!.credits || 0;
      if (currentCredits < 1) {
        toast({
          title: "Insufficient credits",
          description: "You do not have enough credits to send a message.",
          variant: "destructive",
        });
        throw new Error("Insufficient credits");
      }

      const newCredits = currentCredits - 1;
      transaction.update(userRef, { credits: newCredits });

      // Update the credit store
      subtractCredits(1);
    });

    // Add the message to the database
    await addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  }

  return (
    <div className="sticky bottom-0 px-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2  rounded-t-xl w-full mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#3f5efb] text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;

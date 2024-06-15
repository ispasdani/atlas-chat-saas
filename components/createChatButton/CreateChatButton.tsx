"use client";

import React, { useState } from "react";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useCreditStore } from "@/store/CreditStoreState";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";

const CreateChatButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const credits = useCreditStore((state) => state.credits);

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000,
    });

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chats/${chatId}`);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `There was an error when trying to create your chat! ${error}`,
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <button
      className="w-[45px] h-[45px] rounded-md bg-white hover:bg-gray-100 flex justify-center items-center border border-gray-200 mx-2 light-main-box-shadow"
      onClick={() => createNewChat()}
    >
      <MessageSquarePlusIcon />
    </button>
  );
};

export default CreateChatButton;

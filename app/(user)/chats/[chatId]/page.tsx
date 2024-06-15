import { authOptions } from "@/auth";
import AdminControls from "@/components/adminControls/AdminControls";
import ChatInput from "@/components/chatInput/ChatInput";
import ChatMembersBadge from "@/components/chatMembersBadge/ChatMembersBadge";
import ChatMessages from "@/components/chatMessages/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: ChatPageProps) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chats?error=permission");

  return (
    hasAccess && (
      <>
        <div className="p-2 border rounded-xl m-5 bg-gray-100">
          <AdminControls chatId={chatId} />

          <ChatMembersBadge chatId={chatId} />
        </div>

        <div className="flex-1">
          <ChatMessages
            chatId={chatId}
            session={session}
            initialMessages={initialMessages}
          />
        </div>

        <ChatInput chatId={chatId} />
      </>
    )
  );
}

export default ChatPage;

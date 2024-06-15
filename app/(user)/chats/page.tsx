import ChatPermissionError from "@/components/chatPermissionError/ChatPermissionError";
import ChatsList from "@/components/chatsList/ChatsList";
import React from "react";

type ChatsProps = {
  params: {};
  searchParams: {
    error: string;
  };
};

async function ChatsPage({ searchParams: { error } }: ChatsProps) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      <ChatsList />
    </div>
  );
}

export default ChatsPage;

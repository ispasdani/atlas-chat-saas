import Link from "next/link";
import React from "react";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "../createChatButton/CreateChatButton";
import UserButton from "../userButton/UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CreditsBtn from "@/components/creditsBtn/CreditsBtn";
import LanguageSelectBtn from "../languageSelectBtn/LanguageSelectBtn";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-11/12 min-h-[10vh] flex justify-center items-center z-10">
      <nav className="w-full h-full flex flex-col justify-between items-center sm:flex-row my-2">
        <Link
          href="/"
          prefetch={false}
          className="text-xl font-bold text-black"
        >
          ATLAS
          <span className="m-[0.15rem] text-xl gradient-text-main">.</span>
          <span className="gradient-text-main">chat</span>
        </Link>
        <div className="w-auto h-auto flex flex-wrap justify-center items-center">
          <LanguageSelectBtn />
          <CreditsBtn />
          {/* Going to chats */}
          <Link
            href={"/chats"}
            prefetch={false}
            className="w-[45px] h-[45px] rounded-md bg-white hover:bg-gray-100 flex justify-center items-center border border-gray-200 mx-2 my-2 light-main-box-shadow"
          >
            <MessagesSquareIcon size={28} />
          </Link>
          {/* Create a chat */}
          <CreateChatButton />
          {/* User dropdwon button */}
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
}

export default Header;

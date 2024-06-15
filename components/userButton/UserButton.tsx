"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/userAvatar/UserAvatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { SpokeSpinner } from "@/components/loadingSpinner/LoadingSpinner";
import { StarIcon } from "lucide-react";
import ManageAccountBtn from "@/components/manageAccountBtn/ManageAccountBtn";

type UserButtonProps = {
  session?: Session | null;
};

const UserButton = ({ session }: UserButtonProps) => {
  if (!session) {
    return (
      <Button
        variant={"outline"}
        onClick={() => signIn()}
        className="h-[45px] hover:hover-btn hover:text-white mx-2 main-gradient-bg text-white text-lg light-main-box-shadow"
      >
        Sign In
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name} image={session.user?.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

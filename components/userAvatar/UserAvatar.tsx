import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type UserAvatarProps = {
  name?: string | null;
  image?: string | null;
  className?: string;
};

const UserAvatar = ({ name, image, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("text-black mx-2", className)}>
      {image ? (
        <Image
          src={image}
          alt={name || "UA"}
          width={40}
          height={40}
          //   referrerPolicy="no-referrer"
          className="rounded-full fill-white"
        />
      ) : (
        <AvatarImage />
      )}

      <AvatarFallback
        delayMs={1000}
        className="dark:bg-white dark:text-black text-lg"
      >
        {name
          ? name
              ?.split(" ")
              .map((first) => first[0])
              .join("")
          : "UA"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

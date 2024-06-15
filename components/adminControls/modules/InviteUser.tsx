"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  getDocs,
  serverTimestamp,
  setDoc,
  doc,
  runTransaction,
} from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { getUserByEmailRef } from "@/lib/converters/User";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ShareLink from "./ShareLink";
import { useCreditStore } from "@/store/CreditStoreState";
import { db } from "@/firebase";

type InviteUserProps = {
  chatId: string;
};

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function InviteUser({ chatId }: InviteUserProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });

  const { subtractCredits } = useCreditStore();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite...",
    });

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registered user or resend the invitation once they have signed up!",
        variant: "destructive",
      });

      return;
    } else {
      const user = querySnapshot.docs[0].data();

      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", session.user.id);
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User document does not exist!");
        }

        const currentCredits = userDoc.data()?.credits || 0;
        if (currentCredits < 1) {
          toast({
            title: "Insufficient credits",
            description: "You do not have enough credits to send an invite.",
            variant: "destructive",
          });
          throw new Error("Insufficient credits");
        }

        const newCredits = currentCredits - 1;
        transaction.update(userRef, { credits: newCredits });

        // Update the credit store
        subtractCredits(1);

        await setDoc(addChatRef(chatId, user.id), {
          userId: user.id!,
          email: user.email!,
          timestamp: serverTimestamp(),
          chatId: chatId,
          isAdmin: false,
          image: user.image || "",
        });
      })
        .then(() => {
          setOpen(false);

          toast({
            title: "Added to chat",
            description: "The user has been added to the chat successfully!",
            className: "bg-green-600 text-white",
            duration: 3000,
          });

          setOpenInviteLink(true);
        })
        .catch(() => {
          toast({
            title: "Error",
            description:
              "Whoops... there was an error adding the user to the chat!",
            variant: "destructive",
          });

          setOpen(false);
        });
    }

    form.reset();
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email adress to invite them to this
                chat!{" "}
                <span className="text-indigo-600 font-bold">
                  ! They must be registered !
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
}

export default InviteUser;

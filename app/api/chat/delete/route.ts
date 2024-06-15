import { adminDb } from "@/firebase-admin";
import { NextResponse } from "next/server";
import { getDocs } from "firebase/firestore";
import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";

// Type definition for request body
interface DeleteChatRequestBody {
  chatId: string;
  userId: string;
}

// Function to get the admin of the chat
const getChatAdmin = async (chatId: string) => {
  const adminQuery = chatMemberAdminRef(chatId);
  const querySnapshot = await getDocs(adminQuery);
  if (querySnapshot.empty) {
    throw new Error("Admin not found");
  }
  return querySnapshot.docs[0].data();
};

export async function DELETE(req: Request) {
  try {
    const { chatId, userId }: DeleteChatRequestBody = await req.json();

    const chatRef = adminDb.collection("chats").doc(chatId);

    try {
      const adminData = await getChatAdmin(chatId);

      if (adminData.userId !== userId) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 403 }
        );
      }

      const bulkWriter = adminDb.bulkWriter();
      const MAX_RETRY_ATTEMPTS = 5;

      bulkWriter.onWriteError((error) => {
        if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
          return true;
        } else {
          return false;
        }
      });

      await adminDb.recursiveDelete(chatRef, bulkWriter);
      return NextResponse.json(
        {
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching chat admin:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error fetching chat admin",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Promise rejected:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting chat",
      },
      { status: 500 }
    );
  }
}

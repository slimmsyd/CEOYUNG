import { NextResponse } from 'next/server';
import * as z from 'zod';
import { db } from "@/app/api/lib/db";

// Schema for input validation using Zod
const conversationSchema = z.object({
  userIds: z.array(z.string().uuid()),  // Expecting an array of user IDs to add as participants
  title: z.string(),  // Assuming title is now required
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userIds, title } = conversationSchema.parse(body);

    console.log("Logging the userIds", userIds);
    console.log("Logging the title", title);

    const newConversation = await db.conversation.create({
      data: {
        title: title || "New Chat",
        participants: {
          create: userIds.map(userId => ({
            user: { connect: { id: userId } }
          }))
        },
      },
      include: {
        participants: {
          include: { user: true }
        }
      }
    });

    console.log(`New conversation created with ID: ${newConversation.id}`);
    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json({ message: "Failed to create conversation", error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Conversation ID is required" }, { status: 400 });
    }

    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    if (!conversation) {
      return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json({ message: "Failed to fetch conversation", error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  console.log("Request URL", request.url);
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: "Conversation ID is required" }, { status: 400 });
    }

    await db.conversation.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Conversation deleted successfully" }, { status: 204 });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ message: "No such conversation found" }, { status: 404 });
    }
    console.error("Error deleting conversation:", error);
    return NextResponse.json({ message: "Failed to delete conversation", error: (error as Error).message }, { status: 500 });
  }
}

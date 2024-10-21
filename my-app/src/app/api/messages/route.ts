import { db } from "@/app/api/lib/db";
import * as z from 'zod';
import { NextRequest, NextResponse } from 'next/server';

// Define the schema for input validation
const messageSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
  conversationId: z.string().uuid(), //
  userContent: z.string().min(1, "User message content is required"),
  botResponse: z.string().optional(), // Bot response might be asynchronous
  firstConvo: z.boolean().optional(),
  imageUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/messages");
  try {
    const body = await req.json();
    const { userId, conversationId, userContent, botResponse, firstConvo, imageUrl } =
      messageSchema.parse(body);
    console.log(
      `Processing message from user ${userId} in conversation ${conversationId}`
    );

    
    console.log("Logging the image URL", imageUrl);

    // Create a new message and link it to a user and a conversation
    const newMessage = await db.messages.create({
      data: {
        authorId: userId,
        conversationId: conversationId,
        userContent: userContent,
        botResponse: botResponse, // Handle optional bot response
        imageUrl: imageUrl,
        title: "Chat Interaction",
        published: true,
        firstConvo: firstConvo,
      },
    });

    return NextResponse.json(
      { message: "Message saved successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { message: "Failed to save message", error: (error as Error).message },
      { status: 500 }
    );
  }
}

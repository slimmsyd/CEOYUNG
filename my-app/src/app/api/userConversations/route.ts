// pages/api/userConversations.js

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
import * as z from 'zod';
import { NextRequest, NextResponse } from 'next/server';


const userIdSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
});

export async function GET(request: NextRequest) {     
  try {
    // Extract userId from searchParams instead of query
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Validate the userId
    const { userId: validatedUserId } = userIdSchema.parse({ userId });

    // Fetch all conversations associated with the user
    const userConversations = await db.userConversations.findMany({
      where: { userId: validatedUserId },
      include: {
        conversation: true  // Include the associated Conversation details
      }
    });

    // Prepare data to send back, including titles
    const conversations = userConversations
      .filter(uc => uc.conversation !== null)  // Filter out null conversations
      .map(uc => ({
        conversationId: uc.conversationId,
        title: uc.conversation.title
      }));

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Failed to fetch user conversations:", error);
    return NextResponse.json(
      { message: "Failed to fetch user conversations", error: (error as Error).message },
      { status: 500 }
    );
  }
}

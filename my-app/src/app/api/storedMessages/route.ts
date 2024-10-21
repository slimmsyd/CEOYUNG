
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
import * as z from 'zod';
import { NextRequest, NextResponse } from 'next/server';


const userIdSchema = z.object({
  authorId: z.string().uuid(), // Ensure the userId is a valid UUID
  conversationId: z.string().uuid(), // Ensure the userId is a valid UUID
});


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { authorId, conversationId } = userIdSchema.parse({
      authorId: searchParams.get('authorId'),
      conversationId: searchParams.get('conversationId'),
    });

    console.log("Logging the author Id in stored Message", authorId);
    console.log("Logging the convo Id in stored Message", conversationId);

    const messages = await db.messages.findMany({
      where: {
        authorId: authorId,
        conversationId: conversationId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log("Logging the messages in stored Message", messages);

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { message: "Failed to fetch messages", error: (error as Error).message },
      { status: 500 }
    );
  }
}

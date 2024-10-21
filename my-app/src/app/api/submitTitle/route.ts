import { db } from "../lib/db";
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {

    if (req.method === 'PUT') {
        try {
            const { title, id } = await req.json(); // Get the title and id from the request body
            console.log("Title being logged", title);
            console.log("Id being logged", id);
            const updatedConversation = await db.conversation.update({
                where: { id: id as string }, // Use the conversation ID from the request
                data: { title },
            });
            return NextResponse.json(updatedConversation);
        } catch (error) {
            return NextResponse.json({ message: "Failed to update conversation", error }, { status: 500 });
        }
    }
}

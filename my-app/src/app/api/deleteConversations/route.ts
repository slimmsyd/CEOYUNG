import { NextResponse } from 'next/server';

import { db } from '../lib/db';


export async function DELETE(req: Request) {
    const { id } = await req.json(); // Get the conversation ID from the request body

    console.log("Received conversation ID:", id);
    if (!id) {
        return NextResponse.json({ message: "Conversation ID is required" }, { status: 400 });
    }

    try {
        const conversation = await db.conversation.findUnique({
            where: { id: id as string },
        });

        if (!conversation) {
            return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
        }

        // Delete all messages associated with the conversation
        await db.messages.deleteMany({
            where: { conversationId: id as string },
        });

        // Delete the conversation from the database
        await db.conversation.delete({
            where: { id: id as string },
        });

        // Return a success message after deletion
        return NextResponse.json({ message: "Conversation and associated messages deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting conversation:", error);
        return NextResponse.json({ message: "Failed to delete conversation", error: (error as Error).message }, { status: 500 });
    }
}
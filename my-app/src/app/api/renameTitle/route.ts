import { NextResponse } from 'next/server';
import { db } from '../lib/db';


export async function PUT(req: Request) {
    const { id, title } = await req.json(); // Get the conversation ID and new title

    console.log("Received conversation ID:", id, "New title:", title);
    if (!id || !title) {
        return NextResponse.json({ message: "Conversation ID and title are required" }, { status: 400 });
    }

    try {
        const updatedConversation = await db.conversation.update({
            where: { id: id as string },
            data: { title: title as string },
        });

        if (!updatedConversation) {
            return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
        } 

        return NextResponse.json({ 
            message: "Conversation title updated successfully",
            conversation: updatedConversation 
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating conversation title:", error);
        return NextResponse.json({ message: "Failed to update conversation title", error: (error as Error).message }, { status: 500 });
    }
}

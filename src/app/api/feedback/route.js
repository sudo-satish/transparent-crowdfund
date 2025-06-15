import { db } from "@/services/db";

export const POST = async (req) => {
    const { name, mobile, message } = await req.json();

    await db.collection('feedback').insertOne({ name, mobile, message, created_at: new Date() });

    return Response.json({ message: 'Feedback submitted successfully' });
};
import { db } from "@/services/db";
import { sanitizeInput } from "@/utils/helper";

export const POST = async (req) => {
    const { name, mobile, message } = await req.json();

    // Sanitize user input to prevent XSS attacks
    const sanitizedData = {
        name: sanitizeInput(name),
        mobile: sanitizeInput(mobile),
        message: sanitizeInput(message),
        created_at: new Date()
    };

    await db.collection('feedback').insertOne(sanitizedData);

    return Response.json({ message: 'Feedback submitted successfully' });
};
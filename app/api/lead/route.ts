import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the data
    const validatedData = leadSchema.parse(body);

    // TODO: Integrate with email service (Mailgun, SendGrid, etc.)
    // TODO: Store in database or CRM

    console.log("New lead received:", validatedData);

    return NextResponse.json({
      ok: true,
      message: "Thank you for your message. We'll be in touch soon!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot
};

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^[+]?[0-9\s\-()]{8,20}$/;

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const rawName = body.name ?? "";
    const rawEmail = body.email ?? "";
    const rawPhone = body.phone ?? "";
    const rawMessage = body.message ?? "";
    const website = body.website ?? "";

    // Honeypot anti-spam
    if (website.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "OK" },
        { status: 200 }
      );
    }

    const name = sanitize(rawName);
    const email = sanitize(rawEmail);
    const phone = sanitize(rawPhone);
    const message = sanitize(rawMessage);

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Numele introdus nu este valid." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresa de email nu este validă." },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Numărul de telefon nu este valid." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { error: "Mesajul trebuie să aibă între 10 și 3000 de caractere." },
        { status: 400 }
      );
    }

    // TODO:
    // Aici conectezi trimiterea reală:
    // - Resend
    // - Nodemailer
    // - SMTP
    // - webhook / CRM
    //
    // Exemplu:
    // await sendEmail({ name, email, phone, message });

    console.log("Cerere contact nouă:", {
      name,
      email,
      phone,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mesajul a fost trimis cu succes.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "A apărut o eroare la procesarea cererii." },
      { status: 500 }
    );
  }
}
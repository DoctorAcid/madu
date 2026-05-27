import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SERVICE_LABELS: Record<string, string> = {
  "ui-ux": "UI/UX Design",
  development: "Frontend Development",
  both: "Design + Development",
  mobile: "Mobile App UI",
  other: "Not sure yet — let's talk",
};

export async function POST(req: NextRequest) {
  const { name, email, type, message } = await req.json();

  if (!name || !email || !type || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "madunaga6@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name} — ${SERVICE_LABELS[type] ?? type}`,
      html: `
        <table style="font-family:sans-serif;font-size:15px;color:#222;max-width:600px">
          <tr><td style="padding:8px 0"><strong>Name:</strong> ${name}</td></tr>
          <tr><td style="padding:8px 0"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0"><strong>Service:</strong> ${SERVICE_LABELS[type] ?? type}</td></tr>
          <tr><td style="padding:24px 0 8px"><strong>Message:</strong></td></tr>
          <tr><td style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] mail error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

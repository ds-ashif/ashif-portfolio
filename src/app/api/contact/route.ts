import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Rate-limit: simple in-memory store (per deployment instance)
// For production, use Redis or Upstash
const submissionMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 submission per IP per minute

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse body ────────────────────────────────────────
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    // ── 2. Validate ──────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message is too short." },
        { status: 400 }
      );
    }

    // ── 3. Rate limit ────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const lastSubmit = submissionMap.get(ip);
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_MS) {
      return NextResponse.json(
        { success: false, error: "Please wait a moment before sending another message." },
        { status: 429 }
      );
    }
    submissionMap.set(ip, Date.now());

    // ── 4. Send email via Resend ─────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === "your_resend_api_key_here") {
      // Dev fallback — log to console, return success so UI works
      console.log("📨 Contact form submission (no API key set):");
      console.log({ name, email, subject, message });
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(apiKey);

    const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "ashif@example.com";
    const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:24px 32px;">
            <h1 style="margin:0;font-size:22px;font-weight:700;">New Portfolio Message</h1>
            <p style="margin:4px 0 0;opacity:0.75;font-size:14px;">Someone reached out via your portfolio</p>
          </div>

          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);width:100px;">
                  <span style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <strong style="color:#fff;">${name}</strong>
                  <span style="color:rgba(255,255,255,0.5);margin-left:8px;">&lt;${email}&gt;</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span style="color:#a78bfa;font-weight:600;">${subject}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top:24px;">
              <p style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Message</p>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;line-height:1.7;color:rgba(255,255,255,0.8);">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
              <a href="mailto:${email}?subject=Re: ${subject}"
                style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="padding:16px 32px;background:rgba(0,0,0,0.3);text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.25);font-size:12px;">
              Sent from your portfolio contact form
            </p>
          </div>
        </div>
      `,
    });

    // Also send an auto-reply to the sender
    await resend.emails.send({
      from: `Ashif <${FROM_EMAIL}>`,
      to: [email],
      subject: `Got your message — I'll be in touch soon!`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:24px 32px;">
            <h1 style="margin:0;font-size:22px;font-weight:700;">Message Received! 🚀</h1>
          </div>
          <div style="padding:32px;">
            <p style="color:rgba(255,255,255,0.8);line-height:1.7;">Hi <strong>${name}</strong>,</p>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
              Thanks for reaching out! I've received your message about <strong style="color:#a78bfa;">"${subject}"</strong>
              and will get back to you within 24 hours.
            </p>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin:20px 0;color:rgba(255,255,255,0.6);font-style:italic;line-height:1.7;">
              "${message.slice(0, 200)}${message.length > 200 ? "..." : ""}"
            </div>
            <p style="color:rgba(255,255,255,0.6);line-height:1.7;">Talk soon,<br><strong style="color:#fff;">Ashif</strong></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstname,
      lastname,
      company,
      email,
      phone,
      website,
      message,
      website_check,
    } = body;

    // Einfacher Honeypot gegen Bots
    if (website_check) {
      return NextResponse.json({ success: true });
    }

    if (!firstname || !lastname || !company || !email || !website) {
      return NextResponse.json(
        { success: false, message: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Voixero Convert" <${process.env.SMTP_FROM}>`,
      to: "sales@voixero.com",
      replyTo: email,
      subject: `Neue Convert Business Trial Anfrage – ${company}`,
      text: `
Neue Anfrage über tryconvert.voixero.com

PRODUKT
Voixero Convert Business Trial

PREIS
Convert Business Trial (3 Monate): CHF 349.–
Einmaliges Setup: CHF 99.–
Total: CHF 448.– zzgl. MwSt.
Keine automatische Verlängerung.

KUNDE
Vorname: ${firstname}
Nachname: ${lastname}
Unternehmen: ${company}
E-Mail: ${email}
Telefon: ${phone || "Nicht angegeben"}
Website: ${website}

BEMERKUNGEN
${message || "Keine Bemerkungen"}

---
Gesendet über tryconvert.voixero.com
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#0b1d2e">
          <h2 style="color:#061426;">
            Neue Convert Business Trial Anfrage
          </h2>

          <p>
            Es wurde eine neue Anfrage über
            <strong>tryconvert.voixero.com</strong> übermittelt.
          </p>

          <div style="background:#f4f8fa;padding:20px;border-radius:8px;margin:25px 0;">
            <strong>Voixero Convert Business Trial</strong><br><br>

            Convert Business Trial (3 Monate):
            <strong>CHF 349.–</strong><br>

            Einmaliges Setup:
            <strong>CHF 99.–</strong><br><br>

            <strong>Total: CHF 448.– zzgl. MwSt.</strong><br>

            <span style="color:#567;">
              Keine automatische Verlängerung
            </span>
          </div>

          <h3>Unternehmensdaten</h3>

          <table style="border-collapse:collapse;width:100%;">
            <tr>
              <td style="padding:7px 0;color:#678;">Name</td>
              <td style="padding:7px 0;">
                <strong>${firstname} ${lastname}</strong>
              </td>
            </tr>

            <tr>
              <td style="padding:7px 0;color:#678;">Unternehmen</td>
              <td style="padding:7px 0;">
                <strong>${company}</strong>
              </td>
            </tr>

            <tr>
              <td style="padding:7px 0;color:#678;">E-Mail</td>
              <td style="padding:7px 0;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>

            <tr>
              <td style="padding:7px 0;color:#678;">Telefon</td>
              <td style="padding:7px 0;">
                ${phone || "Nicht angegeben"}
              </td>
            </tr>

            <tr>
              <td style="padding:7px 0;color:#678;">Website</td>
              <td style="padding:7px 0;">
                ${website}
              </td>
            </tr>
          </table>

          <h3>Bemerkungen</h3>

          <p style="background:#f4f8fa;padding:15px;border-radius:8px;">
            ${message || "Keine Bemerkungen"}
          </p>

          <hr style="border:0;border-top:1px solid #ddd;margin-top:30px;">

          <small style="color:#789;">
            Automatisch gesendet über tryconvert.voixero.com
          </small>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Ihre Anfrage wurde erfolgreich übermittelt.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}
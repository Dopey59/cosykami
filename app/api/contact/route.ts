import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, subject, message } = body;

  if (!firstName || !email || !subject || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"Cosykami Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact] ${subject} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A">
          <h2 style="margin-bottom:16px">Nouveau message via le formulaire</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <tr>
              <td style="padding:6px 12px 6px 0;color:#6B6B6B;white-space:nowrap;width:90px">Nom</td>
              <td style="padding:6px 0"><strong>${firstName} ${lastName}</strong></td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#6B6B6B">Email</td>
              <td style="padding:6px 0"><a href="mailto:${email}" style="color:#FF85A1">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 12px 6px 0;color:#6B6B6B">Sujet</td>
              <td style="padding:6px 0">${subject}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #FFD6E0;margin:16px 0"/>
          <p style="white-space:pre-line;line-height:1.6">${message}</p>
          <hr style="border:none;border-top:1px solid #FFD6E0;margin:16px 0"/>
          <p style="color:#6B6B6B;font-size:12px">Message reçu depuis cosykami.fr</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
  }
}

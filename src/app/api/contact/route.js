// app/api/contact/route.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // contraseña de aplicación Google
  },
});

export async function POST(request) {
  try {
    const { name, email, msg } = await request.json();

    if (!name || !email || !msg) {
      return Response.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from:    `"${name}" <${process.env.SMTP_USER}>`,
      to:      process.env.DEST_EMAIL,
      replyTo: email,
      subject: `[Portfolio] Mensaje de ${name}`,
      text:    `Nombre: ${name}\nEmail: ${email}\n\n${msg}`,
      html: `
        <div style="font-family:monospace;background:#0a100a;color:#e8f0e8;padding:24px;border:1px solid #1a341a;">
          <h2 style="color:#39ff14;margin-bottom:16px;">📩 Nuevo mensaje del portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#39ff14;padding:6px 12px 6px 0;width:80px;">Nombre</td><td>${name}</td></tr>
            <tr><td style="color:#39ff14;padding:6px 12px 6px 0;">Email</td><td><a href="mailto:${email}" style="color:#5c9bd6;">${email}</a></td></tr>
          </table>
          <hr style="border-color:#1a341a;margin:16px 0;"/>
          <p style="line-height:1.8;white-space:pre-wrap;">${msg}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error al enviar email:", err);
    return Response.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
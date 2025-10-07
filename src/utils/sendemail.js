"use server";

import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  // Create transporter using GoDaddy SMTP
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // GoDaddy's SMTP server
    port: 465, // use 465 (SSL) or 587 (TLS)
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER, // e.g., info@dermaveritas.com
      pass: process.env.EMAIL_PASSWORD, // email account password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // "info@dermaveritas.com"
    to: to,
    subject: subject,
    html: html,
  };

  // Send email
  return transporter.sendMail(mailOptions);
}

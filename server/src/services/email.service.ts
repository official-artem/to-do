import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  } as SMTPTransport.Options);

interface Props {
  email: string,
  subject: string,
  html: string;
}

export function sendEmail({ email, subject, html }: Props) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

function sendActivationEmail(email: string, token: string) {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`;
  const html = `
  <h1>Activate account</h1>
  <a href=${href}">${href}</a>
  `;

  return sendEmail({
    email,
    html,
    subject: 'Activate'
  });
}

export const emailService = {
  sendActivationEmail,
};
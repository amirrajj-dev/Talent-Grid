import nodemailer from 'nodemailer';
import { ENV } from '../configs/env.js';
import logger from './logger.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  rateDelta: 20000,
  rateLimit: 5,
  secure: true,
  port: 465,
  logger: true,
  debug: true,
});

export const sendWelcomeEmail = async (to, name) => {
  try {
    const message = {
      from: `"Talent-Grid" <${ENV.EMAIL_USER}>`,
      to,
      subject: 'Welcome to Talent-Grid 🚀',
      html: `
      <div style="font-family:sans-serif">
        <h2>Welcome, ${name}!</h2>
        <p>We’re thrilled to have you on board at <b>Talent Grid</b>.</p>
        <p>Start exploring your dashboard and let’s build something amazing.</p>
        <br/>
        <p>— The Talent Grid Team</p>
      </div>
    `,
    };

    await transporter.sendMail(message);
    logger.info(`Welcome email sent successfully to ${to}`);
  } catch (error) {
    logger.error(
      `Failed to send welcome email to ${to} => ${error instanceof Error ? error.message : error}`,
    );
  }
};

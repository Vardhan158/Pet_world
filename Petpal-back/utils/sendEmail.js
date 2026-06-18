import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends an email using Brevo SMTP or Gmail as fallback
 */
export const sendEmail = async (to, subject, html) => {
  try {
    // Use Brevo SMTP if available, otherwise fallback to standard EMAIL_USER/PASS
    const user = process.env.BREVO_USER || process.env.EMAIL_USER;
    const pass = process.env.BREVO_PASS || process.env.EMAIL_PASS;
    const fromEmail = process.env.BREVO_FROM_EMAIL || process.env.EMAIL_USER;
    const fromName = process.env.EMAIL_FROM_NAME || "PetPal World";

    if (!user || !pass) {
      throw new Error("Email configuration missing (BREVO_USER/PASS)");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error; // Re-throw so the controller knows it failed
  }
};

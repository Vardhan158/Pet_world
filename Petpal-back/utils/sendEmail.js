import dotenv from "dotenv";

dotenv.config();

/**
 * Sends an email using Brevo's REST API (Highly recommended for Render/Heroku)
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL || "harshavardhandevang@gmail.com";
    const fromName = process.env.EMAIL_FROM_NAME || "PetPal World";

    if (!apiKey) {
      throw new Error("BREVO_API_KEY is missing in environment variables");
    }

    console.log(`📨 Attempting to send email via Brevo API to: ${to}`);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        sender: {
          name: fromName,
          email: fromEmail
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Brevo API Error Response:", result);
      throw new Error(result.message || "Failed to send email via Brevo API");
    }

    console.log(`📧 Email sent successfully! Message ID: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error("❌ Send Email Error:", error.message);
    throw error;
  }
};

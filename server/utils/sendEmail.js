require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',    // iCloud SMTP server
  port: 587,                   // STARTTLS port
  secure: false,               // must be false for STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates (only for dev/testing)
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: `"Beauty Salon" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending email:', err);
    throw err; // re-throw to handle in caller
  }
}

module.exports = sendEmail;

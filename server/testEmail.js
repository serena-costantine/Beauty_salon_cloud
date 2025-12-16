const sendEmail = require('./sendEmail');

sendEmail('yourtargetemail@example.com', 'Test Email', 'This is a test email from Beauty Salon.')
  .catch((err) => {
    console.error("❌ Failed to send test email:", err);
  });

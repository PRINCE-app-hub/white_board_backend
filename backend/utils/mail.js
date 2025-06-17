const nodemailer=require('nodemailer');
const sendEmailWithAttachment = async ({ to, subject, text, imageBase64 }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: 'whiteboard.png',
        content: imageBase64.split("base64,")[1],
        encoding: 'base64',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailWithAttachment };
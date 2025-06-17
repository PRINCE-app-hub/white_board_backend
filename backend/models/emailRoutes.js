const { sendEmailWithAttachment } = require('../utils/mail');
const { verifyToken } = require('../utils/auth');

router.post('/send-email', verifyToken, async (req, res) => {
  try {
    const { to, imageBase64 } = req.body;

    if (!to || !imageBase64) {
      return res.status(400).json({ message: 'Email and image are required' });
    }

    await sendEmailWithAttachment({
      to,
      subject: 'Your Whiteboard Export',
      text: 'Please find the whiteboard image attached.',
      imageBase64,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {   
    console.error(err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
});

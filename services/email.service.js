const sgMail = require('@sendgrid/mail');

const BASE_URL = `http://localhost:${process.env.PORT}/api`;

const sendEmail = async (userEmail, verificationToken) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  const link = `${BASE_URL}/users/verify/${verificationToken}`;
  const msg = {
    to: userEmail, // Change to your recipient
    from: 'mashasedaya199317@gmail.com', // Change to your verified sender
    subject: 'Confirm your email',
    html: `<h4>Click on this link to confirm registration ${link}</h4>`,
  };
  try {
    const result = await sgMail.send(msg);
    console.log('result', result);
  } catch (e) {
    console.log('ERROR', e);
    throw e;
  }
  //   sgMail
  //     .send(msg)
  //     .then(() => {
  //       console.log('Email sent');
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
};
module.exports = {
  sendEmail,
};

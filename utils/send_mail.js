require('dotenv').config();
const nodemailer = require('nodemailer'); // Correct import
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const send_mail = async (user, data, template, attachment) => {
  try {
    // Get the access token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "acharyahabba@acharya.ac.in",  // Ensure this email matches the account
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token, // Access token to authenticate Gmail requests
      },
    });

    // Prepare the email options
    const mailOptions = {
      from: "🐯 HABBA 2025<acharyahabba@acharya.ac.in>",
      to: user.email,
      subject: data.subject,
      text: data.text,
      html: template,
      attachments: attachment && [
        {
          filename: `${user.verID.toString().padStart(4, "0")}-${user.eventName}.pdf`,
          content: attachment,
          contentType: "application/pdf",
        },
      ],
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = { send_mail };

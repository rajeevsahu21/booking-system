import nodemailer from "nodemailer";

const sendEmail = async (mailOptions) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_USER_PASSWORD,
      },
    });
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};

export default sendEmail;

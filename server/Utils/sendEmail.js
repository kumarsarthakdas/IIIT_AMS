import nodemailer from "nodemailer";

const sendEmail = async (sent_from, sent_to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: process.env.EMAIL_USER,
    to: sent_to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully. " + info.response);
    }
  });
};

export default sendEmail;

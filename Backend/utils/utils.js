// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// const admin = {
//   email: "apps.kishorbalgi@gmail.com",
//   name: "Kishor Balgi",
// };

// Sing JWT and return
const signJWTToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Verify JWT and return
const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
// NodeMailer class:
// class Email {
//   constructor(to, from = admin) {
//     this.to = to.email;
//     this.from = from.email;
//   }

//   createtransporter() {
//     return nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.NODEMAILER_EMAIL,
//         pass: process.env.NODEMAILER_PASSWORD,
//       },
//     });
//   }

//   async sendCustomMail(subject, message = null, html = null) {
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject: subject,
//       message,
//       html,
//     };

//     await this.createtransporter().sendMail(mailOptions);
//   }
// }

// module.exports = { Email, signJWTToken, verifyJWTToken };
module.exports = { signJWTToken, verifyJWTToken };

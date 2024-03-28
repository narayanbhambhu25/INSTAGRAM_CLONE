const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");

// const nodemailer = require("nodemailer");
// const tls = require("tls");

// // Create a transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "narayan210346@gmail.com", // your email
//     pass: "gfxPc*23qb82*jK", // your password
//   },
//   // Accept self-signed certificates
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// // Function to send email
// function sendEmail(email, subject, message) {
//   // Setup email data
//   let mailOptions = {
//     from: "narayan210346@gmail.com", // sender address
//     to: email, // list of receivers
//     subject: subject, // Subject line
//     text: message, // plain text body
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log("Error occurred while sending email:", error);
//     }
//     console.log("Email sent: %s", info.messageId);
//   });
// }

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic,
        });

        user
          .save()
          .then((user) => {
            // // Usage example
            // // Replace these values with actual user details
            // const userEmail = "user.email";
            // const userSubject = "Welcome to our platform!";
            // const userMessage =
            //   "Thank you for signing up. We hope you enjoy our platform.";

            // // Call the function to send the email
            // sendEmail(userEmail, userSubject, userMessage);

            res.json({ message: "SignedUp successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invaild Email or Password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully login"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET); // created token
          const { _id, name, email, followers, following, pic } = savedUser; // send to frontend
          res.json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Invaild Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err); // this error is produced from developer side not from user side
      });
  });
});

module.exports = router;

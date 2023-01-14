const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const { UserModel } = require("../models/model");
const UserRouter = express.Router();

app.use(express.json());

UserRouter.get("/", (req, res) => {
  res.send("WELCOME router");
});

//! ***** REGISTER

// UserRouter.post("/register", async (req, res) => {
//   const { username,email,location, password,date_of_birth, confirm_password, role } = req.body;
//   // const payload = req.body
//   try {
//     const user = await UserModel({username, email,location,password:secure_password,date_of_birth,confirm_password:secure_password,role});
//     if (user) {
//       return res.send({ msg: "user alreay exists" });
//     }else{
//       bcrypt.hash(password, 5, async (err, secure_password) => {
//         if (err) {
//           console.log({ err: "err" });
//         } else {
//           const user = new UserModel({
//             username,
//             email,
//             location,
//             password: secure_password,
//             date_of_birth,
//             confirm_password:secure_password,
//             role
//           });
//           await user.save();
//           // res.send({ user: "Registered Successsfully" });
//           res.send(user)
//           console.log(user);
//         }
//       });
      
//     }
   
//   } catch (error) {
//     console.log({ error: "Error in registration" });
//   }
// });

UserRouter.post('/register', (req, res) => {
  let { username, password, confirm_password, location, date_of_birth, role, email } = req.body;
  console.log(req.body);

  try {
      bcrypt.hash(password, 5, async (err, secure_password) => {
          if (err) {
              console.log({ 'err': err })
          } else {
              const data = new UserModel({ username, password: secure_password, confirm_password: secure_password, location, date_of_birth, role, email });
              await data.save()
              res.send(data);
              console.log(data);
          }
      })

  } catch (error) {
      console.log({ 'error': error });
      console.log('Something went wrong');
  }

});


//!login ********
//check the password

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].password;

    if (user.length > 0) {
      bcrypt.hash(password, hashed_pass, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ "msg": "login successfully", "token": token });
        } else {
          res.send("wrong cred");
        }
      });
    } else {
      res.send("wrong credentialss");
    }
  } catch (err) {
    console.log({ err: "err" });
    res.send({ "msg": "error crede in login" });
  }
});

//! ******************

UserRouter.get("/about", (req, res) => {
  res.send("WELCOME  about router");
});

//!data **************** GET

UserRouter.get("/data", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("invalid token");
      console.log(err);
    } else {
      res.send("data");
    }
  });

  console.log("WELCOME API data ");
});

//!cart ************************ GET

UserRouter.get("/cart", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("invalid token");
      console.log(err);
    } else {
      res.send("cart page");
    }
  });

  console.log("WELCOME  cart router");
});

UserRouter.get("/contact", (req, res) => {
  res.send("WELCOME contact router");
});

module.exports = {
  UserRouter,
};

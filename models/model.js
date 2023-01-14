const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  location: String,
  password: String,
  date_of_birth: String,
  confirm_password: String,
  role: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

// {
//   "name": " sir",
//   "password": "abc",
//   "email": "p12@gmail.com",
//   "age": 7
// }



// {
//   "username": "ayushi",
//   "date_of_birth": "2001-12-03",
//   "role": "student",
//   "location": "goa",
//   "password": "123",
//   "email": "soniayushi345@gmail.com",
//   "confirm_password": "123"
// }
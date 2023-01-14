const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

const { connections } = require("./config/config");
const { UserModel } = require("./models/model");
const { NoteModel } = require("./models/notes_models");
const { UserRouter } = require("./router/userroute");
const { noteRouter } = require("./router/note.route");
const { authenticate } = require("./middleware/authentication_middleware");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/user", UserRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("WELCOME home");
});

app.listen(process.env.port, async () => {
  try {
    await connections;
    console.log(`connected to database successfully ${process.env.port}`);
  } catch (err) {
    console.log({ error: "error in connecting" });
  }
});

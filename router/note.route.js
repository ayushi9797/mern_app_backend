const { application } = require("express");
const express = require("express");
const { authenticate } = require("../middleware/authentication_middleware");
const { NoteModel } = require("../models/notes_models");

const noteRouter = express.Router();

noteRouter.get("/", (req, res) => {
  res.send("WELCOME  Router home");
});

noteRouter.get("/get", async (req, res) => {
  try {
    const user = await NoteModel.find();
    res.send(user);
    console.log(user);
  } catch (error) {
    res.send({ err: "something went wrong" });
  }
});

// noteRouter.post("/create", async (req, res) => {
//   const payload = req.body;
//   console.log(payload);
//   try {
//     const new_note = new NoteModel(payload);
//     await new_note.save();
//     res.send("created the notes");
//   } catch (err) {
//     console.log({ err: err });
//     // res.send({ msg: "error,something went wrong" });
//   }
// });

noteRouter.post("/create", async (req, res) => {
  const { title, note, category, userID } = req.body;
  try {
    const data = new NoteModel({ title, note, category, userID });
    await data.save();
    res.send({ "Message": `${data.name} has successfully created` });
  } catch (error) {
    console.log({ "error": error });
    console.log("Something went wrong");
  }
});
// title: {
//   type: String,
//   required: true,
// },
// note: {
//   type: String,
//   required: true,
// },
// category: {
//   type: String,
//   required: true,
// },
// userID
// : {
//   type: String

// },

// noteRouter.patch("/update:/id", async (req, res) => {
//   const payload = req.body;
//   const id = req.params.id;
//   const note = await NoteModel.findOne({ _id: id });
//   const userID_in_note = note.userID;
//   const userID_making_req = req.body.userID;
//   try {
//     if (userID_making_req !== userID_in_note) {
//       res.send("not authorised");
//     } else {
//       await NoteModel.findByIdAndUpdate({ _id: id }, payload);

//       res.send("done Patching");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "something went wrong" });
//   }
// });

//!updating

noteRouter.patch("/update/:noteID",async(req,res)=>{
  const noteID = req.params.noteID
  const userID = req.body.userID
  const payload = req.body
  const note = await NoteModel.findOne({_id:noteID})
  try {
      if(userID!==note.userID){
          res.send("You are not Authorized for updating")
      }else{
           const data = await NoteModel.findByIdAndUpdate({_id:noteID},payload)
          res.send("Data Updated Successfully")
      }
     
  } catch (error) {
      console.log(Error)
      res.send("error in patch")
  }
})

//!delete ===== it is not working

noteRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findOne({ "_id": id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;

  try {
      if (userID_making_req != userID_in_note) {
          res.send('You are not authorized to delete the note')
      } else {
          await NoteModel.findByIdAndDelete({ "_id": id });
          res.send('Note has been deleted');
      }

  } catch (error) {
      console.log({ 'error': error });
      console.log('Something went wrong');
  }
})


module.exports = {
  noteRouter,
};

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userID:{
    type: String,
  }
  
    
  }
);

const NoteModel = mongoose.model("notes",noteSchema)

module.exports = {
  NoteModel,
};


//  {"title": "nature", "note": "lovee plants",  "category":"ii","userID": "me}



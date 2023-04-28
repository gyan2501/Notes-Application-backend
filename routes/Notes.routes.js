const express = require("express");
const { NoteModel } = require("../model/Notes.model");

const noteRouter = express.Router();

// CREATE NOTES ROUTE
noteRouter.post("/create", async (req, res) => {
  try {
    const note = await NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note is added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//GET NOTES ROUTE
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorId: req.body.authorId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//PATCH / UPDATE ROUTE
noteRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findOne({ _id: id });
  try {
    if (req.body.authorId !== note.authorId) {
      res.status(200).send({ msg: "You are not authorised to do this action!" });
    } else {
      await NoteModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send({ msg: "Note is updated Successfully!" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// DELETE ROUTE
noteRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findOne({ _id: id });
  try {
    if (req.body.authorId !== note.authorId) {
      res.status(200).send({ msg: "You are not authorised to do this action!" });
    }else{
       await NoteModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Note is Deleted Successfully!" });
    }
   
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  noteRouter,
};

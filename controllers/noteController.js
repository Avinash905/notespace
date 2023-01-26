const Note = require("../models/noteModel");

const getallnotes = async (req, res) => {
  try {
    const note = await Note.find({ userId: req.token.userId });
    if (!note) {
      return res.status(404).send("Unauthorized access");
    }
    return res.send(note);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getnote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    return res.send(note);
  } catch (error) {
    res.status(404).send(error);
  }
};

const setnote = async (req, res) => {
  try {
    const note = await Note(req.body);
    const result = await note.save();
    if (!result) {
      return res.status(404).send("Unable to insert note");
    }
    return res.send("Created note successfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

const editnote = async (req, res) => {
  try {
    const userFound = await Note.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!userFound) {
      return res.status(404).send("Unable to update note");
    }
    return res.send("Note updated successfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

const deletenote = async (req, res) => {
  try {
    const userFound = await Note.findByIdAndDelete({ _id: req.params.id });
    return res.send("Note deleted successfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { getallnotes, getnote, setnote, editnote, deletenote };

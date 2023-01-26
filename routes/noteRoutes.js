const express = require("express");
const {
  getallnotes,
  getnote,
  setnote,
  editnote,
  deletenote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

const noteRouter = express.Router();

noteRouter.get("/getallnotes", auth, getallnotes);
noteRouter.get("/getnote/:id", auth, getnote);
noteRouter.post("/setnote", auth, setnote);
noteRouter.put("/editnote/:id", auth, editnote);
noteRouter.delete("/deletenote/:id", auth, deletenote);

module.exports = noteRouter;

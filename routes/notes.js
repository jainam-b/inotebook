const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes LOgin Require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note using /api/notes/addnote LOgin Require
router.post(
  "/adduser",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Add a new note using /api/notes/addnote LOgin Require
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  // create a newNote object
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be update and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found ");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed ");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: delete an existing note using /api/notes/deletenote LOgin Require
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // create a newNote object
  
  try {
   // find the note to be deleted and deleted it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found ");
    }
    // allowed deletion only if the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed ");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted  ", note: note }); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

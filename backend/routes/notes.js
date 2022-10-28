const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../midleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE1: fetches all notes of authenticated user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error!");
  }
});

//ROUTE2: [POST req]adds notes, authentication required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a title").isLength({ min: 2 }),
    body("description", "Descripion should atleast be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return req.status(400).send({ error: errors.array() });
    }
    try {
      const { title, description, tags } = req.body;
      const note = new Note({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      req.status(500).send("Internal server error!");
    }
  }
);

//ROUTE 3: [PUT request] Update a note, authentication required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    //creating a newNote object to register the updates
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id); //taking the id passed from the request parameters
    if (!note) {
      return res.status(404).send("Note not found!");
    }

    //checking if user updating note that belongs to them by checking user id w req and note object
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Update not allowed!");
    }

    //updating the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error!");
  }
});

//ROUTE 4: [DELETE req] delete a note, authentication requires
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed!");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send({ msg: "this Note is deleted", note: note });
  } catch (error) {
    console.error(error.message);
    req.status(500).send("Internal server error!");
  }
});

module.exports = router;

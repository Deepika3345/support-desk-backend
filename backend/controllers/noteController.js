const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");
const createNote = asyncHandler(async (req, res) => {
  // Get User from Jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not Found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket nor found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Unauthorized...");
  }
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  if (!note) {
    res.status(400);
    throw new Error("Note not created..");
  }
  res.status(200).json(note);
});

const getNotes = asyncHandler(async (req, res) => {
  // Get User from Jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not Found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket nor found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Unauthorized...");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });
  if (!notes) {
    res.status(404);
    throw new Error("Notes not found");
  }
  res.status(200).json(notes);
});
module.exports = { createNote, getNotes };

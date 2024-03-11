const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const adminallticket = asyncHandler(async (req, res) => {
  //verify admin
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  const ticket = await Ticket.find();

  if (!ticket) {
    res.status(400);
    throw new Error("No tickets here");
  }
  res.status(200).json(ticket);
});
const adminticketedit = asyncHandler(async (req, res) => {
  //verify admin
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  //find ticket
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("Ticket not found");
  }

  const data = await Ticket.findByIdAndUpdate(ticket._id, req.body, {
    new: true,
  });

  if (!data) {
    res.status(400);
    throw new Error("Can't Update");
  }

  res.status(200).json(data);
});
const createAdminNote = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }
  const { userid, ticketid, text } = req.body;

  if ((!userid, !ticketid, !text)) {
    res.status(400);
    throw new Error("Please Give All Data");
  }
  const user = await User.findById(userid);
  if (!user) {
    res.status(400);
    throw new Error(" Not Exists");
  }
  const ticket = await Ticket.findById(ticketid);
  if (!ticket) {
    res.status(400);
    throw new Error("Ticket Not Exists");
  }

  const data = await Note.create({
    user: userid,
    ticket: ticketid,
    text: text,
    isStaff: true,
    staffId: req.user._id,
  });

  if (!data) {
    res.status(400);
    throw new Error("Can't Create Note");
  }

  res.status(200).json(data);
});
const getallprofile = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  const data = await User.find();

  if (!data) {
    res.status(404);
    throw new Error("No  Found");
  }

  res.status(200).json(data);
});
const getalladminnotes = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  const ticketid = req.params.id;

  const ticket = await Ticket.findById(ticketid);

  if (!ticket) {
    res.status(400);
    throw new Error("Ticket Not Exists");
  }

  const data = await Note.find({
    ticket: ticketid,
  });

  if (!data) {
    res.status(400);
    throw new Error("No Notes Here");
  }

  res.status(200).json(data);
});

const adminSingleTicket = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error(" Ticket not get");
  }
  res.status(200).json(ticket);
});

const userTickets = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user._id);

  if (!profile || !profile.isAdmin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  const userid = await User.findById(req.params.id);
  if (!userid) {
    res.status(404);
    throw new Error("user  not get");
  }
  const userTickets = await Ticket.find({user:req.user._id});
  if (!userTickets) {
    res.status(404);
    throw new Error("ticket not get");
  }
  res.status(202).json(userTickets);
});

module.exports = {
  adminticketedit,
  adminallticket,
  createAdminNote,
  getallprofile,
  getalladminnotes,
  adminSingleTicket,
  userTickets,
};

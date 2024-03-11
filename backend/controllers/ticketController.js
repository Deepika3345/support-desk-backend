const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')


const createTicket = asyncHandler(async (req, res) => {
    const { product, description ,status} = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("Fill all details")
    }
    //   Get user from jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status
        // status:"new"
    })
    res.send(ticket)

})

const getTickets = asyncHandler(async (req, res) => {
    //   Get user from jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    const tickets = await Ticket.find({ user: req.user.id })
    if (!tickets) {
        res.status(404)
        throw new Error("Not found")

    }
    res.status(200).json(tickets)

})


const getTicket = asyncHandler(async (req, res) => {
    //   Get user from jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error(" Ticket not get")
    }
    res.status(200).json(ticket)

})

const deleteTicket = asyncHandler(async (req, res) => {
    //   Get user from jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error(" Ticket not get")
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Unauthorized")
    }
    else {
        await Ticket.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: "Ticket deleted"
        })
    }

})

const updateTicket = asyncHandler(async (req, res) => {
    //   Get user from jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error(" Ticket not get")
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Unauthorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedTicket)
})

module.exports = { createTicket, getTickets, getTicket, deleteTicket, updateTicket }
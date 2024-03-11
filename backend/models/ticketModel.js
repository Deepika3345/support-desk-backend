const mongoose = require("mongoose")
// const User = require("../models/userModel")
const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: String,
        required:[ true,'Please select Product'],
        enum:['iPhone','iPad','iPod','iMac','Macbook','iWatch']
    },
    description: {
        type: String,
        required: [true, 'Enter your message']

    },
    status: {
        type: String,
        required:true,
        enum: ['open', 'close', 'new'],
        default:"new"
       
    },

}, { timestamps: true })

module.exports = mongoose.model("Ticket",ticketSchema)
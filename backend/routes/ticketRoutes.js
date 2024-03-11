const express = require("express")
const { createTicket, getTickets, getTicket, deleteTicket, updateTicket } = require("../controllers/ticketController")
const { protect } = require("../middlewares/authMiddleware")
const router = express.Router()


// router.post("/",protect, createTicket)
// router.get('/',protect,getTickets)

router.route("/").get(protect,getTickets).post(protect,createTicket)

router.route("/:id")
.get(protect,getTicket)
.delete(protect,deleteTicket)
.put(protect,updateTicket)


// Re-routing towards /api/ticket/:ticketId/note
router.use("/:ticketId/note",require("./noteRoutes"))

module.exports = router
const express = require("express");
const { adminProtect } = require("../middlewares/adminMiddleware");
const {
  createAdminNote,
  adminallticket,
  adminticketedit,
  getallprofile,
  getalladminnotes,
  adminSingleTicket,
  userTickets,
} = require("../controllers/adminControllers");
const router = express.Router();
router.post("/", adminProtect, createAdminNote);
router.get("/", adminProtect, adminallticket);
router.put("/:id", adminProtect, adminticketedit);
router.get("/profile", adminProtect, getallprofile);
router.get("/note/:id", adminProtect, getalladminnotes);

router.get('/:id/user',adminProtect,userTickets)

router.get("/:id", adminProtect, adminSingleTicket);

module.exports = router;

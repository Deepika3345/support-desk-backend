const express = require("express");
// const { protect } = require("../middlewares/authMiddleware");
const { createNote, getNotes } = require("../controllers/noteController");
const { adminProtect } = require("../middlewares/adminMiddleware");
const router = express.Router({ mergeParams: true });
router.route("/").post(adminProtect, createNote).get(adminProtect, getNotes);
module.exports = router;

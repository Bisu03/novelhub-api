const express = require("express");
const { postAnnounce, getAnnounce, deleteAnnounce } = require("../controllers/announceControl");
const { userMiddleware } = require("../middleware/token");
const router = express.Router();

router.post("/postannounce", userMiddleware, postAnnounce);
router.get("/allAnnounce", getAnnounce);
router.delete("/deleteannounce/:id", userMiddleware, deleteAnnounce);

module.exports = router;

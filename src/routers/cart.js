const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
router.get("/:id", cartController.test);
router.put("/update-qty/:id", cartController.update);
router.get("/", cartController.index);
module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const middlewareControl = require("../middleware/middleware");

router.post("/:slug", productController.cart);
router.get("/:slug", productController.detail);
router.get("/", productController.index);
module.exports = router;

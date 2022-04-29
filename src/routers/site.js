const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

router.post("/search", siteController.search);
// router.get("/cart", siteController.cart);
router.get("/login", siteController.login);
router.post("/login", siteController.loginAction);
router.get("/register", siteController.register);
router.get("/log-out", siteController.logOut);
router.post("/register", siteController.registerAction);
router.get("/", siteController.index);

module.exports = router;

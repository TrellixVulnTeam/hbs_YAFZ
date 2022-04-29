const router = require("express").Router();
const orderController = require("../controllers/OrderController");
router.post("/", orderController.add);
router.get("/", orderController.index);
module.exports = router;

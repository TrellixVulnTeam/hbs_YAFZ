// const express = require("express");
// const { route } = require("express/lib/router");
const router = require("express").Router();
// const router = express.Router();
const adminController = require("../controllers/AdminController");
const middlewareControl = require("../middleware/middleware");
//slider
router.get(
  "/view-slider",
  middlewareControl.verifyAdmin,
  adminController.viewSlider
);
router.get(
  "/add-slider",
  middlewareControl.verifyAdmin,
  adminController.addSlider
);
router.post(
  "/add-slider",
  middlewareControl.verifyAdmin,
  adminController.addSliderAction
);
router.get(
  "/edit-slider/:id",
  middlewareControl.verifyAdmin,
  adminController.editSlider
);
router.put(
  "/edit-slider/:id",
  middlewareControl.verifyAdmin,
  adminController.updateSlider
);
router.delete(
  "/delete-slider/:id",
  middlewareControl.verifyAdmin,
  adminController.deleteSlider
);

//cate
router.get(
  "/view-cate",
  middlewareControl.verifyAdmin,
  adminController.viewCate
);
router.get("/add-cate", middlewareControl.verifyAdmin, adminController.addCate);
router.post(
  "/add-cate",
  middlewareControl.verifyAdmin,
  adminController.addCateAction
);
router.get(
  "/edit-cate/:id",
  middlewareControl.verifyAdmin,
  adminController.editCate
);
router.delete(
  "/delete-cate/:id",
  middlewareControl.verifyAdmin,
  adminController.deleteCate
);
router.put(
  "/edit-cate/:id",
  middlewareControl.verifyAdmin,
  adminController.updateCate
);

// //product
router.get(
  "/edit-pro/:id",
  middlewareControl.verifyAdmin,
  adminController.editPro
);
router.put(
  "/edit-pro/:id",
  middlewareControl.verifyAdmin,
  adminController.update
);
router.delete(
  "/delete/:id",
  middlewareControl.verifyAdmin,
  adminController.deletePro
);
router.get("/view-pro", middlewareControl.verifyAdmin, adminController.viewPro);
router.get("/add-pro", middlewareControl.verifyAdmin, adminController.addPro);
router.post(
  "/add-pro",
  middlewareControl.verifyAdmin,
  adminController.addProduct
);
// order

router.get(
  "/manager",
  middlewareControl.verifyAdmin,
  adminController.viewOrder
);

//site
router.get("/logout", middlewareControl.verifyAdmin, adminController.logout);
router.get("/", adminController.index);
router.post("/", adminController.login);

module.exports = router;

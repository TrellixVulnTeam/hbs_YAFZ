const Product = require("../models/Product");
const Cate = require("../models/Cate");
const Slider = require("../models/Slider");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminController = {
  //product
  addPro: async (req, res) => {
    try {
      // console.log(req.cookies.isAdmin);
      res.render("admin/add-pro", {
        layout: "admin-layout.hbs",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addProduct: async (req, res) => {
    try {
      const pro = new Product({
        name: req.body.name.toUpperCase(),
        image: req.body.image,
        image2: req.body.image2,
        price: req.body.price,
        hot: req.body.hot,
        desc: req.body.desc,
        number: req.body.number,
        cate: req.body.cate,
      });
      const savePro = await pro.save();
      if (req.body.cate) {
        const cate = Cate.findById(req.body.cate);
        await cate.updateOne({ $push: { products: savePro._id } });
      }
      res.render("admin/add-pro", {
        layout: "admin-layout.hbs",
      });
      res.status(200).json(savePro);
    } catch (err) {
      console.log(err);
    }
  },
  viewPro: async (req, res) => {
    try {
      const productList = await Product.find();
      const products = productList.map((product) => product.toObject());
      res.render("admin/view-pro", {
        layout: "admin-layout",
        products,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deletePro: async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      const productList = await Product.find();
      const products = productList.map((product) => product.toObject());
      res.render("admin/view-pro", { layout: "admin-layout", products });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  editPro: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      res.render("admin/edit-product", {
        layout: "admin-layout",
        product: product.toObject(),
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const product = await Product.updateOne({ _id: req.params.id }, req.body);
      const productList = await Product.find();
      const products = productList.map((product) => product.toObject());
      res.render("admin/view-pro", {
        layout: "admin-layout",
        products,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //cate
  addCate: async (req, res) => {
    res.render("admin/add-cate", {
      layout: "admin-layout.hbs",
    });
  },
  addCateAction: async (req, res) => {
    try {
      const cate = await new Cate(req.body);
      const newCate = await cate.save();
      res.render("admin/add-cate");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  viewCate: async (req, res) => {
    try {
      const cateList = await Cate.find();
      const cates = cateList.map((cate) => cate.toObject());
      res.render("admin/view-cate", {
        layout: "admin-layout",
        cates,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editCate: async (req, res) => {
    try {
      const cate = await Cate.findById(req.params.id);
      res.render("admin/edit-cate", {
        layout: "admin-layout",
        cates: cate.toObject(),
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateCate: async (req, res) => {
    try {
      const cate = await Cate.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/admin/view-cate");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCate: async (req, res) => {
    try {
      const cate = await Cate.deleteOne({ _id: req.params.id });
      res.redirect("/admin/view-cate");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Slider
  viewSlider: async (req, res) => {
    try {
      const sliderList = await Slider.find();
      const slider = sliderList.map((slider) => slider.toObject());
      res.render("admin/view-slider.hbs", {
        layout: "admin-layout",
        slider,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addSlider: async (req, res) => {
    res.render("admin/add-slider.hbs", { layout: "admin-layout.hbs" });
  },
  addSliderAction: async (req, res) => {
    try {
      const slider = await new Slider(req.body);
      const newSlider = await slider.save();
      res.redirect("back");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editSlider: async (req, res) => {
    try {
      const slider = await Slider.findById(req.params.id);
      res.render("admin/edit-slider", {
        layout: "admin-layout",
        slider,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateSlider: async (req, res) => {
    try {
      const slider = await Slider.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/admin/view-slider");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteSlider: async (req, res) => {
    try {
      const slider = await Slider.deleteOne({ _id: req.params.id });
      res.redirect("/admin/view-slider");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //site

  index: (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("token");
    res.render("admin-login", { layout: "admin-layout" });
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      let wrongPassword = false;
      if (!user) {
        wrongPassword = true;
        res.render("admin-login.hbs", { layout: "admin-layout.hbs" });
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      const isAdmin = user.isAdmin;
      if (user && validPass && isAdmin) {
        const accessToken = jwt.sign(
          {
            // id: user.id,
            isAdmin: user.isAdmin,
          },
          "secret",
          {
            expiresIn: "2h",
          }
        );
        res.cookie("token", accessToken, {
          httpOnly: true,
          path: "/",
        });
        // res.cookie("token", accessToken);
        res.render("admin/welcome", { layout: "admin-layout" });
      } else {
        res.render("admin-login", { layout: "admin-layout" });
      }
    } catch (error) {
      // res.redirect("back");
      res.status(500).json(error.message);
    }
    // res.send("lgin");
  },
  logout: async (req, res) => {
    // res.clearCookie("userId");
    res.clearCookie("token");
    res.render("admin-login", { layout: "admin-layout" });
  },
  viewOrder: async (req, res) => {
    const order = await Order.find();
    // res.render("admin/view-order");
    const orders = order.map((item) => item.toObject());
    res.render("admin/view-order", {
      layout: "admin-layout",
      orders,
    });
  },
};

module.exports = AdminController;

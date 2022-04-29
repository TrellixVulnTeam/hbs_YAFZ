const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// var decoded = jwt.decode(token);
const Cate = require("../models/Cate");
const Product = require("../models/Product");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const SiteController = {
  search: async (req, res) => {
    try {
      const keywork = req.body.search;
      const newWord = keywork.toUpperCase();

      const condition = new RegExp(`${newWord}`, "");
      Product.find({ name: condition }).then((products) => {
        products = products.map((item) => item.toObject());
        res.render("search", {
          products,
          newWord,
          keywork,
        });
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getItem: (req, res, index) => {
    const i = req.headers.cookie.split(";")[index];
    const item = i.split("=")[1];
    return item;
  },
  index: async function (req, res) {
    try {
      const catesArr = await Cate.find();
      const cates = catesArr.map((item) => item.toObject());
      const productsList = await Product.find();
      const products = productsList.map((product) => product.toObject());
      const proHot = products.filter((product) => product.hot);
      if (req.headers.cookie?.split(";").length < 1) {
        res.status(404).json("error");
      }
      let token = "";
      if (req.headers.cookie?.split(";").length > 1) {
        token = SiteController.getItem(req, res, 1);
      }
      console.log(token);
      res.render("home", {
        cates,
        products,
        proHot,
        accessToken: token,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  login: async (req, res) => {
    const cate = await Cate.find();
    const cates = cate.map((item) => item.toObject());
    res.render("login", { cates });
  },
  loginAction: async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        res.status(404).json("wrong email");
      }
      const validEmail = await bcrypt.compare(req.body.password, user.password);
      const catesArr = await Cate.find();
      const cates = catesArr.map((item) => item.toObject());
      const productsList = await Product.find();
      const products = productsList.map((product) => product.toObject());
      const proHot = products.filter((product) => product.hot);

      if (user && validEmail) {
        const accessToken = jwt.sign({ id: user.id }, "secret", {
          expiresIn: "2h",
        });
        res.clearCookie("ugid");
        res.cookie("token", accessToken, {
          httpOnly: true,
          path: "/",
        });
        res.cookie("userId", user.id);
        res.render("home", {
          cates,
          products,
          proHot,
          accessToken,
        });
      } else {
        res.status(500).json("wrong pass");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  register: async (req, res) => {
    res.render("register");
  },
  logOut: async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("userId");
    res.clearCookie("connect.sid");
    const catesArr = await Cate.find();
    const cates = catesArr.map((item) => item.toObject());
    const productsList = await Product.find();
    const products = productsList.map((product) => product.toObject());
    const proHot = products.filter((product) => product.hot);
    res.render("home", {
      cates,
      products,
      proHot,
    });
    // res.redirect("back");
  },
  registerAction: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new Users({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
      });
      const user = await newUser.save();
      res.render("home");
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = SiteController;

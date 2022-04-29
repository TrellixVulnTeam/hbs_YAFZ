const Cate = require("../models/Cate");
const jwt = require("jsonwebtoken");
const middlewareControl = {
  verify: (req, res, next) => {
    const token = req.headers.cookie?.split(";")[1].split("=")[1];
    // console.log(token);
    if (token) {
      // const accessToken = token.split(" ")[1];
      jwt.verify(token, "secret", (err, user) => {
        if (err) {
          res.status(403).json("Token is invalid");
        }
        req.user = user;
        // console.log(user);
        next();
      });
    } else {
      // res.status(403).json("You're not authenticated");
      const catesArr = Cate.find();
      const cates = catesArr.map((item) => item.toObject());
      res.render("login", { cates });
    }
  },
  verifyIsAdmin: (req, res, next) => {
    middlewareControl.verify(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.render("admin-login", { layout: "admin-layout" });
      }
    });
  },
  verifyAdmin: (req, res, next) => {
    const token = req.headers.cookie?.split("=")[1];
    // console.log(token);
    if (token) {
      jwt.verify(token, "secret", (err, admin) => {
        if (err) {
          res.status(403).json("errdasd");
        }
        // console.log(req.admin);
        req.admin = admin;
        next();
      });
    } else {
      // res.status(403).json("err");
      res.render("admin-login", { layout: "admin-layout" });
    }
  },
};
module.exports = middlewareControl;

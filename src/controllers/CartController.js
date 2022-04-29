const Cate = require("../models/Cate");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Users = require("../models/User");
const CartController = {
  index: async (req, res) => {
    try {
      const user = req.headers.cookie.split(";")[1].split("=")[1];
      console.log(user);
      const cart = await Cart.find({
        userId: user,
      });

      const carts = cart.map((cart) => cart.toObject());
      const products = carts.map((item) => item.products);
      const subtotal = products.reduce(
        (total, item) => total + Number(item.subtotal),
        0
      );
      const cate = await Cate.find();
      const cates = await cate.map((item) => item.toObject());
      const token = req.headers.cookie.split(";")[1];
      res.render("cart", { products, subtotal, accessToken: token, cates });
      // res.json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const index = req.params.id.split("=")[1];
      const id = req.params.id.split("&")[0];
      const cartUpdate = await Cart.updateOne(
        { "products.productId": id },
        {
          $set: {
            "products.quantity": req.body.quantity[index],
            "products.subtotal":
              +req.body.quantity[index] * +req.body.price[index],
          },
        }
      );

      const user = req.headers.cookie.split(";")[1].split("=")[1];
      const cart = await Cart.find({ userId: user });
      const carts = cart.map((cart) => cart.toObject());
      const products = carts.map((item) => item.products);
      const token = req.headers.cookie?.split(";")[1];
      const cate = await Cate.find();
      const cates = await cate.map((item) => item.toObject());
      const subtotal = products.reduce(
        (total, item) => total + Number(item.subtotal),
        0
      );
      // res.json(carts);
      res.render("cart", { products, accessToken: token, subtotal, cates });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  test: async (req, res) => {
    // res.json()
    const cart = await Cart.findOne({ userId: req.params.id }).populate("User");
    res.json(cart);
  },
};
module.exports = CartController;

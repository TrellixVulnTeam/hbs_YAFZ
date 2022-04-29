const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Category = require("../models/Cate");
const User = require("../models/User");
const Product = require("../models/Product");
const OrderController = {
  add: async (req, res) => {
    try {
      const userId = req.headers.cookie?.split(";")[1].split("=")[1];
      const token = req.headers.cookie?.split(";")[0].split("=")[1];
      const cart = await Cart.find({ userId: userId });
      const name = [];
      const qty = [];
      const productsName = await cart.map((item) => {
        const pro = {
          productId: item.products.productId,
          quantity: item.products.quantity,
        };
        qty.push(item.products.quantity);
        name.push(pro);
      });
      // console.log(name);
      const item = await new Order({
        userId: userId,
        products: name,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        payment: req.body.payment,
        notes: req.body.notes,
      });
      const cate = await Category.find();
      const cates = cate.map((cate) => cate.toObject());
      const productsList = await Product.find();
      const products = productsList.map((product) => product.toObject());
      const proHot = products.filter((product) => product.hot);
      const order = await new Order(item);
      await order.save();
      // const productUpdate = await Product.find({
      //   _id: name.map((item) => item.productId),
      // });
      // const number = productUpdate.map((item) => item.number);
      // console.log(number);
      // const newNumber = number.map((item, i) => {
      //   return (item -= qty[i]);
      // });
      // const update = await Product.updateMany({
      //   _id: name.map((item) => item.productId),
      // },{ $set : {number : newNumber.map(item =>)}})
      // console.log(newNumber);
      res.render("home", {
        accessToken: token,
        cates,
        products,
        proHot,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  index: async (req, res) => {
    const token = req.headers.cookie?.split(";")[0].split("=")[1];
    const userId = req.headers.cookie?.split(";")[1].split("=")[1];
    const cate = await Category.find();
    const cates = await cate.map((cate) => cate.toObject());
    const user = await User.findById(userId);
    // console.log(user);
    const username = user.fullname;
    const phone = user.phone;
    res.render("order", {
      cates,
      accessToken: token,
      username,
      phone,
    });
  },
};

module.exports = OrderController;

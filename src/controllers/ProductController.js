const Product = require("../models/Product");
const Cate = require("../models/Cate");
const Cart = require("../models/Cart");
const ProductController = {
  index: async (req, res) => {
    res.render("product-detail");
  },
  detail: async (req, res) => {
    try {
      const cateList = await Cate.find();
      const cates = cateList.map((cate) => cate.toObject());
      const productItem = await Product.findOne({ slug: req.params.slug });
      const product = productItem.toObject();
      const cate = product.cate;

      const productRelated = await Product.find({ cate: cate });
      const proRelated = productRelated.map((product) => product.toObject());
      const token = req.headers.cookie?.split(";")[0];
      res.render("product-detail", {
        product,
        cates,
        proRelated,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  cart: async (req, res) => {
    try {
      const userId = req.headers.cookie?.split(";")[1].split("=")[1];
      // console.log({ req });
      if (!userId) {
        res.redirect("/login");
      } else {
        const item = await new Cart({
          userId: userId,
          products: {
            productId: req.body.productId,
            name: req.body.name,
            quantity: req.body.number,
            image: req.body.image,
            price: req.body.price,
            subtotal: +req.body.price * +req.body.number,
            slug: req.body.slug,
          },
        });
        const qty = req.body.number;
        const carts = await Cart.find({ userId: userId });
        const id = carts.map((item) => item.products.productId);
        const exist = id.includes(req.body.productId);
        // console.log(carts);
        if (exist) {
          const cartFound = await Cart.findOne({
            "products.productId": req.body.productId,
          });
          const qty = cartFound.products.quantity;
          // console.log(typeof req.body.number);
          const price = cartFound.products.price;
          const newQty = qty + Number(req.body.number);
          const newTotal = newQty * Number(price);
          const test = await Cart.updateOne(
            {
              "products.productId": req.body.productId,
            },
            {
              $set: {
                "products.quantity": newQty,
                "products.subtotal": newTotal,
              },
            }
          );
        } else {
          const cart = await new Cart(item);
          const newCart = await cart.save();
        }
        await Product.updateOne(
          { _id: req.body.productId },
          { $inc: { number: -req.body.number } }
        );
        res.redirect("back");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

module.exports = ProductController;

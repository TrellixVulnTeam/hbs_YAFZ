const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      productId: {
        type: String,
      },
      name: { type: String, required: true },
      quantity: {
        type: Number,
        default: 1,
      },
      slug: { type: String },
      price: {
        type: String,
      },
      image: {
        type: String,
      },
      subtotal: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);

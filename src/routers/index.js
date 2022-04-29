const siteRouter = require("./site");
const productRouter = require("./product");
const adminRouter = require("./admin");
const cartRouter = require("./cart");
const orderRouter = require("./order");
function route(app) {
  app.use("/order", orderRouter);
  app.use("/cart", cartRouter);
  app.use("/product", productRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
}
module.exports = route;

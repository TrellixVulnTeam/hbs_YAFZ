const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const port = 3000;
const path = require("path");
const route = require("./routers");
// const session = require("express-session");
const numberal = require("numeral");
const app = express();
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
const methodOverride = require("method-override");
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "resources/public")));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      check: () => {
        const user = document.cookie;
        if (!user) {
          return false;
        }
        return true;
      },
      inc: (value) => {
        return +parseInt(value);
      },
      numberalPrice: (value) => {
        return numberal(value).format(0, 0);
      },
    },
  })
);
// app.locals.indexx = 0;
app.use(methodOverride("_method"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
db.connect();

app.set("trust proxy", 1); // trust first proxy

route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

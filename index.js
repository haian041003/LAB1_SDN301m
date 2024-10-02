const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const authMiddleware = require("./middleware/auth.middleware");

dotenv.config();

//CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/category", authMiddleware, categoryRoute);
app.use("/v1/product", authMiddleware, productRoute);
app.use("/v1/auth", authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

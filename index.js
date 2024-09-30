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
const { Account } = require("./model/model");

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
app.use("/v1/category", categoryRoute);
app.use("/v1/product", productRoute);
app.use("/v1/auth", authRoute);

const createAdminAccount = async () => {
  const adminExists = await Account.findOne({ userName: "admin" });
  if (!adminExists) {
    const admin = new Account({ userName: "admin", password: "123456" });
    await admin.save();
    console.log("Admin account created");
  }
};

createAdminAccount();

app.listen(3000, () => {
  console.log("Server is running...");
});

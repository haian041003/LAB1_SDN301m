const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
//const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");

dotenv.config();
//CONNECT DATABASE
mongoose.connect((process.env.MONGODB_URL)).then(() => 
    console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:",error));


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/category", categoryRoute);
app.use("/v1/product", productRoute);

app.listen(3000, () => {
    console.log("Server is running...");
});
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const accountSchema = new mongoose.Schema({
  userName: { type: String, required: true ,unique: true },
  password: { type: String, required: true },
});

let Product = mongoose.model("Product", productSchema);
let Category = mongoose.model("Category", categorySchema);
let Account = mongoose.model("Account", accountSchema);

module.exports = { Product, Category, Account };

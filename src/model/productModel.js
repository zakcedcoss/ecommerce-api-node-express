const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "product title is missing"],
  },
  description: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "product description is missing"],
  },
  price: {
    type: Number,
    required: [true, "product price is missing"],
  },
  category: {
    type: [String],
    lowercase: true,
    trim: true,
    enum: [
      "mobiles",
      "gaming",
      "electronics",
      "clothing",
      "food",
      "breverages",
    ],
    required: [true, "product category is missing"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "product rating is missing"],
  },
});

module.exports = mongoose.model("products", productsSchema);

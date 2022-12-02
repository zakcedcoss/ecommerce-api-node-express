const expressAsyncHandler = require("express-async-handler");
const Products = require("../model/productModel");

// public routes
const getAllProducts = expressAsyncHandler(async (req, res) => {
  const { sort, currentPage, productsPerPage } = req.query;
  let sortObject = {};

  if (!currentPage) {
    throw new Error(`"currentPage" query is missing`);
  }
  if (!productsPerPage) {
    throw new Error(`"productsPerPage" query is missing`);
  }

  if (sort) {
    const sortValue = sort.split("-");
    sortObject = { [sortValue[0]]: sortValue[1] };
  }

  const products = await Products.find({})
    .sort(sortObject)
    .skip(productsPerPage * (currentPage - 1))
    .limit(productsPerPage);

  if (!products) {
    throw new Error("Unable to fetch products");
  }

  res.status(200).json({ currentPage, count: products.length, data: products });
});

const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("product ID is missing");
  }
  const singleProduct = await Products.findById(id);
  res.json(singleProduct);
});

const getAllCategories = (req, res) => {
  res.json({ categories: ["mobiles", "gaming", "electronics"] });
};

const getAllProductsByCategory = expressAsyncHandler(async (req, res) => {
  const { type } = req.query;
  if (type) {
    const productsByCategory = await Products.find({ category: type });

    if (!productsByCategory) {
      throw new Error("An Error Occurred ! Unable to fetch products !");
    }

    res
      .status(200)
      .json({ data: productsByCategory, count: productsByCategory.length });
  } else {
    throw new Error(`'type' query is missing`);
  }
});

// private routes
const addProduct = expressAsyncHandler(async (req, res) => {
  const { username, email } = req.user;
  if (username !== "admin" || !email.includes("goat.me")) {
    throw new Error("Only admin have access to this route");
  }
  const product = req.body;
  if (!product) {
    throw new Error("Please provide product details");
  }

  const newProduct = {
    ...product,
    category: product.category.split(",").map((item) => {
      return item.trim().toLowerCase();
    }),
  };

  await Products.create(newProduct);
  res.status(200).json({ data: newProduct });
});

const deleteSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Products.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new Error("product not found");
  }
  res.status(200).json("product deleted");
});

const updateSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Products.findByIdAndUpdate(id, req.body);

  if (!updatedProduct) {
    throw new Error("product not found");
  }

  res.status(200).json({ message: `product details updated` });
});

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  getAllCategories,
  getAllProductsByCategory,
  deleteSingleProduct,
  updateSingleProduct,
};

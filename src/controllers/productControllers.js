const expressAsyncHandler = require("express-async-handler");
const Products = require("../model/productModel");

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

const getSingleProduct = (req, res) => {
  const { id } = req.params;
  if (id) {
    res.json({ msg: `Product with id ${id}` });
  }
};

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

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  getAllCategories,
  getAllProductsByCategory,
};

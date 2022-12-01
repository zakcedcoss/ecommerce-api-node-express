const router = require("express").Router();
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  getAllCategories,
  getAllProductsByCategory,
} = require("../controllers/productControllers");

router.route("/").get(getAllProducts).post(addProduct);
router.route("/categories").get(getAllCategories);
router.route("/category").get(getAllProductsByCategory);
router.route("/:id").get(getSingleProduct);

module.exports = router;

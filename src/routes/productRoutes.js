const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  getAllCategories,
  getAllProductsByCategory,
} = require("../controllers/productControllers");

router.route("/").get(getAllProducts).post(protect, addProduct);
router.route("/categories").get(getAllCategories);
router.route("/category").get(getAllProductsByCategory);
router.route("/:id").get(getSingleProduct);

module.exports = router;

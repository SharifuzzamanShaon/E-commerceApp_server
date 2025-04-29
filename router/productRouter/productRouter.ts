import { Router } from "express";
import { getAllProducts, createProduct, getNewArrivals, getProductByCategory } from "../../controller/productController/productController";
import { runValidation } from "../../middleware/validation";
import { schema } from "../../middleware/validation/schema";
import { addSubcategoy, createCategory, getAllCategories } from "../../controller/categoryController/categoryController";
const router = Router();

router.get("/", getAllProducts);
router.get("/product-by-category/:categoryId", getProductByCategory);
router.post("/", runValidation(schema.product),  createProduct);
router.post("/create-category", runValidation(schema.category),  createCategory);
router.post("/create-sub-category", runValidation(schema.subCategory),  addSubcategoy);
router.get("/all-categories", getAllCategories);
router.get("/new-arrivals", getNewArrivals);
export default router;
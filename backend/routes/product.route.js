import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct, findProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", getProducts);
router.put("/:id", updateProduct);
router.get("/:id", findProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
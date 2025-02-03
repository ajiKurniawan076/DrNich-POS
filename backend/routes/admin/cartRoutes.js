import express from "express";
import {
  addToCart,
  getCart,
  clearCart,
} from "../../controller/admin/cartController.js";

const router = express.Router();

router.post("/addCart", addToCart);
router.get("/getCart", getCart);
router.delete("/clearCart", clearCart);

export default router;

import express from "express";
import {
  newpaketLayanan,
  getpaketLayanan,
  updatepaketLayanan,
  deletepaketLayanan,
  getpaketLayananById,
} from "../../controller/admin/paketLayananController.js";

import { upload } from "../../middleware/uploadMiddleware.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();
router.post(
  "/tambahpaketLayanan",
  upload.single("image"),
  protect([1, 4]),
  newpaketLayanan
);
router.get("/getAllpaketLayanan", getpaketLayanan);
router.get("/getpaketLayananById/:id", getpaketLayananById);
router.put(
  "/updatepaketLayanan/:id",
  upload.single("image"),
  protect([1, 4]),
  updatepaketLayanan
);
router.delete("/deletepaketLayanan/:id", deletepaketLayanan);

export default router;

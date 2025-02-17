import express from "express";
import {
  newJenisLayanan,
  getJenisLayanan,
  newLayanan,
  getLayanan,
  getLayananById,
  getJenisLayananById,
  getLayananByJenisLayanan,
  updateLayanan,
  updateJenisLayanan,
  deleteLayanan,
  deleteJenisLayanan,
} from "../../controller/admin/layananController.js";

import { upload } from "../../middleware/uploadMiddleware.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/tambahJenisLayanan",
  upload.single("foto"),
  protect([1, 4]),
  newJenisLayanan
);
router.get("/getAllJenisLayanan", getJenisLayanan);
router.post(
  "/tambahLayanan",
  upload.single("image"),
  protect([1, 4]),
  newLayanan
);
router.get("/getAllLayanan", getLayanan);
router.get("/getLayananById/:id", getLayananById);
router.get("/getJenisLayananById/:id", getJenisLayananById);
router.get("/getLayananByJenisLayanan/:id", getLayananByJenisLayanan);
router.put(
  "/updateLayanan/:id",
  upload.single("image"),
  protect([1, 4]),
  updateLayanan
);
router.put(
  "/updateJenisLayanan/:id",
  upload.single("foto"),
  protect([1, 4]),
  updateJenisLayanan
);
router.delete("/deleteLayanan/:id", deleteLayanan);
router.delete("/deleteJenisLayanan/:id", deleteJenisLayanan);

export default router;

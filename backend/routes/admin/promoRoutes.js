import express from "express";
import {
  newPromo,
  getPromo,
  updatePromo,
  deletePromo,
  getPromoById,
} from "../../controller/admin/promoController.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/tambahpromo", upload.fields([
  { name: "fotoDesktop", maxCount: 1 },
  { name: "fotoMobile", maxCount: 1 },
]), newPromo);
router.get("/getAllpromo", getPromo);
router.get("/getPromoById/:id", getPromoById);
router.put("/updatepromo/:id", upload.fields([
  { name: "fotoDesktop", maxCount: 1 },
  { name: "fotoMobile", maxCount: 1 },
]), updatePromo);
router.delete("/deletepromo/:id", deletePromo);

export default router;

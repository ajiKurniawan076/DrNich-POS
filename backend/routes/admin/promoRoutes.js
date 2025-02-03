import express from "express";
import {
  newPromo,
  getPromo,
  updatePromo,
  deletePromo,
  getPromoById,
} from "../../controller/admin/promoController.js";

const router = express.Router();
router.post("/tambahpromo", newPromo);
router.get("/getAllpromo", getPromo);
router.get("/getPromoById/:id", getPromoById);
router.put("/updatepromo/:id", updatePromo);
router.delete("/deletepromo/:id", deletePromo);

export default router;

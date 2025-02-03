import express from "express";
import {
  newPromo,
  getPromo,
  updatePromo,
  deletePromo,
  getPromoByID,
} from "../../controller/promoPos/promoPosController.js";
import {
  getPromoDetail,
  newPromoDetail,
  updatePromoDetail,
  deletePromoDetail,
} from "../../controller/promoPos/promoPosDetailController.js";

const router = express.Router();

router.get("/promo", getPromo);
router.get("/promo/:id", getPromoByID);
router.post("/promo", newPromo);
router.put("/updatepromoPos/:id", updatePromo);
router.delete("/deletepromoPos/:id", deletePromo);

router.get("/promoDetail", getPromoDetail);
router.post("/promoDetail", newPromoDetail);
router.put("/updatepromoDetailPos/:id", updatePromoDetail);
router.delete("/deletepromoDetailPos/:id", deletePromoDetail);

export default router;

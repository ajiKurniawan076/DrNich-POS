import express from "express";
import {
  newGaleri,
  getGaleri,
  editGaleri,
  deleteGaleri,
} from "../../controller/admin/galeriController.js";

const router = express.Router();

router.post("/createGaleri", newGaleri);
router.get("/getAllGaleri", getGaleri);
router.put("/editGaleri/:id", editGaleri);
router.delete("/deleteGaleri/:id", deleteGaleri);

export default router;

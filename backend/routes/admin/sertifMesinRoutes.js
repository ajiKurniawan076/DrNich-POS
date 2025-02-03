import express from "express";
import {
  newSertif,
  deleteSertif,
  editSertif,
  getSertif,
  newMesin,
  deleteMesin,
  editMesin,
  getMesin,
  getSertifbyID,
} from "../../controller/admin/fotoController.js";

const router = express.Router();

router.post("/createSertif", newSertif);
router.get("/getAllSertif", getSertif);
router.put("/editSertif/:id", editSertif);
router.delete("/deleteSertif/:id", deleteSertif);
router.get("/getSertifbyId/:id");

router.post("/createMesin", newMesin);
router.get("/getAllMesin", getMesin);
router.put("/editMesin/:id", editMesin);
router.delete("/deleteMesin/:id", deleteMesin);

export default router;

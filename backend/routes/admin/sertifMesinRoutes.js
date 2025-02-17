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
import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/createSertif", upload.single("foto"), newSertif);
router.get("/getAllSertif", getSertif);
router.put("/editSertif/:id", upload.single("foto"), editSertif);
router.delete("/deleteSertif/:id", deleteSertif);
router.get("/getSertifbyId/:id");

router.post("/createMesin", upload.single("foto"), newMesin);
router.get("/getAllMesin", getMesin);
router.put("/editMesin/:id", upload.single("foto"), editMesin);
router.delete("/deleteMesin/:id", deleteMesin);

export default router;

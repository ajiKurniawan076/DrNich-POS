import express from "express";
import {
  newulasan,
  getulasan,
  updateulasan,
  deleteulasan,
} from "../../controller/admin/ulasanController.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/tambahulasan", upload.single("image"), newulasan);
router.get("/getAllulasan", getulasan);
router.put("/updateulasan/:id", upload.single("image"), updateulasan);
router.delete("/deleteulasan/:id", deleteulasan);

export default router;

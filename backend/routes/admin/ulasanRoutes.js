import express from "express";
import {
  newulasan,
  getulasan,
  updateulasan,
  deleteulasan,
} from "../../controller/admin/ulasanController.js";

const router = express.Router();
router.post("/tambahulasan", newulasan);
router.get("/getAllulasan", getulasan);
router.put("/updateulasan/:id", updateulasan);
router.delete("/deleteulasan/:id", deleteulasan);

export default router;

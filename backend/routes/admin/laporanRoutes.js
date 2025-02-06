import express from "express";
import {
  laporanPenjualan,
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)

export default router;

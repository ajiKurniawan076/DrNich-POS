import express from "express";
import {
  laporanPenjualan,
  laporanBelanja
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanBelanja", laporanBelanja)

export default router;

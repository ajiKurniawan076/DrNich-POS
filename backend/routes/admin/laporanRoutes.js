import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanBelanja", laporanBelanja)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)

export default router;

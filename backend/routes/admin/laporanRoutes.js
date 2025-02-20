import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris,
  laporanGrafik
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)
router.post("/laporanBelanja", laporanBelanja)
router.post("/laporanGrafik", laporanGrafik)
router.get("/laporanPersediaan/:id", laporanPersediaan)
router.get("/laporanLimit/", laporanLimit)
router.get("/laporanTerlaris/", laporanTerlaris)

export default router;

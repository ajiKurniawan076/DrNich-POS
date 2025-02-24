import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris,
  laporanGrafik,
<<<<<<< HEAD
=======
  laporanGrafikProduk,
  laporanLogProduk
>>>>>>> 8431e39dd4a2641121b0c99970dcc63906e90161
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/laporanpenjualan", laporanPenjualan);
router.post("/laporanPenjualanProduk", laporanPenjualanProduk);
router.post("/laporanBelanja", laporanBelanja);
router.post("/laporanGrafik", laporanGrafik);
router.get("/laporanPersediaan/:id", laporanPersediaan);
router.get("/laporanLimit/", laporanLimit);
router.get("/laporanTerlaris/", laporanTerlaris);
=======
router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)
router.post("/laporanBelanja", laporanBelanja)
router.post("/laporanGrafik", laporanGrafik)
router.post("/laporanGrafikProduk", laporanGrafikProduk)
router.get("/laporanPersediaan/:id", laporanPersediaan)
router.get("/laporanLimit/", laporanLimit)
router.get("/laporanTerlaris", laporanTerlaris)
router.post("/laporanLogProduk", laporanLogProduk)
>>>>>>> 8431e39dd4a2641121b0c99970dcc63906e90161

export default router;

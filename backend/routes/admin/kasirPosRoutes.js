import express from "express";
import {
  newTransaksi,
  getTransaksi,
  getTransaksiDraft,
  updateTransaksi,
  deleteTransaksi,
  getTransaksiInvoice,
  kalkulasiHarga,
  getTransaksiByID
} from "../../controller/kasirPos/transaksiController.js";
import {
  newDetailTransaksi,
  getDetailTransaksi,
  updateDetailTransaksi,
  deleteDetailTransaksi,
} from "../../controller/kasirPos/detailTransaksiController.js";

const router = express.Router();

router.get("/transaksi", getTransaksi); 
router.get("/transaksi/:id", getTransaksiByID); 
router.get("/draftTransaksi", getTransaksiDraft);
router.get("/transaksiinvoice", getTransaksiInvoice);
router.post("/transaksi", newTransaksi);
router.post("/kalkulasiharga", kalkulasiHarga);
router.put("/updatetransaksi/:id", updateTransaksi);
router.delete("/deletetransaksi/:id", deleteTransaksi);

router.get("/detailTransaksi", getDetailTransaksi);
router.post("/detailTransaksi", newDetailTransaksi);
router.put("/updatedetailTransaksi/:id", updateDetailTransaksi);
router.delete("/deletedetailTransaksi/:id", deleteDetailTransaksi);

export default router;

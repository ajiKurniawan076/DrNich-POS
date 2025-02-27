import express from "express";
import {
  newjenisProdukPos,
  getjenisProdukPos,
  updatejenisProdukPos,
  deletejenisProdukPos,
  getjenisProdukPosbyID,
} from "../../controller/ProdukPos/jenisProdukPosController.js";
import {
  newkategoriProdukPos,
  getkategoriProdukPos,
  updatekategoriProdukPos,
  deletekategoriProdukPos,
  getkategoriProdukPosbyID,
} from "../../controller/ProdukPos/kategoriProdukPosController.js";
import {
  newproduk,
  getproduk,
  getprodukbyID,
  updateproduk,
  deleteproduk,
} from "../../controller/ProdukPos/produkPosController.js";
import {
  newBelanja,
  getBelanja,
  getBelanjaByID,
  updateBelanja,
  deleteBelanja,
  getBelanjaInvoice
} from "../../controller/ProdukPos/belanjaPosController.js";
import {
  newDetailBelanja,
  getDetailBelanja,
  getDetailBelanjaByID,
  updateDetailBelanja,
  deleteDetailBelanja,
} from "../../controller/ProdukPos/detailBelanjaPosController.js";
import {
  newkurangStok,
  getkurangStok,
  getkurangStokByID,
  updatekurangStok,
  deletekurangStok,
} from "../../controller/ProdukPos/kurangStokController.js";

const router = express.Router();

router.get("/jenisProduk", getjenisProdukPos);
router.get("/jenisProduk/:id", getjenisProdukPosbyID);
router.post("/jenisProduk", protect([1,2]), newjenisProdukPos);
router.put("/updatejenisProdukPos/:id", protect([1,2]), updatejenisProdukPos);
router.delete("/deletejenisProdukPos/:id", deletejenisProdukPos);

router.get("/kategoriProduk", getkategoriProdukPos);
router.get("/kategoriProduk/:id", getkategoriProdukPosbyID);
router.post("/kategoriProduk", protect([1,2]), newkategoriProdukPos);
router.put("/updatekategoriProdukPos/:id", protect([1,2]), updatekategoriProdukPos);
router.delete("/deletekategoriProdukPos/:id", deletekategoriProdukPos);

router.get("/produk", getproduk);
router.get("/produk/:id", getprodukbyID);
router.post("/produk", protect([1,2]), newproduk);
router.put("/updateproduk/:id", protect([1,2]), updateproduk);
router.delete("/deleteproduk/:id", deleteproduk);

router.get("/belanjaPos", getBelanja);
router.get("/getInvoiceBelanja", getBelanjaInvoice);
router.get("/belanjaPos/:id", getBelanjaByID);
router.post("/belanjaPos", protect([1,2]), newBelanja);
router.put("/updatebelanjaPos/:id", protect([1,2]), updateBelanja);
router.delete("/deletebelanjaPos/:id", deleteBelanja);

router.get("/detailBelanjaPos", getDetailBelanja);
router.get("/detailBelanjaPos/:id", getDetailBelanjaByID);
router.post("/detailBelanjaPos", newDetailBelanja);
router.put("/updatedetailBelanjaPos/:id", updateDetailBelanja);
router.delete("/deletedetailBelanjaPos/:id", deleteDetailBelanja);

router.get("/kurangStokPos", getkurangStok);
router.get("/kurangStokPos/:id", getkurangStokByID);
router.post("/kurangStokPos", protect([1,2]), newkurangStok);
router.put("/updatekurangStokPos/:id", protect([1,2]), updatekurangStok);
router.delete("/deletekurangStokPos/:id", deletekurangStok);

export default router;

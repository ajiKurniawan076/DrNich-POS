import express from "express";
import {
  newproduk,
  getproduk,
  updateproduk,
  deleteproduk,
  getprodukbyID,
  newImage,
  getImage,
  updateImage,
  deleteImage,
  getprodukbycategory,
} from "../../controller/admin/produkController.js";
import {
  newCategoryProduct,
  getCategoryProduct,
  deleteCategoryProduct,
  editCategoryProduct,
  newProductType,
  getProductType,
  editProductType,
  deleteProductType,
  getProdukTipeById,
  getCategoryById,
} from "../../controller/admin/jenisKategoriProdukController.js";

import {
  newtipeKulit,
  gettipeKulit,
  updatetipeKulit,
  deletetipeKulit,
  gettipeKulitById,
} from "../../controller/admin/tipeKulitController.js";
import { protect } from "../../middleware/authMiddleware.js";
import { upload } from "../../middleware/uploadMiddleware.js";
const router = express.Router();

//CAROUSEL PRODUCT
router.post("/newImage", upload.single("image"), protect([1, 4]), newImage);
router.get("/getImage", getImage);
router.put(
  "/updateImage/:id",
  upload.single("image"),
  protect([1, 4]),
  updateImage
);
router.delete("/deleteImage/:id", protect([1, 4]), deleteImage);

//PRODUCT
router.post("/tambahproduk", upload.single("foto"), protect([1, 4]), newproduk);
router.get("/getAllProduk", getproduk);
router.put(
  "/updateproduk/:id",
  upload.single("foto"),
  protect([1, 4]),
  updateproduk
);
router.delete("/deleteproduk/:id", protect([1, 4]), deleteproduk);
router.get("/getprodukbyId/:id", getprodukbyID);
router.get("/getProductByCategory/:id", getprodukbycategory);

//PRODUCT CATEGORY
router.post(
  "/tambahkategoriProduk",
  upload.single("image"),
  protect([1, 4]),
  newCategoryProduct
);
router.get("/getAllkategoriProduk", getCategoryProduct);
router.delete(
  "/deletekategoriProduk/:id",
  protect([1, 4]),
  deleteCategoryProduct
);
router.put(
  "/editkategoriProduk/:id",
  upload.single("image"),
  protect([1, 4]),
  editCategoryProduct
);
router.get("/getCategoryById/:id", getCategoryById);

//PRODUCT TYPE
router.post("/tambahproductType", protect([1, 4]), newProductType);
router.get("/getAllproductType", getProductType);
router.put("/editproductType/:id", protect([1, 4]), editProductType);
router.delete("/deleteproductType/:id", protect([1, 4]), deleteProductType);
router.get("/getProdukTipeById/:id", getProdukTipeById);

//TIPE KULIT
router.post("/createtipeKulit", protect([1, 4]), newtipeKulit);
router.get("/getAlltipeKulit", gettipeKulit);
router.put("/edittipeKulit/:id", protect([1, 4]), updatetipeKulit);
router.delete("/deletetipeKulit/:id", protect([1, 4]), deletetipeKulit);
router.get("/gettipeKulitById/:id", gettipeKulitById);

export default router;

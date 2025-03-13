import asyncHandler from "express-async-handler";
import promoModels from "../../models/promo/promo.js";

const BASE_URL = "https://api.drnich.co.id/uploads/";
const newPromo = asyncHandler(async (req, res) => {
  const fotoDesktop = req.files.fotoDesktop ? req.files.fotoDesktop[0] : null;
  const fotoMobile = req.files.fotoMobile ? req.files.fotoMobile[0] : null;
  const newPromo = {
    nama: req.body.nama,
    detail: req.body.detail,
    syarat: req.body.syarat
  };
  if (fotoDesktop){newPromo.fotoDesktop = `${BASE_URL}${fotoDesktop.filename}`}
  if (fotoMobile){newPromo.fotoMobile= `${BASE_URL}${fotoMobile.filename}`}
  try {
    const isExist = await promoModels.findOne({ nama: newPromo.nama });
    if (isExist) {
      throw new Error("Promo Sudah Ada");
    }
    const promo = await promoModels.create(newPromo);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromo = asyncHandler(async (req, res) => {
  try {
    const promo = await promoModels.find();
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await promoModels.findById(id);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fotoDesktop = req.files.fotoDesktop ? req.files.fotoDesktop[0] : null;
  const fotoMobile = req.files.fotoMobile ? req.files.fotoMobile[0] : null;
 const newData = {
   nama: req.body.nama,
   detail: req.body.detail,
   syarat: req.body.syarat
 };
 if (fotoDesktop){newPromo.fotoDesktop = `${BASE_URL}${fotoDesktop.filename}`}
 if (fotoMobile){newPromo.fotoMobile= `${BASE_URL}${fotoMobile.filename}`}
  try {
    const promo = await promoModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await promoModels.findByIdAndDelete(id);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newPromo, getPromo, updatePromo, deletePromo, getPromoById };

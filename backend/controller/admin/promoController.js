import asyncHandler from "express-async-handler";
import promoModels from "../../models/promo/promo.js";

const newPromo = asyncHandler(async (req, res) => {
  const newPromo = {
    nama: req.body.nama,
    detail: req.body.detail,
    syarat: req.body.syarat,
    foto: req.body.foto,
  };
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
  const newData = {
    nama: req.body.nama,
    detail: req.body.detail,
    syarat: req.body.syarat,
    foto: req.body.foto,
  };
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

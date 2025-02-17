import asyncHandler from "express-async-handler";
import paketLayananModels from "../../models/layanan/paketLayanan.js";

const newpaketLayanan = asyncHandler(async (req, res) => {
  const newpaketLayanan = {
    nama: req.body.nama,
    durasi: req.body.durasi,
    harga: req.body.harga,
    deskripsi: req.body.deskripsi,
    listTreatment: req.body.listTreatment,
    image : req.body.image,
    manfaat : req.body.manfaat,
  };
  try {
    const isExist = await paketLayananModels.findOne({ nama: newpaketLayanan.nama });
    if (isExist) {
      throw new Error("paketLayanan Sudah Ada");
    }
    const paketLayanan = await paketLayananModels.create(newpaketLayanan);
    res.send(paketLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getpaketLayanan = asyncHandler(async (req, res) => {
  try {
    const paketLayanan = await paketLayananModels.find();
    res.send(paketLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getpaketLayananById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const paketLayanan = await paketLayananModels.findById(id);
    res.send(paketLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatepaketLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    durasi: req.body.durasi,
    harga: req.body.harga,
    deskripsi: req.body.deskripsi,
    listTreatment: req.body.listTreatment,
    image : req.body.image,
    manfaat : req.body.manfaat,
  };
  try {
    const paketLayanan = await paketLayananModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(paketLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletepaketLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const paketLayanan = await paketLayananModels.findByIdAndDelete(id);
    res.send(paketLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newpaketLayanan, getpaketLayanan, updatepaketLayanan, deletepaketLayanan, getpaketLayananById };

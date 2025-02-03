import asyncHandler from "express-async-handler";
import JenisLayanan from "../../models/layanan/jenisLayanan.js";
import layananModels from "../../models/layanan/layanan.js";

const newJenisLayanan = asyncHandler(async (req, res) => {
  const { nama, foto, deskripsi } = req.body; // Destructure the request body
  try {
    const isExist = await JenisLayanan.findOne({ nama });
    if (isExist) {
      throw new Error("Jenis Layanan Sudah Ada");
    }
    const jenisLayanan = await JenisLayanan.create({ nama, foto, deskripsi });
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getJenisLayanan = asyncHandler(async (req, res) => {
  try {
    const jenisLayanan = await JenisLayanan.find();
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteJenisLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisLayanan = await JenisLayanan.findByIdAndDelete(id);
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLayananById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const layanan = await layananModels.findById(id);
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getJenisLayananById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisLayanan = await JenisLayanan.findById(id);
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateJenisLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    foto: req.body.foto,
    deskripsi: req.body.deskripsi,
  };
  try {
    const jenisLayanan = await JenisLayanan.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const newLayanan = asyncHandler(async (req, res) => {
  const newLayanan = {
    nama: req.body.nama,
    durasi: req.body.durasi,
    harga: req.body.harga,
    deskripsi: req.body.deskripsi,
    image: req.body.image,
    cardDeskripsi: req.body.cardDeskripsi,
    idJenis: req.body.idJenis,
  };
  try {
    const isExist = await layananModels.findOne({ nama: newLayanan.nama });
    if (isExist) {
      throw new Error("Layanan Sudah Ada");
    }
    const layanan = await layananModels.create(newLayanan);
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLayanan = asyncHandler(async (req, res) => {
  try {
    const layanan = await layananModels.find().populate("idJenis");
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    jenisLayanan: req.body.jenisLayanan,
    nama: req.body.nama,
    harga: req.body.harga,
    foto: req.body.foto,
    deskripsi: req.body.deskripsi,
    durasi: req.body.durasi,
    cardDeskripsi: req.body.cardDeskripsi,
  };
  try {
    const layanan = await layananModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteJenis = await layananModels.findByIdAndDelete(id);
    const deleteLayanan = await JenisLayanan.findByIdAndDelete(
      deleteJenis.idJenis
    );
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLayananByJenisLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const layanan = await layananModels.find({ idJenis: id });
    if (!layanan) {
      throw new Error("Layanan Tidak Ditemukan");
    }
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  newJenisLayanan,
  getJenisLayanan,
  newLayanan,
  getLayanan,
  getLayananById,
  getJenisLayananById,
  getLayananByJenisLayanan,
  updateLayanan,
  updateJenisLayanan,
  deleteLayanan,
  deleteJenisLayanan,
};

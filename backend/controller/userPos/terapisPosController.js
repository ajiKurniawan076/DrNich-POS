import asyncHandler from "express-async-handler";
import terapisPosModels from "../../models/User/terapisPos.js";
const newterapis = asyncHandler(async (req, res) => {
  const newterapis = {
    namaTerapis: req.body.namaTerapis,
    nomorTelepon: req.body.nomorTelepon,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan,
    namaRekening: req.body.namaRekening,
    nomorRekening: req.body.nomorRekening,
    bank: req.body.bank,
    keteranganRek: req.body.keteranganRek,
    image : req.file ? req.file.path : 'No Image'
  };
  try {
    const isExist = await terapisPosModels.findOne({ nomorTelepon: newterapis.nomorTelepon });
    if (isExist) {
      throw new Error("terapis Sudah Ada");
    }
    const terapis = await terapisPosModels.create(newterapis);
    res.send(terapis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getterapis = asyncHandler(async (req, res) => {
  try {
    const terapis = await terapisPosModels
      .find().sort({ createdAt: -1 })

    res.send(terapis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateterapis = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    namaTerapis: req.body.namaTerapis,
    nomorTelepon: req.body.nomorTelepon,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan,
    namaRekening: req.body.namaRekening,
    nomorRekening: req.body.nomorRekening,
    bank: req.body.bank,
    keteranganRek: req.body.keteranganRek,
    image : req.file ? req.file.path : 'No Image'
  };
  try {
    const terapis = await terapisPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(terapis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteterapis = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const terapis = await terapisPosModels.findByIdAndDelete(id);
    res.send(terapis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getterapisbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const terapis = await terapisPosModels
      .findById(id)

    if (!terapis) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(terapis);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newterapis, getterapis, updateterapis, deleteterapis, getterapisbyID };

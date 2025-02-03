import asyncHandler from "express-async-handler";
import supplierPosModels from "../../models/User/supplierPos.js";

const newsupplier = asyncHandler(async (req, res) => {
  const newsupplier = {
    namaPerusahaan: req.body.namaPerusahaan,
    namaKontak: req.body.namaKontak,
    email: req.body.email,
    nomorTelepon: req.body.nomorTelepon,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan,
    namaRekening: req.body.namaRekening,
    nomorRekening: req.body.nomorRekening,
    bank: req.body.bank,
    keteranganRek: req.body.keteranganRek,
  };
  try {
    const isExist = await supplierPosModels.findOne({ nomorTelepon: newsupplier.nomorTelepon });
    if (isExist) {
      throw new Error("supplier Sudah Ada");
    }
    const supplier = await supplierPosModels.create(newsupplier);
    res.send(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getsupplier = asyncHandler(async (req, res) => {
  try {
    const supplier = await supplierPosModels
      .find()

    res.send(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatesupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    namaPerusahaan: req.body.namaPerusahaan,
    namaKontak: req.body.namaKontak,
    email: req.body.email,
    nomorTelepon: req.body.nomorTelepon,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan,
    namaRekening: req.body.namaRekening,
    nomorRekening: req.body.nomorRekening,
    bank: req.body.bank,
    keteranganRek: req.body.keteranganRek,
  };
  try {
    const supplier = await supplierPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletesupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await supplierPosModels.findByIdAndDelete(id);
    res.send(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getsupplierbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await supplierPosModels
      .findById(id)

    if (!supplier) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newsupplier, getsupplier, updatesupplier, deletesupplier, getsupplierbyID };

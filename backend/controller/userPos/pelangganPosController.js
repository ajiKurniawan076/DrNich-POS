import asyncHandler from "express-async-handler";
import pelangganPosModels from "../../models/User/pelangganPos.js";
import transaksiModels from "../../models/KasirPOS/transaksiPos.js";

const newpelanggan = asyncHandler(async (req, res) => {
  const newpelanggan = {
    namaPelanggan: req.body.namaPelanggan,
    nomorTelepon: req.body.nomorTelepon,
    gender: req.body.gender,
    poin: req.body.poin,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan
  };
  try {
    const isExist = await pelangganPosModels.findOne({ nomorTelepon: newpelanggan.nomorTelepon });
    if (isExist) {
      throw new Error("pelanggan Sudah Ada");
    }
    const pelanggan = await pelangganPosModels.create(newpelanggan);
    res.send(pelanggan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getpelanggan = asyncHandler(async (req, res) => {
  try {
    const pelanggan = await pelangganPosModels
      .find().sort({ createdAt: -1 })

    res.send(pelanggan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatepelanggan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    namaPelanggan: req.body.namaPelanggan,
    nomorTelepon: req.body.nomorTelepon,
    gender: req.body.gender,
    poin: req.body.poin,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan
  };
  try {
    const pelanggan = await pelangganPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(pelanggan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletepelanggan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const pelanggan = await pelangganPosModels.findByIdAndDelete(id);
    res.send(pelanggan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getpelangganbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const pelanggan = await pelangganPosModels
      .findById(id)

    if (!pelanggan) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

const getLogPelanggan = asyncHandler(async (req, res) => {
  const { id, dari ,sampai } = req.body;
  try {
    const transaksi = await transaksiModels.find({pelanggan : id, updatedAt : {$gte: dari, $lte : sampai}}).sort({updatedAt : -1})
    .populate({
      path : 'transaksiDetail',
      populate : {
        path : 'produk'
      }
    })

    if (!transaksi) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});
export { newpelanggan, getpelanggan, updatepelanggan, deletepelanggan, getpelangganbyID, getLogPelanggan };

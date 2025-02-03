import asyncHandler from "express-async-handler";
import DetailTransaksiModels from "../../models/KasirPOS/detailTransaksiPos.js";

const newDetailTransaksi = asyncHandler(async (req, res) => {
  const { transaksi, produk, jumlah, terapis, reservasi, marketing } = req.body;

  try {
    const detailTransaksi = await DetailTransaksiModels.create({
      transaksi,
      produk,
      jumlah,
      terapis,
      reservasi,
      marketing,
    });
    res.send(detailTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getDetailTransaksi = asyncHandler(async (req, res) => {
  try {
    const detailTransaksi = await DetailTransaksiModels.find()
      .populate("transaksi", "total poin")
      .populate("produk", "namaProduk hargaJual")
      .populate("terapis", "namaTerapis")
      .populate("marketing", "namaMarketing");

    res.send(detailTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateDetailTransaksi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { transaksi, produk, jumlah, terapis, reservasi, marketing } = req.body;

  try {
    const detailTransaksi = await DetailTransaksiModels.findByIdAndUpdate(
      id,
      { $set: { transaksi, produk, jumlah, terapis, reservasi, marketing } },
      { new: true }
    );
    res.send(detailTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteDetailTransaksi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const detailTransaksi = await DetailTransaksiModels.findByIdAndDelete(id);
    res.send(detailTransaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getDetailTransaksiByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const detailTransaksi = await DetailTransaksiModels.findById(id)
      .populate("transaksi", "total poin")
      .populate("produk", "namaProduk hargaJual")
      .populate("terapis", "namaTerapis")
      .populate("marketing", "namaMarketing");

    if (!detailTransaksi) {
      return res.status(404).json({ message: "Detail transaksi not found" });
    }

    res.json(detailTransaksi);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newDetailTransaksi,
  getDetailTransaksi,
  updateDetailTransaksi,
  deleteDetailTransaksi,
  getDetailTransaksiByID,
};

import asyncHandler from "express-async-handler";
import produkModels from "../../models/ProdukPOS/produkPos.js";

const newproduk = asyncHandler(async (req, res) => {
  const newproduk = {
    jenis: req.body.jenis,
    namaProduk: req.body.namaProduk,
    hargaJual: req.body.hargaJual,
    hargaBeli: req.body.hargaBeli,
    kategori: req.body.kategori,
    bonusTerapis: req.body.bonusTerapis,
    stok: req.body.stok,
    minStok: req.body.minStok,
    supplier: req.body.supplier
  };
  try {
    const isExist = await produkModels.findOne({ namaProduk: newproduk.namaProduk });
    if (isExist) {
      throw new Error("produk Sudah Ada");
    }
    const produk = await produkModels.create(newproduk);
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getproduk = asyncHandler(async (req, res) => {
  try {
    const produk = await produkModels
      .find().populate("kategori","kategori").populate("jenis", "jenis").populate("supplier").sort({ createdAt: -1 });

    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateproduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    jenis: req.body.jenis,
    namaProduk: req.body.namaProduk,
    supplier : req.body.supplier,
    hargaJual: req.body.hargaJual,
    hargaBeli: req.body.hargaBeli,
    kategori: req.body.kategori,
    bonusTerapis: req.body.bonusTerapis,
    stok: req.body.stok,
    minStok: req.body.minStok
  };
  try {
    const produk = await produkModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteproduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await produkModels.findByIdAndDelete(id);
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getprodukbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await produkModels
      .findById(id).populate("kategori", "kategori").populate("jenis", "jenis").populate("supplier");

    if (!produk) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newproduk, getproduk, updateproduk, deleteproduk, getprodukbyID };

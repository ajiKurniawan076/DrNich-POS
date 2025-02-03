import asyncHandler from "express-async-handler";
import kategoriProdukPosModels from "../../models/ProdukPOS/kategoriProdukPos.js";
import mongoose from 'mongoose';    

const newkategoriProdukPos = asyncHandler(async (req, res) => {
  const newkategoriProdukPos = {
    jenis: req.body.jenis,
    kategori: req.body.kategori
  };
  try {
    const isExist = await kategoriProdukPosModels.findOne({ jenis: newkategoriProdukPos.jenis, kategori: newkategoriProdukPos.kategori });
    if (isExist) {
      throw new Error("kategori Produk Sudah Ada");
    }
    const kategoriProdukPos = await kategoriProdukPosModels.create(newkategoriProdukPos);
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getkategoriProdukPos = asyncHandler(async (req, res) => {
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.find().
    populate("jenis", "jenis");
    res.send(kategoriProdukPos);    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatekategoriProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    jenis: req.body.jenis,
    kategori: req.body.kategori
  };
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletekategoriProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.findByIdAndDelete(id);
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getkategoriProdukPosbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const kategoriProdukPos = await kategoriProdukPosModels
      .findById(id)
      .populate("jenis", "jenis")

    if (!kategoriProdukPos) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(kategoriProdukPos);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newkategoriProdukPos, getkategoriProdukPos, updatekategoriProdukPos, deletekategoriProdukPos, getkategoriProdukPosbyID };

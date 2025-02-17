import asyncHandler from "express-async-handler";
import produkModels from "../../models/produk/produk.js";
import carouselProducts from "../../models/produk/carouselProducts.js";
import tipeKulit from "../../models/produk/tipeKulit.js";

/*CAROUSEL PRODUCT*/
const BASE_URL = "https://api.drnich.co.id/";
const newImage = asyncHandler(async (req, res) => {
  const newImage = {
    image: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
  };
  try {
    const isExist = await carouselProducts.findOne({ image: newImage.image });
    if (isExist) {
      throw new Error("Image Sudah Ada");
    }
    const image = await carouselProducts.create(newImage);
    res.send(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getImage = asyncHandler(async (req, res) => {
  try {
    const image = await carouselProducts.find();
    res.send(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const image = await carouselProducts.findByIdAndDelete(id);
    res.send(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    image: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
  };
  try {
    const image = await carouselProducts.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*PRODUK*/
const newproduk = asyncHandler(async (req, res) => {
  const newproduk = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipeProduk: req.body.tipeProduk,
    tipeKulit: req.body.tipeKulit,
  };
  try {
    const isExist = await produkModels.findOne({ nama: newproduk.nama });
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
      .find()
      .populate("kategori") // Populating 'kategori' from the schema
      .populate("tipeProduk")
      .populate("tipeKulit"); // Populating 'tipeProduk' from the schema
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getprodukbycategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await produkModels
      .find({ kategori: id })
      .populate("kategori")
      .populate("tipeProduk")
      .populate("tipeKulit")
      .lean();
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateproduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipeProduk: req.body.tipeProduk,
    tipeKulit: req.body.tipeKulit,
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
      .findById(id)
      .populate("kategori", "name")
      .populate("tipeProduk", "name")
      .populate("tipeKulit", "name");

    if (!produk) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newproduk,
  getproduk,
  updateproduk,
  deleteproduk,
  getprodukbyID,
  newImage,
  getImage,
  updateImage,
  deleteImage,
  getprodukbycategory,
};

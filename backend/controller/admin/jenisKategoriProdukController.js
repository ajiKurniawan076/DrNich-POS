import asyncHandler from "express-async-handler";
import kategoriProduct from "../../models/produk/kategoriProduct.js";
import productType from "../../models/produk/productType.js";

//PRODUCT CATEGORY HANDLER
const BASE_URL = "https://api.drnich.co.id/";
const newCategoryProduct = asyncHandler(async (req, res) => {
  const newCategoryProduct = {
    name: req.body.name,
    image: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
  };
  try {
    const isExist = await kategoriProduct.findOne({
      name: newCategoryProduct.name,
    });
    if (isExist) {
      throw new Error("kategori Produk Sudah Ada");
    }
    const categoryProduct = await kategoriProduct.create(newCategoryProduct);
    res.send(categoryProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getCategoryProduct = asyncHandler(async (req, res) => {
  try {
    const data = await kategoriProduct.find();
    if (!data) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const editCategoryProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    name: req.body.name,
    image: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
  };
  try {
    const categoryProduct = await kategoriProduct.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    if (!categoryProduct) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(categoryProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteCategoryProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categoryProduct = await kategoriProduct.findByIdAndDelete(id);
    res.send(categoryProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await kategoriProduct.findById(id);
    if (!data) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// PRODUCT TYPE HANDLER

const newProductType = asyncHandler(async (req, res) => {
  const newProductType = {
    name: req.body.name,
  };
  try {
    const isExist = await productType.findOne({ name: newProductType.name });
    if (isExist) {
      throw new Error("kategori Produk Sudah Ada");
    }
    const data = await productType.create(newProductType);
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProductType = asyncHandler(async (req, res) => {
  try {
    const data = await productType.find();
    if (!data) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const editProductType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    name: req.body.name,
  };
  try {
    const data = await productType.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    if (!data) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteProductType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productType.findByIdAndDelete(id);
    if (!data) {
      throw new Error("kategori Produk Tidak Ditemukan");
    }
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  newCategoryProduct,
  getCategoryProduct,
  deleteCategoryProduct,
  editCategoryProduct,
  newProductType,
  getProductType,
  editProductType,
  deleteProductType,
  getCategoryById,
};

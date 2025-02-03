import asyncHandler from "express-async-handler";
import ulasanModels from "../../models/ulasan/ulasanModels.js";

const newulasan = asyncHandler(async (req, res) => {
  const newulasan = {
    nama: req.body.nama,
    foto: req.body.foto,
    ulasan: req.body.ulasan,
    rating: req.body.rating,
    
  };
  try {
    const isExist = await ulasanModels.findOne({ nama: newulasan.nama });
    if (isExist) {
      throw new Error("ulasan Sudah Ada");
    }
    const ulasan = await ulasanModels.create(newulasan);
    res.send(ulasan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getulasan = asyncHandler(async (req, res) => {
  try {
    const ulasan = await ulasanModels.find();
    res.send(ulasan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateulasan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    foto: req.body.foto,
    ulasan: req.body.ulasan,
    rating: req.body.rating,to,
  };
  try {
    const ulasan = await ulasanModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(ulasan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteulasan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const ulasan = await ulasanModels.findByIdAndDelete(id);
    res.send(ulasan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newulasan, getulasan, updateulasan, deleteulasan };

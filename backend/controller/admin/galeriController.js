import asyncHandler from "express-async-handler";
import Galeri from "../../models/Gallery/galery.js";

const BASE_URL = "https://api.drnich.co.id/";
const newGaleri = asyncHandler(async (req, res) => {
  const newGaleri = {
    judul: req.body.judul,
    thumbnail: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
    link: req.body.link,
    channel: req.body.channel,
    sosmed: req.body.sosmed,
    deskripsi: req.body.deskripsi,
  };
  try {
    const isExist = await Galeri.findOne({ judul: newGaleri.judul });
    if (isExist) {
      throw new Error("Galeri Sudah Ada");
    }
    const galeri = await Galeri.create(newGaleri);
    res.send(galeri);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getGaleri = asyncHandler(async (req, res) => {
  try {
    const galeri = await Galeri.find();
    res.send(galeri);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getGaleriById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const galeri = await Galeri.findById(id);
    res.send(galeri);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteGaleri = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const galeri = await Galeri.findByIdAndDelete(id);
    res.send(galeri);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const editGaleri = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    judul: req.body.judul,
    thumbnail: req.file ? `${BASE_URL}${req.file.path}` : "No Image",
    link: req.body.link,
    channel: req.body.channel,
    sosmed: req.body.sosmed,
    deskripsi: req.body.deskripsi,
  };
  try {
    const galeri = await Galeri.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(galeri);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newGaleri, getGaleri, deleteGaleri, editGaleri, getGaleriById };

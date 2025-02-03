import Sertif from "../../models/sertif&mesin/sertif.js";
import Mesin from "../../models/sertif&mesin/mesin.js";
import asyncHandler from "express-async-handler";

const newSertif = asyncHandler(async (req, res) => {
  const newSertif = {
    foto: req.body.foto,
  };
  try {
    const sertif = await Sertif.create(newSertif);
    res.send(sertif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteSertif = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const sertif = await Sertif.findByIdAndDelete(id);
    res.send(sertif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const editSertif = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    foto: req.body.foto,
  };
  try {
    const sertif = await Sertif.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(sertif);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengedit foto" + error.message });
  }
});

const getSertif = asyncHandler(async (req, res) => {
  try {
    const sertif = await Sertif.find();
    res.send(sertif);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengambil data" + error.message });
  }
});

const getSertifbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const sertif = await Sertif.findById(id);
    res.send(sertif);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengambil data" + error.message });
  }
});

const newMesin = asyncHandler(async (req, res) => {
  const newMesin = {
    foto: req.body.foto,
  };
  try {
    const mesin = await Mesin.create(newMesin);
    res.send(mesin);
  } catch (error) {
    res.status(400).json({ message: "Gagal menambahkan foto" + error.message });
  }
});

const deleteMesin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const mesin = await Mesin.findByIdAndDelete(id);
    res.send(mesin);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal menghapus foto meisn" + error.message });
  }
});

const editMesin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    foto: req.body.foto,
  };
  try {
    const mesin = await Mesin.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(mesin);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengedit foto" + error.message });
  }
});

const getMesin = asyncHandler(async (req, res) => {
  try {
    const mesin = await Mesin.find();
    res.send(mesin);
  } catch (error) {
    res.status(400).json({ message: "Gagal mengambil data" + error.message });
  }
});

export {
  newSertif,
  deleteSertif,
  editSertif,
  getSertif,
  newMesin,
  deleteMesin,
  editMesin,
  getMesin,
  getSertifbyID,
};

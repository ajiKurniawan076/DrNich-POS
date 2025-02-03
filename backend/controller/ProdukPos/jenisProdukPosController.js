import asyncHandler from "express-async-handler";
import jenisProdukPosModels from "../../models/ProdukPOS/jenisProdukPos.js";

  const newjenisProdukPos = asyncHandler(async (req, res) => {
    const newjenisProdukPos = {
      jenis: req.body.jenis
    };
    try {
      const isExist = await jenisProdukPosModels.findOne({jenis: newjenisProdukPos.jenis});
      if (isExist) {
        throw new Error("jenis Produk Sudah Ada");
      }
      const jenisProdukPos = await jenisProdukPosModels.create(newjenisProdukPos);
      res.send(jenisProdukPos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

const getjenisProdukPos = asyncHandler(async (req, res) => {
  try {
    const jenisProdukPos = await jenisProdukPosModels.find();
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatejenisProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    jenis: req.body.jenis,

  };
  try {
    const jenisProdukPos = await jenisProdukPosModels.findByIdAndUpdate(
      id,
      { $set: {jenis: newData.jenis} },
      { new: true }
    );
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletejenisProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisProdukPos = await jenisProdukPosModels.findByIdAndDelete(id);
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getjenisProdukPosbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisProdukPos = await jenisProdukPosModels
      .findById(id)

    if (!jenisProdukPos) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(jenisProdukPos);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newjenisProdukPos, getjenisProdukPos, updatejenisProdukPos, deletejenisProdukPos, getjenisProdukPosbyID };

import asyncHandler from "express-async-handler";
import DetailBelanjaModels from "../../models/ProdukPOS/detailBelanjaPos.js";

const newDetailBelanja = asyncHandler(async (req, res) => {
  const { Belanja, produk, supplier, jumlah } = req.body;

  try {
    const detailBelanja = await DetailBelanjaModels.create({
      Belanja,
      produk,
      supplier,
      jumlah,
    });
    res.send(detailBelanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getDetailBelanja = asyncHandler(async (req, res) => {
  try {
    const detailBelanja = await DetailBelanjaModels.find()
      .populate("Belanja", "_id")
      .populate("produk", "namaProduk")
      .populate("supplier", "namaSupplier");

    res.send(detailBelanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateDetailBelanja = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Belanja, produk, supplier, jumlah } = req.body;

  try {
    const detailBelanja = await DetailBelanjaModels.findByIdAndUpdate(
      id,
      { $set: { Belanja, produk, supplier, jumlah } },
      { new: true }
    );
    res.send(detailBelanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteDetailBelanja = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const detailBelanja = await DetailBelanjaModels.findByIdAndDelete(id);
    res.send(detailBelanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getDetailBelanjaByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const detailBelanja = await DetailBelanjaModels.findById(id)
      .populate("Belanja", "_id")
      .populate("produk", ["namaProduk"])
      .populate("supplier", "namaSupplier");

    if (!detailBelanja) {
      return res.status(404).json({ message: "DetailBelanja not found" });
    }

    res.json(detailBelanja);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newDetailBelanja,
  getDetailBelanja,
  updateDetailBelanja,
  deleteDetailBelanja,
  getDetailBelanjaByID,
};

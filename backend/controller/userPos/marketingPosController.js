  import asyncHandler from "express-async-handler";
  import marketingPosModels from "../../models/User/marketingPos.js";

  const newmarketing = asyncHandler(async (req, res) => {
    const newmarketing = {
      namaMarketing: req.body.namaMarketing,
      nomorTelepon: req.body.nomorTelepon,
      alamat: req.body.alamat,
      keterangan: req.body.keterangan,
      namaRekening: req.body.namaRekening,
      nomorRekening: req.body.nomorRekening,
      bank: req.body.bank,
      keteranganRek: req.body.keteranganRek,
    image : req.file ? req.file.path : 'No Image'
    };
    try {
      const isExist = await marketingPosModels.findOne({ nomorTelepon: newmarketing.nomorTelepon });
      if (isExist) {
        throw new Error("marketing Sudah Ada");
      }
      const marketing = await marketingPosModels.create(newmarketing);
      res.send(marketing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const getmarketing = asyncHandler(async (req, res) => {
    try {
      const marketing = await marketingPosModels
        .find()

      res.send(marketing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const updatemarketing = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const newData = {
      namaMarketing: req.body.namaMarketing,
      nomorTelepon: req.body.nomorTelepon,
      alamat: req.body.alamat,
      keterangan: req.body.keterangan,
      namaRekening: req.body.namaRekening,
      nomorRekening: req.body.nomorRekening,
      bank: req.body.bank,
      keteranganRek: req.body.keteranganRek,
    image : req.file ? req.file.path : 'No Image'
    };
    try {
      const marketing = await marketingPosModels.findByIdAndUpdate(
        id,
        { $set: newData },
        { new: true }
      );
      res.send(marketing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const deletemarketing = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const marketing = await marketingPosModels.findByIdAndDelete(id);
      res.send(marketing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  const getmarketingbyID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const marketing = await marketingPosModels
        .findById(id)

      if (!marketing) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(marketing);
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  });

  export { newmarketing, getmarketing, updatemarketing, deletemarketing, getmarketingbyID };

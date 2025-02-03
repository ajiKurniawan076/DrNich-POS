import asyncHandler from "express-async-handler";
import PromoDetailModels from "../../models/PromoPOS/promoDetailPos.js";

const newPromoDetail = asyncHandler(async (req, res) => {
  const { promo, produk } = req.body;

  try {
    const promoDetail = await PromoDetailModels.create({
      promo,  
      produk,
    });
    res.send(promoDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoDetail = asyncHandler(async (req, res) => {
  try {
    const promoDetails = await PromoDetailModels.find()
      .populate("promo", "namaPromo")
      .populate("produk", "namaProduk");

    res.send(promoDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatePromoDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { promo, produk } = req.body;

  try {
    const promoDetail = await PromoDetailModels.findByIdAndUpdate(
      id,
      { $set: { promo, produk } },
      { new: true }
    );
    res.send(promoDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletePromoDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const promoDetail = await PromoDetailModels.findByIdAndDelete(id);
    res.send(promoDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoDetailByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const promoDetail = await PromoDetailModels.findById(id)
      .populate("promo", "namaPromo")
      .populate("produk", "namaProduk");

    if (!promoDetail) {
      return res.status(404).json({ message: "Promo detail not found" });
    }

    res.json(promoDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newPromoDetail,
  getPromoDetail,
  updatePromoDetail,
  deletePromoDetail,
  getPromoDetailByID,
};

import asyncHandler from "express-async-handler";
import PromoModels from "../../models/PromoPOS/promoPos.js";
import PromoDetailModel from "../../models/PromoPOS/promoDetailPos.js";

  const newPromo = asyncHandler(async (req, res) => {
    const { namaPromo, potongan, cashback, jenis, keterangan, jenisPotongan, promoDetail, berlakuDari, berlakuSampai } = req.body;

    try {
      // Create the main promo
      const promo = await PromoModels.create({
        namaPromo,
        potongan,
        cashback,
        jenis,
        keterangan,
        jenisPotongan,
        berlakuDari,
        berlakuSampai,
        promoDetail
      });
      const detailIDS = [];
      // Now, handle the promoDetail which includes products and promoPos.id
      if (promoDetail && promoDetail.length > 0) {
        // Iterate over the promoDetail items and handle the relationships
        for (const detail of promoDetail) {
          const promodet = await PromoDetailModel.create({
            promo: promo._id, // Linking the promo
            produk: detail._id, // Assuming product has an 'id' field
          });
          detailIDS.push(promodet._id);
        }
        promo.promoDetail = detailIDS;
        await promo.save();
      }


      // Respond with the created promo
      res.send(promo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


const getPromo = asyncHandler(async (req, res) => {
  try {
    const promo = await PromoModels.find().populate({
      path: 'promoDetail',
      populate: {
        path: 'produk',
        model: 'produkPos',
      },
    }).sort({ createdAt: -1 });
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoAktif = asyncHandler(async (req, res) => {
  try {
    // Find promos where berlakuDari is greater than the current date
    const promo = await PromoModels.find({ berlakuSampai: { $gte: new Date(Date.now()) } })
      .populate({
        path: 'promoDetail',
        populate: {
          path: 'produk',
          model: 'produkPos',
        },
      }).sort({ createdAt: -1 });

    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatePromo = asyncHandler(async (req, res) => {
  const { namaPromo, potongan, cashback, jenis, keterangan, jenisPotongan, promoDetail, berlakuDari, berlakuSampai } = req.body;
  const { id } = req.params;

  try {
    // Find the existing promo
    const promo = await PromoModels.findById(id);
    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    // Update the main promo details
    promo.namaPromo = namaPromo;
    promo.potongan = potongan;
    promo.cashback = cashback;
    promo.jenis = jenis;
    promo.keterangan = keterangan;
    promo.jenisPotongan = jenisPotongan;
    promo.berlakuDari = berlakuDari;
    promo.berlakuSampai = berlakuSampai;

    // Handle promoDetail updates
    if (promoDetail && promoDetail.length > 0) {
      // Clear existing promoDetail
      await PromoDetailModel.deleteMany({ promo: promo._id });
      
      // Insert new promoDetails
      const detailIDS = [];
      for (const detail of promoDetail) {
        const promodet = await PromoDetailModel.create({
          promo: promo._id,
          produk: detail._id,
        });
        detailIDS.push(promodet._id);
      }
      promo.promoDetail = detailIDS;
    }

    // Save the updated promo
    await promo.save();
    res.json(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const promo = await PromoModels.findByIdAndDelete(id);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const promo = await PromoModels.findById(id).populate({
      path: 'promoDetail',
      populate: {
        path: 'produk',
        model: 'produkPos',
      },
    });

    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.json(promo);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newPromo,
  getPromo,
  updatePromo,
  deletePromo,
  getPromoByID,
  getPromoAktif
};

import layanan from "../../models/layanan/layanan.js";
import produk from "../../models/produk/produk.js";
import asyncHandler from "express-async-handler";

const search = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }
  const produkQuery = produk.find({
    $or: [
      { nama: { $regex: query, $options: "i" } },
      { deskripsi: { $regex: query, $options: "i" } },
      { manfaat: { $regex: query, $options: "i" } },
    ],
  });

  const layananQuery = layanan.find({
    $or: [
      { nama: { $regex: query, $options: "i" } },
      { deskripsi: { $regex: query, $options: "i" } },
    ],
  });

  if (!layananQuery && !produkQuery) {
    return res.status(400).json({ message: "Data Not Found" });
  }

  const [produkResult, layananResult] = await Promise.all([
    produkQuery.exec(),
    layananQuery.exec(),
  ]);
  res.json({ produk: produkResult, layanan: layananResult });
});

export { search };

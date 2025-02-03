import asyncHandler from "express-async-handler";
import kurangStokModels from "../../models/ProdukPOS/kurangStok.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";

const newkurangStok = asyncHandler(async (req, res) => {
  const { jumlah, produk, keterangan } = req.body;

  try {
    // Step 1: Create the `kurangStokPos` document with an empty `kurangStokDetail`
    const kurangStok = await kurangStokModels.create({
      jumlah,
      produk,
      keterangan // Start with an empty array
    });
    await ProdukModels.findByIdAndUpdate(
      produk, 
      {$inc : {stok: - jumlah}},
      {new : true}
    );
    const kurangStokDetailIds = [];

    // Step 4: Send the response
    res.status(200).json({
      message: "kurangStok created successfully",
      kurangStok,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getkurangStok = asyncHandler(async (req, res) => {
  try {
    const kurangStok = await kurangStokModels.find().
    populate("produk");
    res.send(kurangStok);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatekurangStok = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { jumlah, produk, keterangan } = req.body;
  try {
    const kurangStok = await kurangStokModels.findById(id);
    kurangStok.produk = produk;
    let prevjumlah = kurangStok.jumlah;
    const newmines = jumlah - prevjumlah;
    kurangStok.jumlah = jumlah;
    kurangStok.keterangan = keterangan;
    await ProdukModels.findByIdAndUpdate(
      produk, 
      {$inc : {stok: - newmines}},
      {new : true}
    );
    await kurangStok.save();
    res.send({newmin: newmines, prevjum: prevjumlah, jumlah: jumlah});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletekurangStok = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const kurangStok = await kurangStokModels.findByIdAndDelete(id);
    res.send(kurangStok);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getkurangStokByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const kurangStok = await kurangStokModels.findById(id).
    populate("produk");

    if (!kurangStok) {
      return res.status(404).json({ message: "kurangStok record not found" });
    }

    res.json(kurangStok);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newkurangStok, getkurangStok, updatekurangStok, deletekurangStok, getkurangStokByID };

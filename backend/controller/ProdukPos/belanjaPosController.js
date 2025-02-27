import asyncHandler from "express-async-handler";
import BelanjaModels from "../../models/ProdukPOS/belanjaPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import belanjaDetailModel from "../../models/ProdukPOS/detailBelanjaPos.js";

const getBelanjaInvoice = asyncHandler(async (req, res) => {
  try {
    
    const year = new Date().getFullYear();
    const startOfDay = new Date(2025, 0, 1);
    const endOfDay = new Date(year, 11, 31, 23, 59, 59);
    const transaksi = await BelanjaModels.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    const count = transaksi.length;
    const invoice = `DN135${year}79${count+1}`;
    res.send(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const newBelanja = asyncHandler(async (req, res) => {
  const { total, belanjaDetail, supplier, invoice } = req.body;
  const pembayaran = 0; 
  const kembalian = 0;
  try {
    // Step 1: Create the `BelanjaPos` document with an empty `belanjaDetail`
    const belanja = await BelanjaModels.create({
      total,
      supplier,
      invoice,
      pembayaran,
      kembalian,
      belanjaDetail: [], // Start with an empty array
    });

    // Step 2: Create `detailBelanjaPos` documents and collect their IDs
    const belanjaDetailIds = [];
    for (const detail of belanjaDetail) {
      const newDetail = await belanjaDetailModel.create({
        Belanja: belanja._id, // Link to the parent `BelanjaPos`
        produk: detail._id, // Assuming `idProduk` is the correct field
        jumlah: detail.jumlah,
        harga: detail.hargaBeli,
        totalHarga: detail.hargaBeli * detail.jumlah
      });
      const pord = await ProdukModels.findByIdAndUpdate(
        detail._id, 
        {$inc : {stok: + detail.jumlah}},
        {new : true}
      );
      belanjaDetailIds.push(newDetail._id);
    }

    // Step 3: Update the `belanjaDetail` field in the `BelanjaPos` document
    belanja.belanjaDetail = belanjaDetailIds;
    await belanja.save();

    // Step 4: Send the response
    res.status(201).json({
      message: "Belanja created successfully",
      belanja,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getBelanja = asyncHandler(async (req, res) => {
  try {
    const belanja = await BelanjaModels.find().
    populate(
      {
        path : 'belanjaDetail',
        populate: [
          {path: 'produk'},
          {path: 'supplier'}
        ]
      }
    );
    res.send(belanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateBelanja = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pembayaran, kembalian } = req.body;

  const data = {pembayaran : pembayaran, kembalian : kembalian}

  try {
    const belanja = await BelanjaModels.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.send(belanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteBelanja = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const belanja = await BelanjaModels.findByIdAndDelete(id);
    res.send(belanja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getBelanjaByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const belanja = await BelanjaModels.findById(id).
    populate(
      {
        path : 'belanjaDetail',
        populate: [
          {path: 'produk'},
          {path: 'supplier'}
        ]
      }
    );

    if (!belanja) {
      return res.status(404).json({ message: "Belanja record not found" });
    }

    res.json(belanja);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newBelanja, getBelanja, updateBelanja, deleteBelanja, getBelanjaByID, getBelanjaInvoice };

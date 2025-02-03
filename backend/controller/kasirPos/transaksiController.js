import asyncHandler from "express-async-handler";
import TransaksiModels from "../../models/KasirPOS/transaksiPos.js";
import transaksiDetailModels from "../../models/KasirPOS/detailTransaksiPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import promoModels from "../../models/PromoPOS/promoPos.js";
import pelangganModels from "../../models/User/pelangganPos.js";

const newTransaksi = asyncHandler(async (req, res) => {
  const { promo, total, poin, invoice, totalAkhir, potongan, transaksiDetail, pelanggan, status } = req.body;

  try {
    const transaksi = await TransaksiModels.create({
      promo,  
      total,
      poin,
      invoice,
      totalAkhir,
      potongan,
      pelanggan,
      transaksiDetail,
      status
    });
    const detailIDS = [];
    if (transaksiDetail && transaksiDetail.length > 0) {
          // Iterate over the transaksiDetail items and handle the relationships
          for (const detail of transaksiDetail) {
            const transdet = await transaksiDetailModels.create({
              transaksi: transaksi._id, // Linking the promo
              produk: detail._id, // Assuming product has an 'id' field
              jumlah: detail.jumlah
            });
            detailIDS.push(transdet._id);
            //produk
            await ProdukModels.findByIdAndUpdate(
                  detail._id, 
                  {$inc : {stok: - detail.jumlah}},
                  {new : true}
                );
          }
          //poin pelanggan
          await pelangganModels.findByIdAndUpdate(
            pelanggan, 
            {$inc : {poin: + transaksi.poin}},
            {new : true}
          );
          transaksi.transaksiDetail = detailIDS;
          await transaksi.save();
        }
        
    res.send(transaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTransaksi = asyncHandler(async (req, res) => {
  try {
    const transaksi = await TransaksiModels.find()
      .populate("promo", "namaPromo");

    res.send(transaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getTransaksiDraft = asyncHandler(async (req, res) => {
  try {
    const transaksi = await TransaksiModels.find({status: 'Pending'})
      .populate("promo")
      .populate("pelanggan")
      .populate({
        path : "transaksiDetail",
        populate : {
          path : 'produk',
          model : 'produkPos'
        }
      });

    res.send(transaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const kalkulasiHarga = asyncHandler(async (req, res) => {
  try {
    const {promo, produks} = req.body;
    if(promo && promo.length>0 ){
      const promoo = await promoModels.findById(promo).populate({
        path: 'promoDetail',
        populate: {
          path: 'produk',
          model: 'produkPos',
        },
      });
  
      let potongan = 0;
      let cashback = 0;
      for(const detail of produks){
        const produk = promoo.promoDetail.find((pd) => pd.produk._id.toString() === detail._id);
          if (promoo.jenis === "Diskon") {
            if (promoo.jenisPotongan === "persen") {
              potongan += (produk.produk.hargaJual * promoo.potongan) / 100 * detail.jumlah;
            } else if (promoo.jenisPotongan === "rupiah") {
              potongan += promoo.potongan * detail.jumlah;
            }
          } else if (promoo.jenis === "Cashback") {
            cashback += promoo.cashback;
          }
      }
    const kalkulasi = {
      potongan: potongan,
      cashback: cashback
    }
  res.send({kalkulasi});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTransaksiInvoice = asyncHandler(async (req, res) => {
  try {
    
    const year = new Date().getFullYear();
    const startOfDay = new Date(year, 0, 1);
    const endOfDay = new Date(year, 11, 31, 23, 59, 59);
    const transaksi = await TransaksiModels.find({
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

const updateTransaksi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const transaksi = await TransaksiModels.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    res.send(transaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteTransaksi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const transaksi = await TransaksiModels.findByIdAndDelete(id);
    res.send(transaksi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTransaksiByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const transaksi = await TransaksiModels.findById(id)
    .populate("promo")
    .populate("pelanggan")
    .populate({
      path : "transaksiDetail",
      populate : {
        path : 'produk',
        model : 'produkPos'
      }
    });

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi not found" });
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export {
  newTransaksi,
  getTransaksi,
  getTransaksiDraft,
  updateTransaksi,
  deleteTransaksi,
  getTransaksiByID,
  getTransaksiInvoice,
  kalkulasiHarga
};

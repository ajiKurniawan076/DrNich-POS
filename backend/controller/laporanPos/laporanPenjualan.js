import asyncHandler from "express-async-handler";
import TransaksiModels from "../../models/KasirPOS/transaksiPos.js";
import belanjaModels from "../../models/ProdukPOS/belanjaPos.js";
import transaksiDetailModels from "../../models/KasirPOS/detailTransaksiPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import promoModels from "../../models/PromoPOS/promoPos.js";
import pelangganModels from "../../models/User/pelangganPos.js";

const laporanPenjualan = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari);
    const to = new Date(sampai);
    const transaksi = await TransaksiModels.find({
      createdAt: { $gte: from, $lte: to },
    })
      .populate("promo")
      .populate("pelanggan")
      .populate({
        path: "transaksiDetail",
        populate: {
          path: "produk",
          model: "produkPos",
        },
      });

    let total = 0;
    for (const item of transaksi) {
      total += item.totalAkhir;
    }
    const totalTransaksi = transaksi.length;

    res.status(200).json({
      transaksi: transaksi,
      totalPendapatan: total,
      totalTransaksi: totalTransaksi,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanPenjualanProduk = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari);
    const to = new Date(sampai);
    const penjualan = await TransaksiModels.find({
      createdAt: { $gte: from, $lte: to },
    }).populate({
      path: "transaksiDetail",
      populate: {
        path: "produk",
        model: "produkPos",
      },
    });
    let totalProduk = 0;
    for (const item of penjualan) {
      for (const items of item.transaksiDetail) {
        totalProduk += items.jumlah;
      }
    }

    res.status(200).json({ totalProduk: totalProduk });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanBelanja = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari);
    const to = new Date(sampai);
    const belanja = await belanjaModels
      .find({ createdAt: { $gte: from, $lte: to } })
      .populate({
        path: "belanjaDetail",
        populate: {
          path: "produk",
          model: "produkPos",
        },
      });

    for (const item of belanja) {
    }
    const totalBelanja = belanja.length;

    res.status(200).json({ belanja: belanja, totalTransaksi: totalBelanja });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanPersediaan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produks = await ProdukModels.find({ kategori: id });
    let produkRes = [];
    for (const item of produks) {
      const res = {
        namaProduk: item.namaProduk,
        stok: item.stok,
      };
      produkRes.push(res);
    }
    res.status(200).json({ produkRes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanLimit = asyncHandler(async (req, res) => {
  try {
    const produks = await ProdukModels.find();
    let produkRes = [];
    for (const item of produks) {
      if (item.stok < item.minStok) {
        const res = {
          namaProduk: item.namaProduk,
          stok: item.stok,
          minStok: item.minStok,
        };
        produkRes.push(res);
      }
    }
    res.status(200).json(produkRes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanTerlaris = asyncHandler(async (req, res) => {
  try {
    const transaksi = await TransaksiModels.find().populate({
      path: "transaksiDetail",
      populate: {
        path: "produk",
        model: "produkPos",
        populate: {
          path: "kategori",
          model: "kategoriProdukPos",
        },
      },
    });
    let produklist = [];
    let kategorilist = [];
    for (const item of transaksi) {
      const det = item.transaksiDetail;
      for (const citem of det) {
        if (
          produklist.some((item) => item.namaProduk == citem.produk.namaProduk)
        ) {
          produklist = produklist.map((item) =>
            item.namaProduk == citem.produk.namaProduk
              ? {
                  ...item,
                  jumlah: item.jumlah + citem.jumlah,
                  pendapatan:
                    item.pendapatan + citem.jumlah * citem.produk.hargaJual,
                }
              : item
          );
          if (
            kategorilist.some(
              (item) => item.kategori == citem.produk.kategori.kategori
            )
          ) {
            kategorilist = kategorilist.map((item) =>
              item.kategori == citem.produk.kategori.kategori
                ? {
                    ...item,
                    jumlah: item.jumlah + citem.jumlah,
                    pendapatan:
                      item.pendapatan + citem.jumlah * citem.produk.hargaJual,
                  }
                : item
            );
          } else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: citem.jumlah * citem.produk.hargaJual,
            };
            kategorilist.push(isi);
          }
        } else {
          const isi = {
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            pendapatan: citem.jumlah * citem.produk.hargaJual,
          };
          produklist.push(isi);
          if (
            kategorilist.some(
              (item) => item.kategori == citem.produk.kategori.kategori
            )
          ) {
            kategorilist = kategorilist.map((item) =>
              item.kategori == citem.produk.kategori.kategori
                ? {
                    ...item,
                    jumlah: item.jumlah + citem.jumlah,
                    pendapatan:
                      item.pendapatan + citem.jumlah * citem.produk.hargaJual,
                  }
                : item
            );
          } else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: citem.jumlah * citem.produk.hargaJual,
            };
            kategorilist.push(isi);
          }
        }
      }
    }
    res
      .status(200)
      .json({ produklist: produklist, kategorilist: kategorilist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const laporanGrafik = async (req, res) => {
  try {
    const { endOfWeek } = req.body; // Only provide endOfWeek

    if (!endOfWeek) {
      return res
        .status(400)
        .json({ success: false, message: "endOfWeek is required" });
    }

    const weekDays = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];

    // Convert endOfWeek to Date object
    const endDate = new Date(endOfWeek);
    endDate.setHours(23, 59, 59, 999); // Ensure it's the end of the day

    // Compute startOfWeek by subtracting 6 days
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0); // Ensure it's the start of the day

    // Detect the start day from startDate
    const detectedDayIndex = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const detectedStartDay =
      detectedDayIndex === 0 ? "Minggu" : weekDays[detectedDayIndex - 1];

    // Generate the ordered days of the week based on the detected start day
    const startIndex = weekDays.indexOf(detectedStartDay);
    const orderedWeekDays = [
      ...weekDays.slice(startIndex),
      ...weekDays.slice(0, startIndex),
    ];

    // Fetch transactions within the given range
    const transactions = await TransaksiModels.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Initialize the week structure as an ARRAY
    const transactionsByDay = orderedWeekDays.map((day) => ({
      name: day,
      penjualan: 0,
    }));

    // Group transactions by day
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const transactionDayIndex = transactionDate.getDay();

      // Adjust day name to match the custom order
      const adjustedDayName =
        transactionDayIndex === 0
          ? "Minggu"
          : weekDays[transactionDayIndex - 1];

      // Find the correct day in the array and update "penjualan"
      const dayData = transactionsByDay.find(
        (day) => day.name === adjustedDayName
      );
      if (dayData) {
        dayData.penjualan += transaction.totalAkhir;
      }
    });

    res.json({ success: true, transactions: transactionsByDay });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  laporanPenjualan,
  laporanPenjualanProduk,
  laporanBelanja,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris,
  laporanGrafik,
};

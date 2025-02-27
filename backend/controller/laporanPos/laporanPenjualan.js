import asyncHandler from "express-async-handler";
import TransaksiModels from "../../models/KasirPOS/transaksiPos.js";
import belanjaModels from "../../models/ProdukPOS/belanjaPos.js";
import transaksiDetailModels from "../../models/KasirPOS/detailTransaksiPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import kurangStokModels from "../../models/ProdukPOS/kurangStok.js";
import promoModels from "../../models/PromoPOS/promoPos.js";
import pelangganModels from "../../models/User/pelangganPos.js";

const laporanPenjualan = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    let dataPelanggan = []
    let dataPromo = []
    const transaksi = await TransaksiModels.find({ createdAt: { $gte: from, $lte: to } }).populate("promo")
      .populate("pelanggan")
      .populate({
        path: "transaksiDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

    let total = 0;
    for (const item of transaksi) {
      total += item.totalAkhir;

      if (item.pelanggan && item.pelanggan.namaPelanggan) {  // Check if pelanggan exists
        if (dataPelanggan.some(data => data.namaPelanggan == item.pelanggan.namaPelanggan)) {
          dataPelanggan = dataPelanggan.map(isi =>
            isi.namaPelanggan == item.pelanggan.namaPelanggan
              ? { ...isi, totalPembelian: isi.totalPembelian + item.totalAkhir, jumlahPembelian: isi.jumlahPembelian+1 }
              : isi
          );
        } else {
          const isiDataPelanggan = {
            namaPelanggan: item.pelanggan.namaPelanggan,
            totalPembelian: item.totalAkhir,
            jumlahPembelian : 1
          };
          dataPelanggan.push(isiDataPelanggan);
        }
      }
      if (item.promo && item.promo.namaPromo) {
        if (
          dataPromo.some((promo) => promo.namaPromo == item.promo.namaPromo)
        ) {
          dataPromo = dataPromo.map((promo) =>
            promo.namaPromo == item.promo.namaPromo
              ? {
                  ...promo,
                  totalPenggunaan: promo.totalPenggunaan + 1,
                  totalPendapatan: promo.totalPendapatan + item.totalAkhir,
                }
              : promo
          );
        } else {
          dataPromo.push({
            namaPromo: item.promo.namaPromo,
            totalPenggunaan: 1,
            totalPendapatan: item.totalAkhir,
            jenis: item.promo.jenis
          });
        }
      }
    }
    const totalTransaksi = transaksi.length;


    res.status(200).json({ transaksi: transaksi, totalPendapatan: total, totalTransaksi: totalTransaksi, pelanggan: dataPelanggan, promo: dataPromo, })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanPenjualanProduk = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const penjualan = await TransaksiModels.find({ createdAt: { $gte: from, $lte: to } })
      .populate({
        path: "transaksiDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });
    let totalProduk = 0;
    let produklist = [];
    for (const item of penjualan) {
      for (const items of item.transaksiDetail) {
        totalProduk += items.jumlah;
        if (produklist.some(item => item.namaProduk == items.produk.namaProduk)) {
          produklist = produklist.map(item => item.namaProduk == items.produk.namaProduk ? { ...item, jumlah: item.jumlah + items.jumlah, pendapatan: item.pendapatan + (items.jumlah * items.produk.hargaJual) } : item)
        }
        else {
          const isi = {
            namaProduk: items.produk.namaProduk,
            jumlah: items.jumlah,
            pendapatan: (items.jumlah * items.produk.hargaJual)
          }
          produklist.push(isi)
        }
      }
    }

    res.status(200).json({ totalProduk: totalProduk, penjualanProduk: produklist })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanBelanja = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const belanja = await belanjaModels.find({ createdAt: { $gte: from, $lte: to } })
      .populate({
        path: "belanjaDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

    for (const item of belanja) {
    }
    const totalBelanja = belanja.length;

    res.status(200).json({ belanja: belanja, totalTransaksi: totalBelanja })
  }
  catch (error) {
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
        stok: item.stok
      }
      produkRes.push(res)
    }
    res.status(200).json({ produkRes })
  }
  catch (error) {
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
          id: item.id,
          namaProduk: item.namaProduk,
          stok: item.stok,
          minStok: item.minStok
        }
        produkRes.push(res)
      }

    }
    res.status(200).json(produkRes)
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanTerlaris = asyncHandler(async (req, res) => {
  try {
    const transaksi = await TransaksiModels.find()
      .populate({
        path: 'transaksiDetail',
        populate: {
          path: 'produk',
          model: 'produkPos',
          populate: [{
            path: 'kategori'
          },
          { path: 'jenis' }],
        }
      });
    let produklist = [];
    let kategorilist = [];
    for (const item of transaksi) {
      const det = item.transaksiDetail;
      for (const citem of det) {

        if (produklist.some(item => item.namaProduk == citem.produk.namaProduk)) {
          produklist = produklist.map(item => item.namaProduk == citem.produk.namaProduk ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          if (kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)) {
            kategorilist = kategorilist.map(item => item.kategori == citem.produk.kategori.kategori ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          }
          else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: (citem.jumlah * citem.produk.hargaJual),
              jenis: citem.produk.jenis.jenis
            }
            kategorilist.push(isi)
          }
        }
        else {
          const isi = {
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            pendapatan: (citem.jumlah * citem.produk.hargaJual),
            jenis: citem.produk.jenis.jenis
          }
          produklist.push(isi)
          if (kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)) {
            kategorilist = kategorilist.map(item => item.kategori == citem.produk.kategori.kategori ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          }
          else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: (citem.jumlah * citem.produk.hargaJual),
              jenis: citem.produk.jenis.jenis
            }
            kategorilist.push(isi)
          }
        }

      }


    }
    res.status(200).json({ produklist: produklist, kategorilist: kategorilist })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanGrafik = async (req, res) => {
  const { menu, tanggal } = req.body;

  if (!tanggal) {
    return res.status(400).json({ success: false, message: "tanggal is required" });
  }

  try {
    let startDate, endDate, groupBy;
    
    const dateObj = new Date(tanggal);
    dateObj.setHours(23, 59, 59, 999); // Normalize to end of the day

    if (menu === "mingguan") {
      startDate = new Date(dateObj);
      startDate.setDate(dateObj.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      endDate = dateObj;
      groupBy = "day";
    } 
    else if (menu === "bulanan") {
      startDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
      endDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      groupBy = "date";
    } 
    else if (menu === "tahunan") {
      startDate = new Date(dateObj.getFullYear(), 0, 1);
      endDate = new Date(dateObj.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
      groupBy = "month";
    } 
    else {
      return res.status(400).json({ success: false, message: "Invalid menu option" });
    }

    // Fetch transactions within the given range
    const transactions = await TransaksiModels.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    let reportData = [];

    if (groupBy === "day") {
      const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
      const startDayIndex = startDate.getDay();
      const orderedWeekDays = [...weekDays.slice(startDayIndex), ...weekDays.slice(0, startDayIndex)];

      reportData = orderedWeekDays.map(day => ({ name: day, penjualan: 0 }));

      transactions.forEach(transaction => {
        const transactionDayIndex = new Date(transaction.createdAt).getDay();
        const adjustedDayName = transactionDayIndex === 0 ? "Minggu" : weekDays[transactionDayIndex - 1];
        const dayData = reportData.find(day => day.name === adjustedDayName);
        if (dayData) dayData.penjualan += transaction.totalAkhir;
      });
    } 
    else if (groupBy === "date") {
      const totalDays = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
      reportData = Array.from({ length: totalDays }, (_, i) => ({ name: (i + 1).toString(), penjualan: 0 }));

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.createdAt).getDate();
        const dayData = reportData.find(day => day.name === transactionDate.toString());
        if (dayData) dayData.penjualan += transaction.totalAkhir;
      });
    } 
    else if (groupBy === "month") {
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      reportData = monthNames.map(month => ({ name: month, penjualan: 0 }));

      transactions.forEach(transaction => {
        const transactionMonth = new Date(transaction.createdAt).getMonth();
        reportData[transactionMonth].penjualan += transaction.totalAkhir;
      });
    }

    res.json({ success: true, transactions: reportData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const laporanGrafikProduk = async (req, res) => {
  try {
    const { menu, tanggal } = req.body;

    if (!tanggal) {
      return res.status(400).json({ success: false, message: "tanggal is required" });
    }

    let startDate, endDate, groupBy;

    const dateObj = new Date(tanggal);
    dateObj.setHours(23, 59, 59, 999); // Normalize to end of the day

    if (menu === "mingguan") {
      startDate = new Date(dateObj);
      startDate.setDate(dateObj.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      endDate = dateObj;
      groupBy = "day";
    } 
    else if (menu === "bulanan") {
      startDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
      endDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      groupBy = "date";
    } 
    else if (menu === "tahunan") {
      startDate = new Date(dateObj.getFullYear(), 0, 1);
      endDate = new Date(dateObj.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
      groupBy = "month";
    } 
    else {
      return res.status(400).json({ success: false, message: "Invalid menu option" });
    }

    // Fetch transactions within the given range
    const transactions = await TransaksiModels.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).populate({
      path: 'transaksiDetail',
      populate: {
        path: 'produk',
        model: 'produkPos'
      }
    });

    let reportData = [];
    let produklist = [];

    if (groupBy === "day") {
      const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
      const startDayIndex = startDate.getDay();
      const orderedWeekDays = [...weekDays.slice(startDayIndex), ...weekDays.slice(0, startDayIndex)];

      const transactionsByDay = new Map();
      orderedWeekDays.forEach(day => transactionsByDay.set(day, { name: day, penjualan: [] }));

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        const transactionDayIndex = transactionDate.getDay();
        const adjustedDayName = transactionDayIndex === 0 ? "Minggu" : weekDays[transactionDayIndex - 1];

        const dayData = transactionsByDay.get(adjustedDayName);
        if (!dayData) return;

        transaction.transaksiDetail.forEach(citem => {
          const existingProduct = dayData.penjualan.find(item => item.namaProduk === citem.produk.namaProduk);
          if (existingProduct) {
            existingProduct.jumlah += citem.jumlah;
            existingProduct.pendapatan += citem.jumlah * citem.produk.hargaJual;
          } else {
            dayData.penjualan.push({
              namaProduk: citem.produk.namaProduk,
              jumlah: citem.jumlah,
              pendapatan: citem.jumlah * citem.produk.hargaJual
            });
          }

          if (!produklist.find(item => item.namaProduk === citem.produk.namaProduk)) {
            produklist.push({ namaProduk: citem.produk.namaProduk });
          }
        });
      });

      reportData = Array.from(transactionsByDay.values());
    } 
    else if (groupBy === "date") {
      const totalDays = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
      reportData = Array.from({ length: totalDays }, (_, i) => ({ name: (i + 1).toString(), penjualan: [] }));

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.createdAt).getDate();
        const dayData = reportData.find(day => day.name === transactionDate.toString());
        if (!dayData) return;

        transaction.transaksiDetail.forEach(citem => {
          const existingProduct = dayData.penjualan.find(item => item.namaProduk === citem.produk.namaProduk);
          if (existingProduct) {
            existingProduct.jumlah += citem.jumlah;
            existingProduct.pendapatan += citem.jumlah * citem.produk.hargaJual;
          } else {
            dayData.penjualan.push({
              namaProduk: citem.produk.namaProduk,
              jumlah: citem.jumlah,
              pendapatan: citem.jumlah * citem.produk.hargaJual
            });
          }

          if (!produklist.find(item => item.namaProduk === citem.produk.namaProduk)) {
            produklist.push({ namaProduk: citem.produk.namaProduk });
          }
        });
      });
    } 
    else if (groupBy === "month") {
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      reportData = monthNames.map(month => ({ name: month, penjualan: [] }));

      transactions.forEach(transaction => {
        const transactionMonth = new Date(transaction.createdAt).getMonth();
        const monthData = reportData[transactionMonth];

        transaction.transaksiDetail.forEach(citem => {
          const existingProduct = monthData.penjualan.find(item => item.namaProduk === citem.produk.namaProduk);
          if (existingProduct) {
            existingProduct.jumlah += citem.jumlah;
            existingProduct.pendapatan += citem.jumlah * citem.produk.hargaJual;
          } else {
            monthData.penjualan.push({
              namaProduk: citem.produk.namaProduk,
              jumlah: citem.jumlah,
              pendapatan: citem.jumlah * citem.produk.hargaJual
            });
          }

          if (!produklist.find(item => item.namaProduk === citem.produk.namaProduk)) {
            produklist.push({ namaProduk: citem.produk.namaProduk });
          }
        });
      });
    }

    res.json({ success: true, penjualan: reportData, produklist: produklist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const laporanLogProduk = async (req, res) => {
  try {
    const { dari, sampai, id } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const produk = await ProdukModels.findById(id).populate('supplier')
    const namaPerusahaan = produk.supplier.namaPerusahaan
    let logProduk = []
    const transactions = await TransaksiModels.find({ updatedAt: { $gte: from, $lte: to } }).populate({
      path: 'transaksiDetail',
      populate: {
        path: 'produk',
        model: 'produkPos'
      }
    });
    
    // Kelompokkan transaksi berdasarkan hari
    transactions.length>0 && transactions.forEach(transaction => {

      const det = transaction.transaksiDetail;
      for (const citem of det) {

        if (citem.produk._id == id) {

          logProduk.push({
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            waktu: transaction.updatedAt,
            jenis : 'transaksi',
            id : transaction._id
          })

        } else {
        }

      }
    });

    const belanja = await belanjaModels.find({ updatedAt: { $gte: from, $lte: to } })
      .populate({
        path: "belanjaDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

      belanja.length>0 && belanja.forEach(beli => {

      const det = beli.belanjaDetail;
      for (const citem of det) {
        if (citem.produk._id == id) {

          logProduk.push({
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            waktu: beli.updatedAt,
            jenis : 'belanja',
            id : belanja._id
          })

        } else {
        }

      }
    });

    const kurangStok = await kurangStokModels.find({ updatedAt: { $gte: from, $lte: to } }).populate('produk')

    kurangStok.length>0 && kurangStok.forEach(beli => {

      
      if (beli.produk._id == id) {

          logProduk.push({
            namaProduk: beli.produk.namaProduk,
            jumlah: beli.jumlah,
            waktu: kurangStok.updatedAt,
            jenis : 'minStok',
            id : beli._id
          })

        } else {
        }

      
    });
    logProduk = logProduk.sort((a, b) => new Date(a.waktu) - new Date(b.waktu));


    // Konversi Map kembali ke array
    res.json({ success: true, logProduk: logProduk, supplier : namaPerusahaan });
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
  laporanGrafikProduk,
  laporanLogProduk
};

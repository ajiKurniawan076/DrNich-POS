import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./assets/navbar";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/Produk/products";
import { Laporan } from "./pages/laporan/reports";
import { Promo } from "./pages/Promo/promo";
import { USer } from "./pages/User/users";
import { Supplier } from "./pages/User/Supplier";
import { HomeAdmin } from "./pages/HomeAdmin";
import { Addsupplier } from "./pages/User/addsupplier";
import { SupplierDetail } from "./pages/User/SupplierDetail";
import { KategoriProduk } from "./pages/Produk/KategoriProduk";
import { DaftarProduk } from "./pages/Produk/daftarProduk";
import { RiwayatSupplier } from "./pages/User/RiwayatSupplier";
import { RiwayatDetail } from "./pages/User/RiwayatDetail";
import { DetailProduk } from "./pages/Produk/DetailProduk";
import { Terapis } from "./pages/User/Terapis";
import { Addterapis } from "./pages/User/addterapis";
import { TerapisDetail } from "./pages/User/TerapisDetail";
import { Marketing } from "./pages/User/Marketing";
import { MarketingAdd } from "./pages/User/MarketingAdd";
import { MarketingDetail } from "./pages/User/MarketingDetail";
import { Pelanggan } from "./pages/User/Pelanggan";
import { PelangganAnd } from "./pages/User/PelangganAdd";
import { PelangganDetail } from "./pages/User/PelangganDetail";
import { JenisProduct } from "./pages/Produk/JenisProduct";
import { JenisProductAdd } from "./pages/Produk/JenisProductApp";
import { JenisProductDetail } from "./pages/Produk/JenisProductDetail";
import { KategoriProduks } from "./pages/Produk/KategoriProduks";
import { KategoriProdukAdd } from "./pages/Produk/KategoriProdukApp";
import { KategoriProdukDetail } from "./pages/Produk/KategoriProdukDetail";
import { PelangganTransaksi } from "./pages/User/PelangganTransaksi";
import { DaftarProduk2 } from "./pages/Produk/daftarProduk2";
import { DaftarProdukAdd } from "./pages/Produk/daftarprodukadd";
import { DaftarBelanja } from "./pages/Produk/DaftarBelanja";
import { DetailDaftarBelanja } from "./pages/Produk/DetailDaftarBelanja";
import { PembelianStok } from "./pages/Produk/PembelianStok";
import { DaftarBelanja2 } from "./pages/Produk/DaftarBelanja2";
import { PembelianProduk } from "./pages/Produk/PembelianProduk";
import { PembayaranProduk } from "./pages/Produk/PembayaranProduk";
import { RiwayatProduk } from "./pages/User/RiwayatProduk";
import { DetailRiwayat } from "./pages/Produk/DetailRiwayat";
import { DetailRiwayatProduk } from "./pages/Produk/DetailRiwayatProduk";
import { ManajementStok } from "./pages/Produk/ManajementStok";
import { ManajementDetailProduk } from "./pages/Produk/ManajementDetailProduk";
import { ManajementKurangiStok } from "./pages/Produk/ManajementKurangiStok";
import { ManajementKurangiStok2 } from "./pages/Produk/ManajementKurangiStok2";
import { ManajementDetailStok } from "./pages/Produk/ManajementDetailStok";
import { ManajementLihatLogProduk } from "./pages/Produk/ManajementLihatLogProduk";
import { LaporanPenjualan } from "./pages/laporan/LaporanPenjualan";
import { LaporanRingkasanPenjualan } from "./pages/laporan/LaporanRingkasanPenjualan";
import { LaporanDataPenjualan } from "./pages/laporan/LaporanDataPenjualan";
import { LaporanPembayaran } from "./pages/laporan/LaporanPembayaran";
import { LaporanPenjualanDetail } from "./pages/laporan/LaporanPenjualanDetail";
import { LaporanMetodePembayaran } from "./pages/laporan/LaporanMetodePembayaran";
import { LaporanPenjualanProduk } from "./pages/laporan/LaporanPenjualanProduk";
import { LaporanProdukTerjual } from "./pages/laporan/LaporanProdukTerjual";
import { LaporanPilihPerbandingan } from "./pages/laporan/LaporanPilihPerbandingan";
import { LaporanPersediaan } from "./pages/laporan/LaporanPersediaan";
import { LaporanPersediaanDetail } from "./pages/laporan/LaporanPersediaanDetail";
import { LaporanLogProduk } from "./pages/laporan/LaporanLogProduk";
import { LaporanLogProduk2 } from "./pages/laporan/LaporanLogProduk2";
import { LaporanLogProduk3 } from "./pages/laporan/LaporanLogProduk3";
import { LaporanLogProduk4 } from "./pages/laporan/LaporanLogProduk4";
import { LaporanDataPembelianStok } from "./pages/laporan/LaporanDataPembelianStok";
import { LaporanProdukTerlaris } from "./pages/laporan/LaporanProdukTerlaris";
import { LaporanDataPembelianStokDetail } from "./pages/laporan/LaporanDataPembelianStokDetail";
import { Kasir } from "./pages/Penjualan/Kasir";
import { Kasir2 } from "./pages/Penjualan/Kasir2";
import { Kasir3 } from "./pages/Penjualan/Kasir3";
import { Kasir4 } from "./pages/Penjualan/Kasir4";
import { PilihPelanggan } from "./pages/Penjualan/PilihPelanggan";
import { DetailPelanggan } from "./pages/Penjualan/DetailPelanggan";
import { PilihPromo } from "./pages/Penjualan/PilihPromo";
import { KasirLengkap } from "./pages/Penjualan/KasirLengkap";
import { PilihPembayaran } from "./pages/Penjualan/PilihPembayaran";
import { DraftTransaksi } from "./pages/Penjualan/DraftTransaksi";
import { DraftTransaksi2 } from "./pages/Penjualan/DraftTransaksi2";
import { DraftTransaksi3 } from "./pages/Penjualan/DraftTransaksi3";
import { DraftTransaksi4 } from "./pages/Penjualan/DraftTransaksi4";
import { DraftTransaksi5 } from "./pages/Penjualan/DraftTransaksi5";
import { DaftarStokLimit } from "./pages/Stoklimit/DaftarStokLimit";
import { DetailDaftarStokLimit } from "./pages/Stoklimit/DetailDaftarStokLimit";
import { TambahDiskon } from "./pages/Promo/TambahDiskon";
import { TambahDiskon2 } from "./pages/Promo/TambahDiskon2";
import { TambahDiskon3 } from "./pages/Promo/TambahDiskon3";
import { TambahDiskon4 } from "./pages/Promo/TambahDiskon4";
import { TambahDiskon5 } from "./pages/Promo/TambahDiskon5";
import { Cashback } from "./pages/cashback/cashback";
import { Cashback2 } from "./pages/cashback/Cashback2";
import { Cashback3 } from "./pages/cashback/Cashback3";
import { Cashback4 } from "./pages/cashback/Cashback4";
import { Diskon } from "./pages/Promo/Diskon";
import Display from "./pages/display/Display";
import Sertifikat from "./pages/display/Sertifikat/Sertifikat";
import SertifikatDetail from "./pages/display/Sertifikat/SertifikatDetail";
import DisplaySertifikat from "./pages/display/Sertifikat/DisplaySertifikat";
import LayananKategori from "./pages/display/Layanan/LayananKategori";
import KategoriLayanan from "./pages/display/Layanan/KategoriLayanan";
import KategoriAdd from "./pages/display/Layanan/KategoriAdd";
import KategoriDetail from "./pages/display/Layanan/KategoriDetail";
import Layanan from "./pages/display/Layanan/Layanan";
import LayananAdd from "./pages/display/Layanan/LayananAdd";
import LayananDetail from "./pages/display/Layanan/LayananDetail";
import Produk from "./pages/display/Produk";
import KategoriProduk2 from "./pages/display/Produk/KategoriProduk/KategoriProduk2";
import TambahKategori from "./pages/display/Produk/KategoriProduk/TambahKategori";
import Detail1 from "./pages/display/Produk/KategoriProduk/Detail1";
import ProdukTipe from "./pages/display/Produk/tipeProduk/ProdukTipe";
import ProdukAddTipe from "./pages/display/Produk/tipeProduk/ProdukAddTipe";
import ProdukDetail from "./pages/display/Produk/tipeProduk/ProdukDetail";
import Produk1 from "./pages/display/Produk/DaftarProduk/Produk1";
import TambahProduk from "./pages/display/Produk/DaftarProduk/TambahProduk";
import Detail2 from "./pages/display/Produk/DaftarProduk/Detail2";
import Galeri from "./pages/display/Galeri/Galeri";
import GaleriAdd from "./pages/display/Galeri/GaleriAdd";
import GaleriDetail from "./pages/display/Galeri/GaleriDetail";
import Rating from "./pages/display/Rating/Rating";
import RetingAdd from "./pages/display/Rating/RetingAdd";
import RatingDetail from "./pages/display/Rating/RatingDetail";
import DiskonDetail from "./pages/Promo/DiskonDetail";
import CashbackDetail from "./pages/cashback/CashBackDetail";
import { TerapisUpdate } from "./pages/User/TerapisUpdate";
import { PelangganUpdate } from "./pages/User/PelangganUpdate";
import UpdateSertifikat from "./pages/display/Sertifikat/UpdateSertifikat";
import UpdateKategoti from "./pages/display/Layanan/UpdateKategoti";
import UpdateLayanan from "./pages/display/Layanan/UpdateLayanan";
import UpdateKategori from "./pages/display/Produk/KategoriProduk/UpdateKategori";
import UpdateTipeProduk from "./pages/display/Produk/tipeProduk/UpdateTipeProduk";
import UpdateDaftarProduk from "./pages/display/Produk/DaftarProduk/UpdateDaftarProduk";
import UpdateGaleri from "./pages/display/Galeri/UpdateGaleri";
import UpdateRating from "./pages/display/Rating/UpdateRating";
import { KategoriProdukUpdate } from "./pages/Produk/KategoriProdukUpdate";
import { DaftarProdukUpdate } from "./pages/Produk/DaftarProdukUpdate";
import { Editsupplier } from "./pages/User/EditSupplier";
import { UpdateMarketing } from "./pages/User/UpdateMarketing";
import { UpdateJenisProduk } from "./pages/Produk/UpdateJenisProduk";
import { ManajementTambahStok } from "./pages/Produk/ManajementTambahStok";
import { DaftarProdukByJenis } from "./pages/Produk/daftarProdukByJenis";
import { DaftarProdukByKategori } from "./pages/Produk/daftarProdukByKategori";
import { PembayaranBerhasil } from "./pages/Penjualan/PembayaranBerhasil";
import { EditDiskon } from "./pages/Promo/EditDiskon";
import { EditCashback } from "./pages/cashback/EditCashback";
import { Transaksihapus } from "./pages/laporan/transaksihapus";
import axios from "axios";
import {Mesin} from "./pages/display/Mesin/Mesin"
import {MesinDetail} from "./pages/display/Mesin/MesinDetail"
import {MesinEdit} from "./pages/display/Mesin/MesinEdit"
import {MesinTambah} from "./pages/display/Mesin/MesinTambah"
import TipeKulit from "./pages/display/Produk/TipeKulitProduk/TipeKulit"
import TipeKulitDetai from "./pages/display/Produk/TipeKulitProduk/TipeKulitDetail"
import { TipeKulitTambah } from "./pages/display/Produk/TipeKulitProduk/TipeKulitTambah";
import { TipeKulitEdit } from "./pages/display/Produk/TipeKulitProduk/TipeKulitEdit";

import { LaporanLihatStruk } from "./pages/laporan/LaporanLihatStruk";
import { StrukPembelianStok } from "./pages/laporan/StrukPembelianStok";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ProtectedLevel } from "./ProtectedLevel";

axios.defaults.withCredentials = true;

// import DetailDiskon from "./pages/display/DetailDiskon";

export const navContext = createContext();

function App2() {
  const [nav, setNav] = useState(null);
  const [link, setLink] = useState("");
  const [sort, setSort] = useState(false);
  const [asc, setasc] = useState("");
  const [showsort, setshowsort] = useState(false);

  return (
    <navContext.Provider
      value={{
        nav,
        setNav,
        sort,
        setSort,
        asc,
        setasc,
        showsort,
        setshowsort,
        link,
        setLink,
      }}
    >
      <div id="root2">
        <div id="root-container">
          <Navbar className="navbar" />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomeAdmin />} />
              <Route path="/users" element={<USer />} />
              <Route path="/produks" element={<Products />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/addsupplier" element={<Addsupplier />} />
              <Route path="/supplierdet/:id" element={<SupplierDetail />} />
              <Route path="/updatesupplier/:id" element={<Editsupplier />} />
              <Route path="/kategoriproduk/" element={<KategoriProduk />} />
              <Route path="/kategoridet/:Kategori" element={<DaftarProduk />} />
              <Route path="/kategoridet/" element={<DaftarProduk />} />
              <Route path="/riwayatsupplier/" element={<RiwayatSupplier />} />
              <Route path="/transdetail/:id" element={<RiwayatDetail />} />
              <Route path="/productdetail/:id" element={<DetailProduk />} />
              <Route
                path="/produkbyjenis/:jenis"
                element={<DaftarProdukByJenis />}
              />
              <Route
                path="/produkbykategori/:kategori"
                element={<DaftarProdukByKategori />}
              />
              <Route path="/terapis" element={<Terapis />} />
              <Route path="/addterapis" element={<Addterapis />} />
              <Route path="/terapisdetail/:id" element={<TerapisDetail />} />
              <Route path="/marketing/" element={<Marketing />} />
              <Route path="/addmarketing/" element={<MarketingAdd />} />
              <Route
                path="/marketingdetail/:id"
                element={<MarketingDetail />}
              />
              <Route
                path="/UpdateMarketing/:id"
                element={<UpdateMarketing />}
              />
              <Route path="/terapisdetail/:id" element={<TerapisDetail />} />
              <Route path="/pelanggan/" element={<Pelanggan />} />
              <Route path="/addpelanggan/" element={<PelangganAnd />} />
              <Route
                path="/pelanggandetail/:id"
                element={<PelangganDetail />}
              />
              <Route path="/jenisproduk/" element={<JenisProduct />} />
              <Route path="/addjenisproduk/" element={<JenisProductAdd />} />
              <Route
                path="/updatejenisproduk/:id"
                element={<UpdateJenisProduk />}
              />
              <Route
                path="/jenisprodukdetail/:id"
                element={<JenisProductDetail />}
              />
              <Route path="/kategoriproduks/" element={<KategoriProduks />} />
              <Route
                path="/addkategoriproduk/"
                element={<KategoriProdukAdd />}
              />
              <Route
                path="/kategoriprodukdetail/:id"
                element={<KategoriProdukDetail />}
              />
              <Route path="/transaksipelanggan/:id" element={<USer />} />
              <Route path="/daftarproduk/" element={<DaftarProduk2 />} />
              <Route path="/adddaftarproduk/" element={<DaftarProdukAdd />} />
              <Route path="/Produkdetail/:id" element={<DetailProduk />} />
              <Route path="/DaftarBelanja/" element={<DaftarBelanja />} />
              <Route
                path="/DetailDaftarBelanja/"
                element={<DetailDaftarBelanja />}
              />
              <Route path="/PembelianStok/" element={<PembelianStok />} />
              <Route path="/DaftarBelanja2/" element={<DaftarBelanja2 />} />
              <Route path="/PembelianProduk/" element={<PembelianProduk />} />
              <Route
                path="/PembayaranProduk/:id"
                element={<PembayaranProduk />}
              />
              <Route path="/RiwayatProduk/" element={<RiwayatProduk />} />
              <Route path="/DetailRiwayat/" element={<DetailRiwayat />} />
              <Route
                path="/DetailRiwayatProduk/"
                element={<DetailRiwayatProduk />}
              />
              <Route path="/ManajementStok/" element={<ManajementStok />} />
              <Route
                path="/ManajementDetailProduk/"
                element={<ManajementDetailProduk />}
              />
              <Route
                path="/ManajementKurangiStok/:id"
                element={<ManajementKurangiStok />}
              />
              <Route
                path="/ManajementTambahStok/:id"
                element={<ManajementTambahStok />}
              />
              <Route
                path="/ManajementKurangiStok2/"
                element={<ManajementKurangiStok2 />}
              />
              <Route
                path="/ManajementDetailStok/"
                element={<ManajementDetailStok />}
              />
              <Route
                path="/ManajementDetailStok/:id"
                element={<ManajementDetailStok />}
              />
              <Route
                path="/ManajementLihatLogProduk/"
                element={<ManajementLihatLogProduk />}
              />
              <Route path="/LaporanPenjualan/" element={<LaporanPenjualan />} />
              <Route
                path="/LaporanRingkasanPenjualan/"
                element={<LaporanRingkasanPenjualan />}
              />
              <Route
                path="/LaporanDataPenjualan/"
                element={<LaporanDataPenjualan />}
              />
              <Route
                path="/LaporanPembayaran/"
                element={<LaporanPembayaran />}
              />
              <Route
                path="/LaporanPenjualanDetail/"
                element={<LaporanPenjualanDetail />}
              />
              <Route
                path="/LaporanMetodePembayaran/"
                element={<LaporanMetodePembayaran />}
              />
              <Route
                path="/LaporanPenjualanProduk/"
                element={<LaporanPenjualanProduk />}
              />
              <Route
                path="/LaporanProdukTerjual/"
                element={<LaporanProdukTerjual />}
              />
              <Route
                path="/LaporanPilihPerbandingan/"
                element={<LaporanPilihPerbandingan />}
              />
              <Route
                path="/LaporanPersediaan/"
                element={<LaporanPersediaan />}
              />
              <Route
                path="/LaporanPersediaanDetail/"
                element={<LaporanPersediaanDetail />}
              />
              <Route path="/LaporanLogProduk/" element={<LaporanLogProduk />} />
              <Route
                path="/LaporanLogProduk2/"
                element={<LaporanLogProduk2 />}
              />
              <Route
                path="/LaporanLogProduk3/"
                element={<LaporanLogProduk3 />}
              />
              <Route
                path="/LaporanLogProduk4/"
                element={<LaporanLogProduk4 />}
              />
              <Route
                path="/LaporanDataPembelianStok/"
                element={<LaporanDataPembelianStok />}
              />
              <Route
                path="/LaporanProdukTerlaris/"
                element={<LaporanProdukTerlaris />}
              />
              <Route
                path="/LaporanDataPembelianStokDetail/"
                element={<LaporanDataPembelianStokDetail />}
              />
              <Route path="/Kasir/" element={<Kasir />} />
              <Route path="/Kasir2/" element={<Kasir2 />} />
              <Route path="/Kasir3/" element={<Kasir3 />} />
              <Route path="/Kasir4/" element={<Kasir4 />} />
              <Route path="/PilihPelanggan/" element={<PilihPelanggan />} />
              <Route path="/DetailPelanggan/" element={<DetailPelanggan />} />
              <Route path="/PilihPromo/" element={<PilihPromo />} />
              <Route path="/KasirLengkap/" element={<KasirLengkap />} />
              <Route
                path="/PilihPembayaran/:id"
                element={<PilihPembayaran />}
              />
              <Route path="/DrafTransaksi/" element={<DraftTransaksi />} />
              <Route path="/DrafTransaksi2/" element={<DraftTransaksi2 />} />
              <Route
                path="/DrafTransaksidetail/:id/"
                element={<DraftTransaksi3 />}
              />
              <Route path="/DrafTransaksi4/" element={<DraftTransaksi4 />} />
              <Route path="/DrafTransaksi5/" element={<DraftTransaksi5 />} />
              <Route path="/DaftarStokLimit/" element={<DaftarStokLimit />} />
              <Route
                path="/DetailDaftarStokLimit/"
                element={<DetailDaftarStokLimit />}
              />
              <Route path="/TambahDiskon/" element={<TambahDiskon />} />
              <Route path="/TambahDiskon2/" element={<TambahDiskon2 />} />
              <Route path="/TambahDiskon3/" element={<TambahDiskon3 />} />
              <Route path="/TambahDiskon4/" element={<TambahDiskon4 />} />
              <Route path="/TambahDiskon5/" element={<TambahDiskon5 />} />
              <Route path="/Cashback/" element={<Cashback4 />} />
              <Route path="/Cashback2/" element={<Cashback2 />} />
              <Route path="/tambahcashback/" element={<Cashback3 />} />
              <Route path="/Cashback4/" element={<Cashback4 />} />
              <Route path="/display" element={<Display />} />
              <Route path="/sertifikat" element={<Sertifikat />} />
              <Route path="/sertifikatdetail/:id" element={<SertifikatDetail />} />
              <Route
                path="/displaySertifikat"
                element={<DisplaySertifikat />}
              />
              <Route path="/layananKategori" element={<LayananKategori />} />
              <Route path="/kategoriLayanan" element={<KategoriLayanan />} />
              <Route path="/kategoriAdd" element={<KategoriAdd />} />
              <Route path="/kategoridetail/:id" element={<KategoriDetail />} />
              <Route path="/Layanan" element={<Layanan />} />
              <Route path="/layananAdd" element={<LayananAdd />} />
              <Route path="/layananDetail/:id" element={<LayananDetail />} />
              <Route path="/produk" element={<Produk />} />
              <Route path="/kategoriProduk2" element={<KategoriProduk2 />} />
              <Route path="/tambahKategori" element={<TambahKategori />} />
              <Route path="/Detail1/:id" element={<Detail1 />} />
              <Route path="/Produktipe" element={<ProdukTipe />} />
              <Route path="/produkAddtipe" element={<ProdukAddTipe />} />
              <Route path="/produkDetail1/:id" element={<ProdukDetail />} />
              <Route path="/produk1" element={<Produk1 />} />
              <Route path="/tambahProduk" element={<TambahProduk />} />
              <Route path="/Detail2/:di" element={<Detail2 />} />
              <Route path="/galeri" element={<Galeri />} />
              <Route path="/galeriAdd" element={<GaleriAdd />} />
              <Route path="/galeridetail/:id" element={<GaleriDetail />} />
              <Route path="/Rating" element={<Rating />} />
              <Route path="/RetingAdd" element={<RetingAdd />} />
              <Route path="/Ratingdetail/:id" element={<RatingDetail />} />
              <Route path="/diskonDetail/:id" element={<DiskonDetail />} />
              <Route path="/diskon" element={<Diskon />} />
              <Route path="/cashbackDetail/:id" element={<CashbackDetail />} />
              {/* belajar */}
              {/* end belajar */}
              <Route path="/terapisUpdate/:id" element={<TerapisUpdate />} />
              <Route
                path="/pelanggangupdate/:id"
                element={<PelangganUpdate />}
              />
              {/* belum ada id */}
              <Route
                path="/UpdateSertifikat/:id"
                element={<UpdateSertifikat />}
              />
              <Route
                path="/UpdateKategoriJenisProduct/:id"
                element={<UpdateKategori />}
              />
              <Route path="/UpdateLayanan" element={<UpdateLayanan />} />
              <Route
                path="/UpdateKategoriJenisTreatment/:id"
                element={<UpdateKategoti />}
              />
              <Route path="/UpdateTipeProduk" element={<UpdateTipeProduk />} />
              <Route
                path="/UpdateDaftarProduk"
                element={<UpdateDaftarProduk />}
              />
              <Route path="/UpdateGaleri" element={<UpdateGaleri />} />
              <Route path="/UpdateRating" element={<UpdateRating />} />
              <Route
                path="/KategoriProdukUpdate/:id"
                element={<KategoriProdukUpdate />}
              />
              <Route
                path="/DaftarProdukUpdate/:id"
                element={<DaftarProdukUpdate />}
              />
              <Route
                path="/pembayaranBerhasil/:id"
                element={<PembayaranBerhasil />}
              />
              <Route path="/EditDiskon/:id" element={<EditDiskon />} />
              <Route path="/EditCashback/:id" element={<EditCashback />} />
              <Route path="/transaksihapus" element={<Transaksihapus />} />
              <Route path="/Mesin" element={<Mesin />} />
              <Route path="/MesinTambah" element={<MesinTambah />} />
              <Route path="/MesinDetail/:id" element={<MesinDetail />} />
              <Route path="/MesinEdit/:id" element={<MesinEdit />} />
              <Route path="/TipeKulit" element={<TipeKulit/>} />
              <Route path="/TipeKulitDetail/:id" element={<TipeKulitDetai/>} />
              <Route path="/TipeKulitTambah" element={<TipeKulitTambah/>} />
              <Route path="/TipeKulitEdit/:id" element={<TipeKulitEdit/>} />
              {/* <Route path="/" element={<HomeAdmin />} /> */}

              <Route element={<ProtectedRoutes />}>
                <Route element={<ProtectedLevel level={[1,2,3,4]} />}>
                  <Route path="/laporan" element={<Laporan />} />
                  <Route path="/" element={<HomeAdmin />} />
                <Route path="/users" element={<USer />} />
                <Route path="/produks" element={<Products />} />

                <Route path="/promo" element={<Promo />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/addsupplier" element={<Addsupplier />} />
                <Route path="/supplierdet/:id" element={<SupplierDetail />} />
                <Route path="/updatesupplier/:id" element={<Editsupplier />} />
                <Route path="/kategoriproduk/" element={<KategoriProduk />} />
                <Route path="/kategoridet/:Kategori" element={<DaftarProduk />} />
                <Route path="/kategoridet/" element={<DaftarProduk />} />
                <Route path="/riwayatsupplier/" element={<RiwayatSupplier />} />
                <Route path="/transdetail/:id" element={<RiwayatDetail />} />
                <Route path="/productdetail/:id" element={<DetailProduk />} />
                <Route path="/produkbyjenis/:jenis" element={<DaftarProdukByJenis />} />
                <Route path="/produkbykategori/:kategori" element={<DaftarProdukByKategori />} />
                <Route path="/terapis" element={<Terapis />} />
                <Route path="/addterapis" element={<Addterapis />} />
                <Route path="/terapisdetail/:id" element={<TerapisDetail />} />
                <Route path="/marketing/" element={<Marketing />} />
                <Route path="/addmarketing/" element={<MarketingAdd />} />
                <Route path="/marketingdetail/:id" element={<MarketingDetail />} />
                <Route path="/UpdateMarketing/:id" element={<UpdateMarketing />} />
                <Route path="/terapisdetail/:id" element={<TerapisDetail />} />
                <Route path="/pelanggan/" element={<Pelanggan />} />
                <Route path="/addpelanggan/" element={<PelangganAnd />} />
                <Route path="/pelanggandetail/:id" element={<PelangganDetail />} />
                <Route path="/jenisproduk/" element={<JenisProduct />} />
                <Route path="/addjenisproduk/" element={<JenisProductAdd />} />
                <Route path="/updatejenisproduk/:id" element={<UpdateJenisProduk />} />
                <Route path="/jenisprodukdetail/:id" element={<JenisProductDetail />} />
                <Route path="/kategoriproduks/" element={<KategoriProduks />} />
                <Route path="/addkategoriproduk/" element={<KategoriProdukAdd />} />
                <Route path="/kategoriprodukdetail/:id" element={<KategoriProdukDetail />} />
                <Route path="/transaksipelanggan/:id" element={<USer />} />
                <Route path="/daftarproduk/" element={<DaftarProduk2 />} />
                <Route path="/adddaftarproduk/" element={<DaftarProdukAdd />} />
                <Route path="/Produkdetail/:id" element={<DetailProduk />} />
                <Route path="/DaftarBelanja/" element={<DaftarBelanja />} />
                <Route path="/DetailDaftarBelanja/" element={<DetailDaftarBelanja />} />
                <Route path="/PembelianStok/" element={<PembelianStok />} />
                <Route path="/DaftarBelanja2/" element={<DaftarBelanja2 />} />
                <Route path="/PembelianProduk/" element={<PembelianProduk />} />
                <Route path="/PembayaranProduk/:id" element={<PembayaranProduk />} />
                <Route path="/RiwayatProduk/" element={<RiwayatProduk />} />
                <Route path="/DetailRiwayat/" element={<DetailRiwayat />} />
                <Route path="/DetailRiwayatProduk/" element={<DetailRiwayatProduk />} />
                <Route path="/ManajementStok/" element={<ManajementStok />} />
                <Route path="/ManajementDetailProduk/" element={<ManajementDetailProduk />} />
                <Route path="/ManajementKurangiStok/:id" element={<ManajementKurangiStok />} />
                <Route path="/ManajementTambahStok/:id" element={<ManajementTambahStok />} />
                <Route path="/ManajementKurangiStok2/" element={<ManajementKurangiStok2 />} />
                <Route path="/ManajementDetailStok/" element={<ManajementDetailStok />} />
                <Route path="/ManajementDetailStok/:id" element={<ManajementDetailStok />} />
                <Route path="/ManajementLihatLogProduk/" element={<ManajementLihatLogProduk />} />
                <Route path="/LaporanPenjualan/" element={<LaporanPenjualan />} />
                <Route path="/LaporanRingkasanPenjualan/" element={<LaporanRingkasanPenjualan />} />
                <Route path="/LaporanDataPenjualan/" element={<LaporanDataPenjualan />} />
                <Route path="/LaporanPembayaran/" element={<LaporanPembayaran />} />
                <Route path="/LaporanPenjualanDetail/" element={<LaporanPenjualanDetail />} />
                <Route path="/LaporanMetodePembayaran/" element={<LaporanMetodePembayaran />} />
                <Route path="/LaporanPenjualanProduk/" element={<LaporanPenjualanProduk />} />
                <Route path="/LaporanProdukTerjual/" element={<LaporanProdukTerjual />} />
                <Route path="/LaporanPilihPerbandingan/" element={<LaporanPilihPerbandingan />} />
                <Route path="/LaporanPersediaan/" element={<LaporanPersediaan />} />
                <Route path="/LaporanPersediaanDetail/:_id" element={<LaporanPersediaanDetail />} />
                <Route path="/LaporanLogProduk/" element={<LaporanLogProduk />} />
                <Route path="/LaporanLogProduk2/" element={<LaporanLogProduk2 />} />
                <Route path="/LaporanLogProduk3/" element={<LaporanLogProduk3 />} />
                <Route path="/LaporanLogProduk4/" element={<LaporanLogProduk4 />} />
                <Route path="/LaporanDataPembelianStok/" element={<LaporanDataPembelianStok />} />
                <Route path="/LaporanProdukTerlaris/" element={<LaporanProdukTerlaris />} />
                <Route path="/LaporanDataPembelianStokDetail/" element={<LaporanDataPembelianStokDetail />} />
                <Route path="/Kasir/" element={<Kasir />} />
                <Route path="/Kasir2/" element={<Kasir2 />} />
                <Route path="/Kasir3/" element={<Kasir3 />} />
                <Route path="/Kasir4/" element={<Kasir4 />} />
                <Route path="/PilihPelanggan/" element={<PilihPelanggan />} />
                <Route path="/DetailPelanggan/" element={<DetailPelanggan />} />
                <Route path="/PilihPromo/" element={<PilihPromo />} />
                <Route path="/KasirLengkap/" element={<KasirLengkap />} />
                <Route path="/PilihPembayaran/:id" element={<PilihPembayaran />} />
                <Route path="/DrafTransaksi/" element={<DraftTransaksi />} />
                <Route path="/DrafTransaksi2/" element={<DraftTransaksi2 />} />
                <Route path="/DrafTransaksidetail/:id/" element={<DraftTransaksi3 />} />
                <Route path="/DrafTransaksi4/" element={<DraftTransaksi4 />} />
                <Route path="/DrafTransaksi5/" element={<DraftTransaksi5 />} />
                <Route path="/DaftarStokLimit/" element={<DaftarStokLimit />} />
                <Route path="/DetailDaftarStokLimit/" element={<DetailDaftarStokLimit />} />
                <Route path="/TambahDiskon/" element={<TambahDiskon />} />
                <Route path="/TambahDiskon2/" element={<TambahDiskon2 />} />
                <Route path="/TambahDiskon3/" element={<TambahDiskon3 />} />
                <Route path="/TambahDiskon4/" element={<TambahDiskon4 />} />
                <Route path="/TambahDiskon5/" element={<TambahDiskon5 />} />
                <Route path="/Cashback/" element={<Cashback4 />} />
                <Route path="/Cashback2/" element={<Cashback2 />} />
                <Route path="/tambahcashback/" element={<Cashback3 />} />
                <Route path="/Cashback4/" element={<Cashback4 />} />
                <Route path="/display" element={<Display />} />
                <Route path="/sertifikat" element={<Sertifikat />} />
                <Route path="/sertifikatdetail/:id" element={<SertifikatDetail />} />
                <Route path="/displaySertifikat" element={<DisplaySertifikat />} />
                <Route path="/layananKategori" element={<LayananKategori />} />
                <Route path="/kategoriLayanan" element={<KategoriLayanan />} />
                <Route path="/kategoriAdd" element={<KategoriAdd />} />
                <Route path="/kategoridetail/:id" element={<KategoriDetail />} />
                <Route path="/Layanan" element={<Layanan />} />
                <Route path="/layananAdd" element={<LayananAdd />} />
                <Route path="/layananDetail/:id" element={<LayananDetail />} />
                <Route path="/produk" element={<Produk />} />
                <Route path="/kategoriProduk2" element={<KategoriProduk2 />} />
                <Route path="/tambahKategori" element={<TambahKategori />} />
                <Route path="/Detail1/:id" element={<Detail1 />} />
                <Route path="/Produktipe" element={<ProdukTipe />} />
                <Route path="/produkAddtipe" element={<ProdukAddTipe />} />
                <Route path="/produkDetail1/:id" element={<ProdukDetail />} />
                <Route path="/produk1" element={<Produk1 />} />
                <Route path="/tambahProduk" element={<TambahProduk />} />
                <Route path="/Detail2/:di" element={<Detail2 />} />
                <Route path="/galeri" element={<Galeri />} />
                <Route path="/galeriAdd" element={<GaleriAdd />} />
                <Route path="/galeridetail/:id" element={<GaleriDetail />} />
                <Route path="/Rating" element={<Rating />} />
                <Route path="/RetingAdd" element={<RetingAdd />} />
                <Route path="/Ratingdetail/:id" element={<RatingDetail />} />
                <Route path="/diskonDetail/:id" element={<DiskonDetail />} />
                <Route path="/diskon" element={<Diskon />} />
                <Route path="/cashbackDetail/:id" element={<CashbackDetail />} />
                <Route path="/terapisUpdate/:id" element={<TerapisUpdate />} />
                <Route path="/pelanggangupdate/:id" element={<PelangganUpdate />} />
                <Route path="/UpdateSertifikat/:id" element={<UpdateSertifikat />} />
                <Route path="/UpdateKategoriJenisProduct/:id" element={<UpdateKategori />} />
                <Route path="/UpdateLayanan" element={<UpdateLayanan />} />
                <Route path="/UpdateKategoriJenisTreatment/:id" element={<UpdateKategoti />} />
                <Route path="/UpdateTipeProduk/:id" element={<UpdateTipeProduk />} />
                <Route path="/UpdateDaftarProduk/:id" element={<UpdateDaftarProduk />} />
                <Route path="/UpdateGaleri" element={<UpdateGaleri />} />
                <Route path="/UpdateRating" element={<UpdateRating />} />
                <Route path="/KategoriProdukUpdate/:id" element={<KategoriProdukUpdate />} />
                <Route path="/DaftarProdukUpdate/:id" element={<DaftarProdukUpdate />} />
                <Route path="/pembayaranBerhasil/:id" element={<PembayaranBerhasil />} />
                <Route path="/EditDiskon/:id" element={<EditDiskon />} />
                <Route path="/EditCashback/:id" element={<EditCashback />} />
                <Route path="/transaksihapus" element={<Transaksihapus />} />
                <Route path="/LaporanLihatStruk/:id" element={<LaporanLihatStruk />} />
                <Route path="/StrukPembelianStok/:id" element={<StrukPembelianStok />} />
                <Route path="/Mesin" element={<Mesin />} />
                <Route path="/MesinTambah" element={<MesinTambah />} />
                <Route path="/MesinDetail/:id" element={<MesinDetail />} />
                <Route path="/MesinEdit/:id" element={<MesinEdit />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </navContext.Provider>
  );
}

export default App2;

// EAC564
// C2A353
// bg-gradient-to-r from-[#EAC564] to-[#C2A353]

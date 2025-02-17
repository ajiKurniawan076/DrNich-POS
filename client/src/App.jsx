import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screen/auth/login";
// Beranda
import Beranda from "./screen/All/beranda.jsx";
//layanan
import ListLayanan from "./screen/Layanan/listLayanan.jsx";
import DetailJenisLayanan from "./screen/Layanan/detailJenisLayanan.jsx";
import DetailTreatment from "./screen/Layanan/DetailTreatment.jsx";
import ViewAllTreatment from "./screen/Layanan/viewAllTreatment.jsx";
import ListPaketLayanan from "./screen/Layanan/listPaketLayanan.jsx";
import DetailPaketTreatment from "./screen/Layanan/DetailPaketTreatment.jsx";
// profil
import Profil from "./screen/All/profile.jsx";
// galeri
import Galeri from "./screen/All/galeri.jsx";
//=====produk=====
import Produk from "./screen/produk/produk.jsx";
import ViewAllProduct from "./screen/produk/viewAllProduct.jsx";
// detailKategori
import DetailKategori from "./screen/produk/detailKategori.jsx";
// detailProduk
import DetailProduk from "./screen/produk/detailProduk.jsx";

//================

//promo
import Promo from "./screen/All/promo.jsx";
import DetailPromo from "./screen/All/detailPromo.jsx";
//pencarian
import Pencarian from "./screen/All/pencarian.jsx";
import Debug from "./screen/All/debug.jsx";

import SectionUlasan from "./components/SectionUlasan.jsx";
import OnDeveloping from "./screen/All/OnDeveloping.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/underdevelop" element={<OnDeveloping />} />
        <Route path="/testing" element={<SectionUlasan />} />
        <Route path="/" element={<Beranda />} />
        <Route path="/layanan" element={<ListLayanan />} />
        <Route
          path="/layanan/detail/:idJenis"
          element={<DetailJenisLayanan />}
        />
        <Route
          path="/layanan/detail/:idJenis/:idTreatment"
          element={<DetailTreatment />}
        />
        <Route
          path="/layanan/detailTreatment/:idTreatment"
          element={<DetailTreatment />}
        />
        <Route
          path="/layanan/detailPaketTreatment/:idTreatment"
          element={<DetailPaketTreatment />}
        />
        <Route
          path="/layanan/viewAllTreatment"
          element={<ViewAllTreatment />}
        />
        <Route path="/layanan/paketTreatment" element={<ListPaketLayanan />} />

        <Route path="/profil" element={<Profil />} />
        <Route path="/galeri" element={<Galeri />} />

        {/* ==============PRODUK================= */}

        <Route path="/produk" element={<Produk />} />
        {/* Detail Skincare */}
        <Route path="/produk/detailKategori/:id" element={<DetailKategori />} />
        <Route path="/produk/AllProduct" element={<ViewAllProduct />} />
        {/* Detail Produk */}
        <Route
          path="/produk/detailProduk/:idProduk"
          element={<DetailProduk />}
        />
        {/* ===================================== */}

        {/* PROMO */}
        <Route path="/promo" element={<Promo />} />
        <Route path="/promo/detail/:id" element={<DetailPromo />} />

        {/* Pencarian */}

        <Route path="/pencarian" element={<Pencarian />} />

        {/* Debug*/}
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </Router>
  );
}

export default App;

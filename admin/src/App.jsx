import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./screen/dashboard.jsx";

//layanan
import ListLayanan from "./screen/userDisplayUpdate/layanan/listLayanan.jsx";
import LayananUD from "./screen/userDisplayUpdate/layanan/layananUD.jsx";
import CreateLayanan from "./screen/userDisplayUpdate/layanan/createLayanan.jsx";
import EditJenisLayanan from "./screen/userDisplayUpdate/layanan/editJenisLayanan.jsx";

//promo
import ListPromo from "./screen/userDisplayUpdate/promo/listPromo.jsx";

//ulasan
import Ulasan from "./screen/userDisplayUpdate/ulasan/listUlasan.jsx";

//galeri
import ListGallery from "./screen/userDisplayUpdate/galery/listGallery.jsx";

//foto
import Sertif from "./screen/userDisplayUpdate/foto-sertif-mesin/sertif.jsx";
import Mesin from "./screen/userDisplayUpdate/foto-sertif-mesin/mesin.jsx";

//produk
import Produk from "./screen/userDisplayUpdate/produk/produk.jsx";
import AddProduct from "./screen/userDisplayUpdate/produk/AddProduct.jsx";
import EditProduct from "./screen/userDisplayUpdate/produk/EditProduct.jsx";

//pos
import { Home } from "./screen/POS/Home.jsx";
import { USer } from "./screen/POS/User/users.jsx";
import { Products } from "./screen/POS/Produk/products.jsx";
import { Laporan } from "./screen/POS/Laporan/reports.jsx";
import { Promo } from "./screen/POS/Promo/promo.jsx";
import App2 from "./App2.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* USER DISPLAY */}
          <Route path="/" element={<Dasboard />} />
          <Route path="/layanan" element={<ListLayanan />} />
          <Route path="/layanan/updateLayanan/:id" element={<LayananUD />} />
          <Route
            path="/layanan/editJenisLayanan/:id"
            element={<EditJenisLayanan />}
          />
          <Route path="/layanan/tambahLayanan" element={<CreateLayanan />} />
          <Route path="/listpromo" element={<ListPromo />} />
          <Route path="/galeri" element={<ListGallery />} />
          <Route path="/sertifikat" element={<Sertif />} />
          <Route path="/mesin" element={<Mesin />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/tambahproduk" element={<AddProduct />} />
          <Route path="/editProduk/:id" element={<EditProduct />} />
          <Route path="/ulasan" element={<Ulasan />} />

          {/* POS */}

          <Route path="/pos/*" element={<App2 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

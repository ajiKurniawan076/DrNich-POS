import React, { useEffect, useState } from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import axios from "axios";
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

// E-commerce Logos
import logoLazada from "../../assets/e-commerce/logoLazada.svg";
import logoShopee from "../../assets/e-commerce/logoShopee.svg";
import logoTokopedia from "../../assets/e-commerce/logoTokped.svg";
import logoTiktok from "../../assets/e-commerce/logoTikTokShop.svg";
import { sendWhatsAppProdukMessage } from "../../../../backend/controller/whatsappController.js";

function DetailProduk() {
  const { idProduk } = useParams();
  const navigate = useNavigate();

  const [idCategory, setIdCategory] = useState("");
  const [nama, setNama] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [manfaat, setManfaat] = useState("");
  const [caraPakai, setCaraPakai] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [tipeProduk, setTipeProduk] = useState("");

  const [selected, setSelected] = useState("deskripsi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/getprodukbyId/${idProduk}`
      );
      const data = response.data;

      setIdCategory(data.kategori._id);
      setNama(data.nama);
      setDescription(data.deskripsi);
      setImage(data.foto);
      setManfaat(data.manfaat);
      setCaraPakai(data.cara_pakai);
      setHarga(data.harga);
      setTipeProduk(data.tipeProduk.name);
      setKategori(data.kategori.name);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Error fetching data:", err);
    }
  };

  const changeSelected = (e, selectedSection) => {
    e.preventDefault();
    setSelected(selectedSection);
  };

  const handleNavEcommerce = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    fetchData();
  }, [idProduk]);

  return (
    <section className="flex flex-col items-center space-y-4">
      <div className="fixed w-full z-10">
        <Navbar selected={"Produk"} />
      </div>
      <div className="flex items-center w-[90%] lg:w-[80%] justify-start space-x-2 mt-4 pt-20">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal"
          aria-label="Back to Home">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/produk")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal"
          aria-label="Navigate to Layanan">
          Produk
        </a>
        <ArrowRightDisable />
        {idCategory && (
          <>
            <a
              onClick={() => navigate(`/produk/detailKategori/${idCategory}`)}
              className="cursor-pointer lg:text-sm text-xs text-disable-text font-normal"
              aria-label={`Navigate to ${idCategory}`}>
              {kategori}
            </a>
            <ArrowRightDisable />
          </>
        )}
        <span className="text-xs lg:text-sm text-disable-text font-normal">
          {nama}
        </span>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center mt-10">
          <h1 className="text-red-500 text-lg font-semibold">{error}</h1>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Retry
          </button>
        </div>
      ) : (
        <main className="w-[90%] lg:w-[80%] flex flex-col space-y-3 items-center">
          <section className="w-full mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="w-full lg:w-fit flex flex-col items-start">
              <div className="w-full relative rounded-lg">
                <img
                  src={image}
                  alt={nama}
                  className="w-full h-auto aspect-square lg:w-80 object-cover rounded-xl"
                />
                <div className="bg-secondary rounded-bl-lg rounded-tr-lg bg-opacity-80 h-fit p-2 px-4  w-fit absolute bottom-0 left-0 flex items-center justify-center">
                  <p className="font-SFPro font-extrabold text-white text-base lg:text-xl italic">
                    Rp {harga?.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-start mt-4">
                <p className="text-xs lg:text-base font-SFPro text-disable-text">
                  {tipeProduk}
                </p>
                <h1 className="text-base lg:text-lg font-medium font-SFPro text-secondary">
                  {nama}
                </h1>
              </div>
              <div className="w-full justify-between items-start mt-4 hidden lg:flex">
                <button className ="w-full bg-secondary text-white font-SFPro text-sm py-2 rounded-lg leading-tight tracking-tight hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] hover:shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15)]"
                  onClick={() => sendWhatsAppProdukMessage(nama)}
                >
                  Order Melalui WhatsApp
                </button>
              </div>
            </div>
            <div className="w-full flex lg:w-[65%] flex-col items-start mt-4 ">
              <div className="flex justify-around w-full  lg:w-full items-center border-b border-b-disable-line">
                <button
                  onClick={(e) => changeSelected(e, "deskripsi")}
                  className={`${
                    selected === "deskripsi"
                      ? "text-text border-b-secondary border-b "
                      : "text-disable-text"
                  } font-SFPro text-sm pb-2 px-2 lg:text-base w-1/3 transition-all ease-in-out duration-200`}>
                  Deskripsi
                </button>
                <button
                  onClick={(e) => changeSelected(e, "manfaat")}
                  className={`${
                    selected === "manfaat"
                      ? "text-text border-b-secondary border-b "
                      : "text-disable-text"
                  } font-SFPro text-sm pb-2 px-2 lg:text-base w-1/3 transition-all ease-in-out duration-200`}>
                  Manfaat
                </button>
                <button
                  onClick={(e) => changeSelected(e, "caraPakai")}
                  className={`${
                    selected === "caraPakai"
                      ? "text-text border-b-secondary border-b"
                      : "text-disable-text"
                  } font-SFPro text-sm pb-2 px-2 lg:text-base w-1/3 transition-all ease-in-out duration-200 `}>
                  Cara Pakai
                </button>
              </div>
              <div className="w-full flex flex-col items-start mt-4">
                {selected === "deskripsi" && (
                  <p className="text-xs font-SFPro text-text lg:text-base whitespace-pre-line">
                    {description}
                  </p>
                )}
                {selected === "manfaat" && (
                  <p className="text-xs font-SFPro text-text lg:text-base whitespace-pre-line">
                    {manfaat}
                  </p>
                )}
                {selected === "caraPakai" && (
                  <p className="text-xs font-SFPro text-text lg:text-base whitespace-pre-line">
                    {caraPakai}
                  </p>
                )}
              </div>
              <p className="w-full text-center font-SFPro text-xs text-disable-text py-4 lg:hidden">
                atau
              </p>
              <div className="w-full lg:w-3/5 flex flex-col items-start lg:mt-9">
                <h1 className="w-full text-secondary lg:text-lg  lg:text-text font-SFPro text-sm py-2 rounded-lg">
                  Beli di Store Kami
                </h1>
                <div className="flex justify-around items-center w-full">
                  <a
                    onClick={() =>
                      handleNavEcommerce("https://www.lazada.co.id/")
                    }>
                    <img
                      src={logoLazada}
                      alt="Lazada"
                      className="h-14 w-14 lg:h-16 lg:w-16"
                    />
                  </a>
                  <a
                    onClick={() => handleNavEcommerce("https://shopee.co.id/")}>
                    <img
                      src={logoShopee}
                      alt="Shopee"
                      className="h-14 w-14 lg:h-16 lg:w-16"
                    />
                  </a>
                  <a
                    onClick={() =>
                      handleNavEcommerce("https://www.tokopedia.com/")
                    }>
                    <img
                      src={logoTokopedia}
                      alt="Tokopedia"
                      className="h-14 w-14 lg:h-16 lg:w-16"
                    />
                  </a>
                  <a
                    onClick={() =>
                      handleNavEcommerce("https://www.tiktok.com/")
                    }>
                    <img
                      src={logoTiktok}
                      alt="TikTok"
                      className="h-12 w-12 lg:h-14 lg:w-14"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-start mt-4 lg:hidden">
              <button className="w-full bg-secondary text-white font-SFPro text-sm py-2 rounded-lg leading-tight tracking-tight hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] hover:shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15)] "
              onClick={() => sendWhatsAppProdukMessage(nama)}
              >
                Order Melalui WhatsApp
              </button>
            </div>
          </section>
          <section className="lg:w-full w-full">
            <LayananPopuler />
          </section>
          <section className="lg:w-full w-full">
            <ProdukTerbaru />
          </section>
        </main>
      )}
      <Footer />
    </section>
  );
}

export default DetailProduk;

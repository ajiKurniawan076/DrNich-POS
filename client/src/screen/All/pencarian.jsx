/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";
import LayananPopuler from "../../components/layananPopuler.jsx";
import GaleriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";

// IMAGE AND ICON
import klinik from "../../assets/img-profil/klinik.png";
import bgVM from "../../assets/img-profil/bgVisiMisi.png";
import bunga from "../../assets/img-profil/bungaIcon.svg";
import misiIcon from "../../assets/img-profil/misiIcon.svg";
import arrow from "../../assets/arrow-right.svg";
//image layanan
import facialglowacne from "../../assets/img-layanan/facialglowacne.png";
import laserhollywood from "../../assets/img-layanan/laserhollywood.png";

//  IMAGE & ICONS SERTIFKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

import { useSwipeable } from "react-swipeable";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation, useParams } from "react-router-dom";
import CardLayanan from "../../components/CardLayanan.jsx";
import ProdukCard from "../../components/ProdukCard.jsx";

function Pencarian() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [layanan, setlayanan] = useState([]);
  const [produk, setproduk] = useState([]);
  //Paging
  const [indexlayanan, setIndexL] = useState(0);
  const [indexProduk, setIndexP] = useState(0);
  const postPerPage = 4;
  const firstIndexL = indexlayanan * postPerPage;
  const firstIndexP = indexProduk * postPerPage;
  const lastIndexL = firstIndexL + postPerPage;
  const lastIndexP = firstIndexP + postPerPage;
  let recordLayanan = layanan.slice(firstIndexL, lastIndexL);
  let recordProduk = produk.slice(firstIndexP, lastIndexP);
  const npagelayanan = Math.ceil(layanan.length / postPerPage + 1);
  const npageproduk = Math.ceil(layanan.length / postPerPage + 1);
  const pageslayanan = [...Array(npagelayanan).keys()].slice(1);
  const pagesproduk = [...Array(npageproduk).keys()].slice(1);

  const prevL = () => {
    indexlayanan > 0 && setIndexL(indexlayanan - 1);
  };
  const nextL = () => {
    indexlayanan < npagelayanan - 2 && setIndexL(indexlayanan + 1);
  };

  const topageL = (id) => {
    setIndexL(id - 1);
  };
  const prevP = () => {
    indexProduk > 0 && setIndexP(indexProduk - 1);
  };
  const nextP = () => {
    indexProduk < npageproduk - 2 && setIndexP(indexProduk + 1);
  };

  const topageP = (id) => {
    setIndexP(id - 1);
  };
  //////////////////////

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // FETCH DATA
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const query = queryParam.get("query");
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/users/search?query=` +
            query
        )
      ).data;
      console.log(resLayanan);
      const sortlayanan = resLayanan.layanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      const sortproduk = resLayanan.produk.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setlayanan(sortlayanan);
      setproduk(sortproduk);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar selected={""} />
      <div className="mt-[18px]">
        <div className="flex-col">
          <div className="flex gap-[6px] mx-[25px] lg:mx-[120px]">
            <a
              href="/"
              className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Beranda
            </a>
            <img src={arrow} alt="" />
            <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Hasil Pencarian dari &quot;{query}&quot;
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center mt-[30px]">
          {/* Layanan */}
          <div className="w-full h-fit flex flex-col text-center">
            <h3 className="font-bold">Hasil Pencarian Layanan</h3>
            <div
              className={`w-full h-fit mt-5 grid grid-cols-1 place-items-center ${
                layanan.length > 0 ? "lg:grid-cols-3 lg:gap-4" : ""
              } gap-2`}>
              {recordLayanan.length > 0 ? (
                recordLayanan.map((item) => (
                  <div className="h-fit w-fit" key={item._id}>
                    <CardLayanan item={item} />
                  </div>
                ))
              ) : (
                <div className="flex w-full justify-center">
                  <h4 className="">Tidak Ada Data</h4>
                </div>
              )}
            </div>
            {recordLayanan.length > 0 && (
              <div className="flex gap-1 mt-4 justify-center text-gray-600">
                <button
                  className=" border-2 border-gray-700 hover:bg-gray-500 hover:text-white rounded-l-lg w-10"
                  onClick={() => {
                    prevL();
                  }}>
                  {" "}
                  {`<`}{" "}
                </button>
                {pageslayanan.map((n, i) => (
                  <button
                    className={`border-2 border-gray-700 h-10 hover:bg-gray-500 hover:text-white rounded-sm w-10 ${
                      indexlayanan === n - 1 && "text-white bg-gray-700"
                    }`}
                    key={i}
                    onClick={() => topageL(n)}>
                    {" "}
                    {n}{" "}
                  </button>
                ))}
                <button
                  className=" border-2 border-gray-700 hover:bg-gray-500 hover:text-white rounded-r-lg w-10"
                  onClick={() => {
                    nextL();
                  }}>
                  {" "}
                  {`>`}{" "}
                </button>
              </div>
            )}

            {/* Produk */}
            <h3 className="font-bold mt-3">Hasil Pencarian Produk</h3>
            <div
              className={`w-full h-fit mt-5 grid grid-cols-1 place-items-center ${
                produk.length > 0 ? "lg:grid-cols-4 lg:gap-4" : ""
              } gap-2`}>
              {recordProduk.length > 0 ? (
                recordProduk.map((item) => (
                  <div className="h-fit w-fit bg-black" key={item._id}>
                    <ProdukCard item={item} />
                  </div>
                ))
              ) : (
                <div className="flex w-full justify-center">
                  <h4 className="mb-2">Tidak Ada Data</h4>
                </div>
              )}
            </div>
            {recordProduk.length > 0 && (
              <div className="flex gap-1 mt-4 justify-center text-gray-600">
                <button
                  className=" border-2 border-gray-700 hover:bg-gray-500 hover:text-white rounded-l-lg w-10"
                  onClick={() => {
                    prevP();
                  }}>
                  {" "}
                  {`<`}{" "}
                </button>
                {pagesproduk.map((n, i) => (
                  <button
                    className={`border-2 border-gray-700 h-10 hover:bg-gray-500 hover:text-white rounded-sm w-10 ${
                      indexProduk === n - 1 && "text-white bg-gray-700"
                    }`}
                    key={i}
                    onClick={() => topageP(n)}>
                    {" "}
                    {n}{" "}
                  </button>
                ))}
                <button
                  className=" border-2 border-gray-700 hover:bg-gray-500 hover:text-white rounded-r-lg w-10"
                  onClick={() => {
                    nextP();
                  }}>
                  {" "}
                  {`>`}{" "}
                </button>
              </div>
            )}

            {/* Lihat Lainnya */}
            <div className="mt-6 h-full">
              <button className="w-[109px] h-[31px] text-[#c2a353] rounded-[10px] border border-[#c2a353] text-sm font-medium">
                Lihat Lainnya
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="lg:w-[70%] w-[90%]">
        <LayananPopuler />
      </section>
      <section className="lg:w-[70%] w-[90%]">
        <ProdukTerbaru />
      </section>
      <Footer />
    </>
  );
}

export default Pencarian;

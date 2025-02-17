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
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

function Pencarian() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [layanan, setlayanan] = useState([]);
  const [produk, setproduk] = useState([]);
  //Paging
  const [indexlayanan, setIndexL] = useState(0);
  const [indexProduk, setIndexP] = useState(0);
  const postPerPage = 6;
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

  const Pagination = ({ pages, currentIndex, onPrev, onNext, onPageClick }) => {
    return (
      <div className="flex gap-1 mt-4 justify-center text-gray-600">
        <button
          className="border-2 border-secondary hover:bg-secondary hover:text-white rounded-l-lg w-10"
          onClick={onPrev}>
          {"<"}
        </button>
        {pages.map((n, i) => (
          <button
            key={i}
            className={`border-2 border-secondary h-10 w-10 hover:bg-secondary hover:text-white rounded-sm ${
              currentIndex === n - 1 && "text-white bg-secondary"
            }`}
            onClick={() => onPageClick(n)}>
            {n}
          </button>
        ))}
        <button
          className="border-2 border-secondary hover:bg-secondary hover:text-white rounded-r-lg w-10"
          onClick={onNext}>
          {">"}
        </button>
      </div>
    );
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar selected={""} />
      <div className="mt-5 w-full flex flex-col items-center">
        {/* Breadcrumbs */}
        <div className="w-[90%] lg:w-[85%] flex justify-start gap-2">
          <a
            href="/"
            className="text-disable-text text-xs lg:text-sm font-SFPro">
            Beranda
          </a>
          <img src={arrow} alt="" />
          <p className="text-disable-text text-xs lg:text-sm font-SFPro">
            Hasil Pencarian dari &quot;{query}&quot;
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="w-[90%] lg:w-[85%] flex flex-col items-center mt-8">
            {/* If No Data Found, Show Only One Message */}
            {recordLayanan.length === 0 && recordProduk.length === 0 ? (
              <div className="w-full flex justify-center items-center mt-10">
                <h3 className="text-lg font-medium">Tidak Ada Data</h3>
              </div>
            ) : (
              <>
                {/* Layanan */}
                {recordLayanan.length > 0 && (
                  <section className="w-full text-center">
                    <h3 className="font-bold text-lg lg:text-xl w-full text-left   text-[#c2a353]">
                      Hasil Pencarian Layanan
                    </h3>
                    <div className="w-full mt-5 grid place-items-center gap-4 lg:grid-cols-3">
                      {recordLayanan.map((item) => (
                        <CardLayanan key={item._id} item={item} />
                      ))}
                    </div>

                    {/* Pagination Layanan */}
                    <Pagination
                      pages={pageslayanan}
                      currentIndex={indexlayanan}
                      onPrev={prevL}
                      onNext={nextL}
                      onPageClick={topageL}
                      color="#c2a353"
                    />
                  </section>
                )}

                {/* Produk */}
                {recordProduk.length > 0 && (
                  <section className="w-full text-center mt-6">
                    <h3 className="font-bold text-lg lg:text-xl w-full text-left  text-[#c2a353]">
                      Hasil Pencarian Produk
                    </h3>
                    <div className="w-full mt-5 grid place-items-center gap-4 lg:grid-cols-4">
                      {recordProduk.map((item) => (
                        <div key={item._id} className="rounded-lg p-3">
                          <ProdukCard item={item} />
                        </div>
                      ))}
                    </div>

                    {/* Pagination Produk */}
                    <Pagination
                      pages={pagesproduk}
                      currentIndex={indexProduk}
                      onPrev={prevP}
                      onNext={nextP}
                      onPageClick={topageP}
                      color="#c2a353"
                    />
                  </section>
                )}
              </>
            )}

            {/* Lihat Lainnya Button */}
            <div className="mt-6">
              <button className="w-28 h-8 text-[#c2a353] border border-[#c2a353] rounded-md text-sm font-medium transition-all hover:bg-[#c2a353] hover:text-white">
                Lihat Lainnya
              </button>
            </div>
          </div>
        )}
      </div>

      <section className="lg:w-[80%] w-[90%]">
        <LayananPopuler />
      </section>
      <section className="lg:w-[80%] w-[90%]">
        <ProdukTerbaru />
      </section>
      <Footer />
    </main>
  );
}

export default Pencarian;

/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";
import GaleriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru";

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

function Profile() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const [content, setContent] = useState([]);

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
  const fetchData = async () => {
    try {
      setLoading(true);
      const resLayanan = (await axios.get("/api/gallery/getAllGaleri")).data;
      console.log(resLayanan);
      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setContent(sorted);
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
      <Navbar selected={"Galeri"} />
      <div className="mt-[18px]">
        <div className="flex-col">
          <div className="flex gap-[6px] mx-[25px] lg:mx-[120px]">
            <a className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Beranda
            </a>
            <img src={arrow} alt="" />
            <p className="text-[#bdbdbd] text-xs font-nxormal font-SFPro tracking-tight lg:text-sm">
              Galeri
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col mt-[30px]">
          {/* Galeri */}
          <div className="w-full h-[600px] flex flex-col items-center">
            <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2">
              {content &&
                content.map((item) => (
                  <div key={item._id}>
                    <GaleriCard item={item} />
                  </div>
              ))}
            </div>

            {/* Lihat Lainnya */}
            <div className="mt-6 h-full">
              <button className="w-[109px] h-[31px] text-[#c2a353] text-xs font-normal rounded-[10px] border border-[#c2a353] text-sm font-medium">
                Lihat Lainnya
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 z-0 lg:mx-[120px]">
            {/* Layanan */}
           
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;

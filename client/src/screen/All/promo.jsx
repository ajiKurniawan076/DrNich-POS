import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";
import galeriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// promo
import PromoCard from "../../components/promoCard.jsx";

// IMAGE AND ICON
import arrow from "../../assets/arrow-right.svg";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";

function Promo() {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

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
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
        )
      ).data;

      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      console.log(sorted);
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
    <section className="flex flex-col items-center space-y-4">
      <div className="fixed w-full z-50">
        <Navbar selected={"Promo"} />
      </div>

      <div className="flex items-center w-[90%]  lg:w-4/5 justify-start space-x-2 mt-4 pt-20">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/promo")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Promo
        </a>
      </div>

      <h1 className="w-[80%] text-start text-2xl text-secondary hidden lg:block ">
        Promo
      </h1>
      {/* Promo */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 gap-2 w-full lg:w-[80%] ">
        {content &&
          content.map((item) => (
            <div key={item._id}>
              <PromoCard item={item} />
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-4 z-0 mx-auto lg:mx-[120px] w-[90%] lg:w-[80%] md:w-[80%] items-center">
        {/* Layanan */}
        <section className="lg:w-full w-full">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default Promo;

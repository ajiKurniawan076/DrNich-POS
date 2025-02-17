import React, { useState, useRef, useEffect } from "react";

import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import LayananPopuler from "../../components/layananPopuler.jsx";
import GaleriCard from "../../components/galeriCard.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru";

import { useNavigate } from "react-router-dom";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";

// IMAGE AND ICON
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [showAllContent, setShowAllContent] = useState(false);
  const [max, setMax] = useState(6); // Max number of items to display
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
      const resLayanan = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/gallery/getAllGaleri`
        )
      ).data;
      console.log(resLayanan);
      const sorted = resLayanan.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setContent(sorted);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  // Handle show more/less content
  const toggleShowAllContent = () => {
    setShowAllContent((prev) => !prev);
    // Toggle the max value between 6 and content.length
    setMax((prev) => (prev === 6 ? content.length : 6));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden">
      <Navbar selected={"Galeri"} />
      <div className="mt-[18px] flex flex-col w-full items-center">
        <div className="flex items-center w-[90%] lg:w-4/5  mx-auto justify-start space-x-2 mt-[18px] lg:mx-[120px]">
          <a
            onClick={() => navigate("/")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Beranda
          </a>
          <ArrowRightDisable />
          <a
            onClick={() => navigate("/galeri")}
            className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
            Galeri
          </a>
        </div>

        <div className="w-[90%] lg:w-4/5  h-full flex flex-col mt-[30px]">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="h-auto  flex flex-col items-start">
                <div className="w-fit h-full grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                  {content &&
                    content.slice(0, max).map((item) => (
                      <div
                        key={item._id}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `${item.link}`;
                        }}>
                        <GaleriCard item={item} />
                      </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mt-8">
                  {/* Show more/less button */}
                  {content.length > 5 && (
                    <button
                      onClick={toggleShowAllContent}
                      className="w-[109px] h-[31px] text-[#c2a353] text-xs font-normal rounded-[10px] border border-[#c2a353] text-sm font-medium">
                      {showAllContent ? "Show Less" : "Show All"}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Galeri */}

          <div className="flex flex-col gap-4 z-0 items-center">
            {/* Layanan */}
            <section className="w-full">
              <LayananPopuler />
            </section>
            <section className="w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;

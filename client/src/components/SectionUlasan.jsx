import React, { useState, useEffect, useRef } from "react";
import StarIcon from "../assets/star.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useDeviceType from "./CheckDevice.jsx";
import axios from "axios";

function SectionUlasan() {
  const [ulasan, setUlasan] = useState([]);
  const [progress, setProgress] = useState(1);
  const swiperRef = useRef(null);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/getAllUlasan`
        );
        setUlasan(response.data);
      } catch (error) {
        console.error(error?.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, []);

  const itemsPerSlide =
    deviceType === "mobile" ? 1 : deviceType === "tablet" ? 2 : 3;

  // ✅ Fixed Custom Pagination
  function CustomPagination({ progress, length, setProgress, itemsPerSlide }) {
    const slides = Math.ceil(length / itemsPerSlide);

    return (
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: slides }).map((_, i) => (
          <span
            key={i}
            className={`block cursor-pointer rounded-2xl transition-all ${
              Math.ceil(progress / itemsPerSlide) === i
                ? "w-[19px] h-2.5 bg-[#c2a353]"
                : "w-2.5 h-2.5 bg-[#dcdcdc]"
            }`}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideTo(i * itemsPerSlide);
              }
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="relative py-10 w-full mx-auto ">
      <main className="w-full flex lg:px-0 px-6 justify-between pb-[25px]">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Customer Punya Cerita
        </h1>
      </main>

      <div className="w-full flex justify-start items-center">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={deviceType === "mobile" ? "auto" : itemsPerSlide} // ✅ Mobile fix
          slidesPerGroup={deviceType === "mobile" ? 1 : itemsPerSlide}
          centeredSlides={deviceType === "mobile"}
          spaceBetween={deviceType === "mobile" ? 10 : 20} // ✅ Reduced space for mobile
          breakpoints={{
            320: { slidesPerView: "auto", slidesPerGroup: 1, spaceBetween: 10 }, // ✅ Fix mobile
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 100 },
          }}
          onSlideChange={(swiper) => setProgress(swiper.realIndex)}
          className="py-10 w-full">
          {ulasan.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center flex-shrink-0 w-[265px] max-w-[280px]" // ✅ Fixed width
            >
              <div className="bg-white w-[265px] h-[188px] lg:w-[361px] lg:h-[214px] rounded-lg shadow-md p-6 border border-gray-200">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {item.nama}
                    </p>
                    <div className="flex items-center gap-0">
                      {Array.from({ length: item.rating }, (_, index) => (
                        <img key={index} src={StarIcon} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Review Content */}
                <p className="mt-4 text-sm text-gray-600 line-clamp-5">
                  {item.ulasan}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Carousel */}

      {/* ✅ Fixed Pagination */}
      <CustomPagination
        progress={progress}
        length={ulasan.length}
        setProgress={setProgress}
        itemsPerSlide={itemsPerSlide}
      />
    </section>
  );
}

export default SectionUlasan;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function CardUlasan({ ulasan }) {

  const anjay = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  return (
    <>
      {/* Carousel Title */}
      <main className="w-full flex lg:px-0 px-6 justify-between">
        <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
          Customer Punya Cerita
        </h1>
      </main>

      {/* Carousel Component */}
      <Swiper
        className="pb-10 pt-20"
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={[anjay]}
        navigation={true}
        slidesPerView={"auto"} // Allow fractional slides for partial visibility
        spaceBetween={20} // Space between slides
        centeredSlides={true} // Center the active slide
      >
        {ulasan &&
          ulasan.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex-shrink-0 w-[280px]" // Fixed width for slides
            >
              <div className="flex flex-col mx-auto w-full h-[188px] gap-2 px-5 py-7 bg-white rounded-[10px] shadow-[0px_4px_4px_-1px_rgba(12,12,13,0.05)] border border-[#efefef]">
                {/* Header: Image and Name */}
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      src={item.foto}
                      alt={item.nama}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-[#464646] text-sm font-medium font-SFPro">
                      {item.nama}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xs">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="w-full">
                  <p className="text-[#464646] text-xs font-normal font-SFPro leading-tight tracking-tight">
                    {item.ulasan}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default CardUlasan;

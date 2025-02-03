import React from "react";
import { useNavigate } from "react-router-dom";

export default function PromoCard({ item }) {
  const navigate = useNavigate();
  const { nama, detail, foto } = item;

  return (
    <div
      className="w-[311px] lg:w-[325px] lg:h-[479px] h-[439px] flex flex-col mx-auto items-center border border-[#efefef] rounded-lg shadow-sm my-8"
      onClick={() => navigate(`/promo/detail/${item._id}`)} // Moved onClick here
    >
      <img
        className="w-full h-[328px] rounded-[5px] object-cover opacity-90"
        src={foto || "https://via.placeholder.com/80"} // Fallback if foto is unavailable
        alt={nama || "Thumbnail"}
      />
      <div className="flex flex-col bg-red w-full h-[111px] lg:h-[328px] items-center justify-center">
        <span className="text-secondary text-base w-[90%] font-medium font-SFPro leading-[25px] tracking-tight lg:text-base">
          {nama || "Nama Promo"}
        </span>
        <p className="h-10 text-[#bdbdbd] text-xs w-[90%] text-ellipsis font-normal font-SFPro leading-[20px] tracking-tight mt-1 line-clamp-3 lg:text-sm">
          {detail || "Detail promo tidak tersedia"}
        </p>
      </div>
    </div>
  );
}

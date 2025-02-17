import React from "react";
import { useNavigate } from "react-router-dom";

export default function PromoCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-[311px] lg:w-[325px] lg:h-[479px] h-[439px] flex flex-col mx-auto items-center border border-[#efefef] rounded-lg my-8
      shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] duration-300 transition-all ease-in-out hover:border-secondary"
      onClick={() => navigate(`/promo/detail/${item._id}`)} // Moved onClick here
    >
      <img
        className="w-full h-[328px] rounded-[5px] object-cover opacity-90"
        src={item.fotoMobile}
        alt={item.nama || "Thumbnail"}
      />
      <div className="flex flex-col bg-red w-full items-center justify-start mt-4">
        <span className="text-secondary lg:text-text text-base w-[90%] font-medium font-SFPro lg:text-lg leading-tight tracking-tight line-clamp-1">
          {item.nama || "Nama Promo"}
        </span>
        <p className=" text-text  text-xs w-[90%] text-ellipsis font-normal font-SFPro leading-[20px] tracking-tight mt-1 line-clamp-3 lg:text-base">
          {item.detail || "Detail promo tidak tersedia"}
        </p>
      </div>
    </div>
  );
}

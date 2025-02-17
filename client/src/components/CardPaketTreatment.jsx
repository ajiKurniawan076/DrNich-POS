import React from "react";
import { useNavigate } from "react-router-dom";

function CardPaketLayanan({ item, path }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[150px] h-[212px] bg-white rounded-[10px] border border-disable-text 
    flex flex-col items-center">
      <img
        src={item.image}
        alt={item.nama}
        className="w-full h-[150px] object-cover aspect-square rounded-[10px]"
      />
      <div className="w-full flex flex-col items-start">
        <h1 className="text-sm lg:text-base font-normal font-SFPro leading-tight tracking-tight text-text">
          {item.nama}
        </h1>
        <h1 className="text-gold pt-2 lg:pt-1 text-sm lg:text-base font-semibold text-secondary font-SFPro leading-tight tracking-tight">
          {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default CardPaketLayanan;

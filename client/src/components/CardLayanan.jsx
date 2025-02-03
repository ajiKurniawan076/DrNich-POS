import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./ArrowRight.jsx";

function CardLayanan({ item, path }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[184px] h-[276px] lg:w-[355px] lg:h-[276px] flex flex-col justify-start cursor-pointer items-center border border-disable-line rounded-lg p-1 shadow-sm bg-white
       duration-300 transition-all ease-in-out"
      onClick={() => navigate(`/layanan/detailTreatment/${item._id}`)}>
      <img
        src={item.image}
        alt={item.nama}
        className=" w-[184px] h-[174px] lg:w-[355px] lg:h-[174px] object-cover rounded-md"
      />

      <div className="flex flex-col justify-start items-start lg:mt-2 space-y-1 w-full h-24 px-2">
        <div className="flex items-center w-full justify-between pt-1 lg:pt-0">
          <h1 className="text-sm lg:text-base font-normal text-text font-SFPro  leading-tight tracking-tight">
            {item.nama}
          </h1>
        </div>

        {/* Apply 2-line clamp */}
        <p className="text-xs lg:text-sm text-disable-text font-light line-clamp-2 lg:line-clamp-1 leading-[17px] tracking-tight font-SFPro">
          {item.cardDeskripsi}
        </p>

        <h1 className="text-gold pt-2 lg:pt-1 text-sm lg:text-base font-semibold text-secondary font-SFPro leading-tight tracking-tight">
          Rp {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default CardLayanan;

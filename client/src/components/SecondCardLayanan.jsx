/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./ArrowRight";
function SecondCardLayanan({ item }) {
  return (
    <div className="group hover:bg-primary w-full h-32 lg:w-[504px] lg:h-[217px] flex space-x-2 justify-start cursor-pointer items-center border border-disable-line rounded-lg p-3 shadow-sm bg-white transition-all duration-300 ease-in-out">
      <img
        src={item.image}
        alt={item.nama}
        className="w-20 h-28 lg:w-[150px] lg:h-[187px] object-cover rounded-md py-1"
      />

      <div className="flex flex-col justify-between items-start space-y-1  w-full h-24 lg:h-40 ">
        <div className="w-full ">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-sm lg:text-base font-medium font-SFPro text-secondary leading-5 group-hover:text-white  transition-all duration-300 ease-in-out">
              {item.nama}
            </h1>
            <ArrowRight className="w-4 h-4 text-gold" />
          </div>

          {/* Apply 2-line clamp */}
          <p className="text-xs lg:text-sm text-text mt-1 font-normal leading-4 line-clamp-2 lg:line-clamp-4 group-hover:text-white  transition-all duration-300 ease-in-out">
            {item.deskripsi}
          </p>
        </div>

        <h1 className="text-gold mt-4 text-base lg:text-base font-medium text-secondary font-SFPro group-hover:text-white  transition-all duration-300 ease-in-out">
          Rp {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default SecondCardLayanan;

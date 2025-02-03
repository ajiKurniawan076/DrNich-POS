/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "../icon/ArrowRight.jsx";
import "./extend.css"; // Ensure this import

function CardLayanan({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[326px] h-[116px] flex cursor-pointer items-center space-x-4 border border-disable-line rounded-lg p-2 shadow-sm bg-white"
      onClick={() => navigate(`/layanan/updateLayanan/${item._id}`)}>
      <img
        src={item.image}
        alt={item.nama}
        className="w-24 h-24 object-cover rounded-md"
      />

      <div className="flex flex-col justify-center w-[60%] h-24">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-sm font-semibold text-gray-800 font-SFPro ">
            {item.nama}
          </h1>
          <ArrowRight className="w-4 h-4 text-gold" />
        </div>

        {/* Apply 2-line clamp */}
        <p className="text-xs text-text line-clamp-2">{item.deskripsi}</p>

        <h1 className="text-gold text-sm font-semibold">
          Rp {item.harga?.toLocaleString("id-ID")}
        </h1>
      </div>
    </div>
  );
}

export default CardLayanan;

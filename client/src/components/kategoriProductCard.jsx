import React from "react";
import { useNavigate } from "react-router-dom";

export default function KategoriProductCard({ item }) {
  const { name, image } = item;
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-4 lg:gap-8 "
      onClick={() => navigate(`/produk/detailKategori/${item._id}`)}>
      <img
        className="w-60 lg:w-[300px] lg:h-[280px] rounded-[10px] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] hover:shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out"
        src={image || "https://via.placeholder.com/80"}
        alt={name || "Thumbnail"}
      />
      <p className="text-center text-[#c2a353] text-xl font-medium font-SFPro leading-[25px] tracking-tight">
        {name || "Jenis Produk"}
      </p>
    </div>
  );
}

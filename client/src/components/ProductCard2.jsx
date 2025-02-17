/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
function ProdukCard({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center justify-center"
        onClick={() => navigate(`/produk/detailProduk/${item._id}`)}>
        <div className="w-fit h-[17rem] rounded-[10px] p-2 bg-white border border-disable-line flex flex-col">
          <img
            src={item.foto}
            className="w-[155px] bg-red-100 h-[155px] object-fill mx-auto mt-1 rounded-xl"
            alt=""
          />
          <p className="w-full max-w-[155px]   text-[#464646] text-left text-sm mt-1 lg:mt-2 font-normal font-SFPro leading-tight tracking-tight line-clamp-2">
            {item.nama}
          </p>
          {/* type shi */}
          <div className="flex items-center gap-2  text-[#bdbdbd] text-xs font-medium font-SFPro leading-tight tracking-tight">
            <p className="text-xs font-medium font-SFPro leading-tight tracking-tight">
              {item.kategori?.name}
            </p>
            <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
            <p className="text-xs font-medium  font-SFPro w-full leading-tight tracking-tight">
              {item.tipeProduk?.name}
            </p>
          </div>
          {/* harga */}
          <div className="flex items-center gap-2 text-[#c2a353] my-2  text-base font-bold font-SFPro leading-tight tracking-tight">
            <p>Rp {item.harga?.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdukCard;

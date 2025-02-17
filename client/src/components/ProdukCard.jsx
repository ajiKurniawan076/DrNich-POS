/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
function ProdukCard({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="lg:w-[184px] w-48 lg:h-[276px] h-72 flex flex-col justify-start cursor-pointer items-center border border-disable-line rounded-lg p-1 shadow-sm bg-white
        hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)] hover:shadow-[0px_8px_12px_6px_rgba(0,0,0,0.15)] 
       duration-300 transition-all ease-in-out"
        onClick={() => navigate(`/produk/detailProduk/${item._id}`)}>
        <img
          src={item.foto}
          alt={item.nama}
          className=" w-[184px] h-[174px] object-cover rounded-md"
        />

        <div className="flex flex-col justify-start items-start lg:mt-2 space-y-1 w-full h-24 px-2">
          <div className="flex items-center w-full justify-between pt-1 lg:pt-0">
            <h1 className="text-sm font-normal text-text font-SFPro  leading-tight tracking-tight">
              {item.nama}
            </h1>
          </div>

          {/* Apply 2-line clamp */}
          <p className="flex items-center space-x-2 text-xs lg:text-sm text-disable-text font-light leading-[17px] tracking-tight font-SFPro">
            <p>{item.kategori?.name}</p>
            <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
            <p>{item.tipeProduk?.name}</p>
          </p>

          <h1 className="text-gold pt-2 lg:pt-0 text-sm lg:text-base font-semibold text-secondary font-SFPro leading-tight tracking-tight">
            Rp {item.harga?.toLocaleString("id-ID")}
          </h1>
        </div>
      </div>
    </>
  );
}

export default ProdukCard;

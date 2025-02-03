/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import ArrowRight from "./ArrowRight.jsx";
import { useNavigate } from "react-router-dom";

function CardJenisLayanan({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="group hover:bg-primary flex flex-col w-[154px] lg:w-[230px] max-w-[230px] h-auto bg-white p-2 rounded-lg justify-center items-center duration-300 cursor-pointer ease-in-out transition-all border border-disable-line"
      onClick={() => navigate(`/layanan/detail/${item._id}`)}>
      <img
        src={item.foto}
        alt={item.nama}
        className="w-[127px] h-[141px] lg:w-[200px] lg:h-[222px] object-cover rounded-md"
      />
      <div className="flex w-[127px] lg:w-[200px] justify-between items-center mt-2 lg:mt-2">
        <h1 className="font-normal text-sm lg:text-base font-SFPro text-gray-700 truncate group-hover:text-white leading-tight tracking-tight">
          {item.nama}
        </h1>
        <ArrowRight />
      </div>
    </div>
  );
}

export default CardJenisLayanan;

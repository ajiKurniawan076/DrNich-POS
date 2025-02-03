/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import ArrowRight from "../icon/ArrowRight.jsx";
import { useNavigate } from "react-router-dom";

function CardJenisLayanan({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-[154px] lg:w-[230px] max-w-[230px] h-auto bg-white p-2 rounded-lg justify-center items-center border border-disable-line shadow-sm"
      onClick={() => navigate(`/layanan/editJenisLayanan/${item._id}`)}>
      <img
        src={item.foto}
        alt={item.nama}
        className="w-[127px] h-[141px] lg:[180px] object-cover rounded-md"
      />
      <div className="flex w-[127px] justify-between items-center  mt-2">
        <h1 className="font-medium text-base sm:text-sm text-text  truncate">
          {item.nama}
        </h1>
        <ArrowRight />
      </div>
    </div>
  );
}

export default CardJenisLayanan;

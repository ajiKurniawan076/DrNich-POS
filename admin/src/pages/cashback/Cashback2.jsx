import React, { createContext, useContext, useState } from "react";
import { navContext } from "../../App2";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";

export const Cashback2 = () => {
  const { setNav, setLink } = useContext(navContext);

  setNav("Produk");
  document.title = "Produk";
  return (
    <div className="flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]">
      <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
        <img src={iCari} alt="Cari" />
        <input
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <form className="h-full">
        <div className="flex justify-between mt-4">
          <div className="relative w-full mt-1">
            <select
              name="options"
              id="kategoriproduk"
              className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              aria-label="Kategori Produk"
            >
              <option value="" selected className="text-gray-300">
                Semua Jenis
              </option>
              <option value="pria">Diskon1</option>
              <option value="wanita">Diskon2</option>
            </select>
            <img
              src={iPanahB}
              alt="Dropdown icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
            />
          </div>
          <div className="relative w-full mt-1">
            <select
              name="options"
              id="kategoriproduk"
              className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              aria-label="Kategori Produk"
            >
              <option value="" selected className="text-gray-300">
                Semua Kategori
              </option>
              <option value="pria">Diskon1</option>
              <option value="wanita">Diskon2</option>
            </select>
            <img
              src={iPanahB}
              alt="Dropdown icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
            />
          </div>
        </div>
        <div className="flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2">
          <p>Facial glow acne</p>
          <p className="text-[#BDBDBD]">Jasa | facial series</p>
        </div>

        <div className="flex items-end h-full">
          <button className="flex justify-between text-white text-[14px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] p-4 px-5 rounded-xl w-full">
            <p>Tambah</p>
            <p>| 5 Produk</p>
          </button>
        </div>
      </form>
    </div>
  );
};

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AiOutlineUser, AiOutlineRead, AiFillFolderAdd, AiFillDatabase, AiOutlineFile, AiOutlineBook, AiOutlineAlert, AiOutlineFileZip, AiOutlineShop } from "react-icons/ai"
import { navContext } from "../App2"
import Ava from "../assets/img.svg";
import iUser from "../assets/iconuser.svg";
import iProduk from "../assets/iconproduk.svg";
import iLaporan from "../assets/iconlaporan.svg";
import iPromo from "../assets/iconpromo.svg";
import iStat from "../assets/iconstatistik.svg";
import iPenj from "../assets/iconpenjuala.svg";


export const modalContext = createContext(null)
export const HomeAdmin = () => {
  const { setNav } = useContext(navContext);

  useEffect(() => {
    setNav('home');
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Super Admin section */}
      <div className="admin-section">
        <div className="grid z-50 absolute top-4 place-items-center">
          <img src={Ava} className="rounded-full h-auto w-[100px]" />
          <h5 className="bottom-[-10px]">Super Admin</h5>
        </div>
      </div>

      {/* Grid items */}
      <div className="relative w-full h-full rounded-t-[2rem] bg-white justify-center pt-28">
        <div>
          <div className="grid-container grid-cols-2 md:grid-cols-3 place-items-center">
            {/* Data User */}
            <a
              href="pos/users"
              className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300"
            >
              <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
                <img src={iUser} color="brown" size={50} className="w-[50px] h-[50px]" />
                Data User
              </span>
            </a>

            {/* Produk */}
            <a
              href="pos/produks"
              className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300"
            >
              <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
              <img src={iProduk} color="brown" size={50} className="w-[50px] h-[50px]" />
                Produk
              </span>
            </a>

            {/* Other Links */}
            <a href="pos/laporan" 
              className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300">
              <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
              <img src={iLaporan} color="brown" size={50} className="w-[50px] h-[50px]" />
                Laporan
              </span>
            </a>
            <a href="pos/promo" 
              className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300">
              <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
              <img src={iPromo} color="brown" size={50} className="w-[50px] h-[50px]" />
                Promo
              </span>
            </a>
            <a href="pos/statistik" 
              className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300">
            <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
            <img src={iStat} color="brown" size={50} className="w-[50px] h-[50px]" />
                Statistik
              </span>
            </a>
            <a href="pos/Kasir" 
                   className="h-[125px] w-[150px] group relative z-20 group-hover:z-30 group-hover:scale-105 transition-all duration-300">
              <span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-105 duration-300 flex flex-col justify-center items-center font-bold">
              <img src={iPenj} color="brown" size={50} className="w-[50px] h-[50px]" />
                Penjualan
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

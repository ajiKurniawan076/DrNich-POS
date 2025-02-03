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
    <div className="w-full h-full  overflow-auto mb-8 md:mb-0">
      {/* Super Admin section */}
      <div className="admin-section">
        <div className="grid z-50 absolute top-4 place-items-center">
          <img src={Ava} className="rounded-full h-auto w-[100px]" />
          <h5 className="mt-3 font-semibold text-[16px]">Super Admin</h5>
        </div>
      </div>

      {/* Grid items */}
      <div className=" w-full h-full rounded-t-[2rem] bg-white flex justify-center pt-28">
        <div className="w-fit h-fit flex justify-center items-center">
          <div className="grid-container md:gap-[50px] gap-[20px] grid-cols-2 md:grid-cols-3 place-items-center">
            {/* Data User */}
            <a
              href="pos/users"
              className=" h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl"
            >
              <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
                <img src={iUser} color="brown" className="w-[36px] h-[36px]" />
                Data User
              </span>
            </a>

            {/* Produk */}
            <a
              href="pos/produks"
              className="h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl"
            >
              <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
              <img src={iProduk} color="brown" className="w-[36px] h-[36px]" />
                Produk
              </span>
            </a>

            {/* Other Links */}
            <a href="pos/laporan" 
              className="h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl">
              <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
              <img src={iLaporan} color="brown" className="w-[36px] h-[36px]" />
                Laporan
              </span>
            </a>
            <a href="pos/promo" 
              className="h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl">
              <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
              <img src={iPromo} color="brown" className="w-[36px] h-[36px]" />
                Promo
              </span>
            </a>
            <a href="pos/display" 
              className="h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl">
            <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
            <img src={iStat} color="brown" className="w-[36px] h-[36px]" />
                Statistik
              </span>
            </a>
            <a href="pos/Kasir" 
                   className="h-[125px] w-[150px] z-20 p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl">
              <span className="gap-[15px] bg-white h-full w-full border border-[#C2A353] rounded-xl md:rounded-xl flex flex-col justify-center items-start py-[20px] px-[25px] font-medium text-[14px]">
              <img src={iPenj} color="brown" className="w-[36px] h-[36px]" />
                Penjualan
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

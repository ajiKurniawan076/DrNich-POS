import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AiOutlineUser, AiOutlineRead, AiFillFolderAdd, AiFillDatabase, AiOutlineFile, AiOutlineBook, AiOutlineAlert, AiOutlineFileZip, AiOutlineShop } from "react-icons/ai"
import Ava from "../../assets/icon/POS/img.svg";
import iUser from "../../assets/icon/POS/iconuser.svg";
import iProduk from "../../assets/icon/POS/iconproduk.svg";
import iLaporan from "../../assets/icon/POS/iconlaporan.svg";
import iPromo from "../../assets/icon/POS/iconpromo.svg";
import iStat from "../../assets/icon/POS/iconstatistik.svg";
import iPenj from "../../assets/icon/POS/iconpenjuala.svg";
import { NavbarPos } from "./components/Navbar"


export const modalContext = createContext(null)
export const Home = () => {

  return (
    <div className="flex bg-gradient-to-l from-[#C2A353] to-[#EAC564] flex-col w-full h-[100vh]">
        <NavbarPos/>
      <div className="flex h-[70px] relative justify-center">
        <div className="grid z-20 absolute top-[-20] place-items-center font-bold">
        <img src={Ava} className="rounded-full  h-[100px] w-[100px]">
        </img>
        <p classname='bottom-[-10px]'>Super Admin</p>
        </div>
      </div>
      <div className="relative bg-white z-10 w-full h-full rounded-t-[2rem] justify-center">
        
        <div className='duration-300 px-10 absolute top-20  w-full h-full min-h-[400px] grid grid-cols-2 lg:grid-cols-3 items-center gap-x-0 gap-y-0 place-items-center'>

<a href="pos/user" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iUser} color="brown" size={50} className='w-[50px] h-[50px]' />Data User</span></a>
<a href="pos/produks" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iProduk } color="brown" size={50} className='w-[50px] h-[50px]' />Produk</span></a>
<a href="pos/laporan" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iLaporan} color="brown" size={50} className='w-[50px] h-[50px]' />Laporan</span></a>
<a href="pos/promo" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iPromo} color="brown" size={50} className='w-[50px] h-[50px]' />Promo</span></a>
<a href="pos/statistik" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iStat} color="brown" size={50} className='w-[50px] h-[50px]' />Statistik</span></a>
<a href="pos/penjualan" className="h-[125px] w-[150px] "><span className="bg-white h-[125px] w-[150px] border-2 border-yellow-700 rounded-2xl md:rounded-xl hover:scale-150 duration-300 flex flex-col justify-center items-center font-bold"><img src={iPenj} color="brown" size={50} className='w-[50px] h-[50px]' />Penjualan</span></a>

</div>
        
      </div>
      </div>
     
        
  )
}

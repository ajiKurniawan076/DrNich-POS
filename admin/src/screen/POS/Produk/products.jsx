import { AiOutlineBorderLeft, AiOutlineLineHeight, AiOutlineMenu, AiOutlineMenuFold, AiOutlineRight, AiOutlineShop, AiOutlineUp, AiOutlineVerticalLeft } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { RxAlignCenterVertically } from "react-icons/rx"
import { useContext, useEffect } from "react"
import iDaf from "../../../assets/icon/POS/iconproduk/iDaf.svg";
import iKat from "../../../assets/icon/POS/iconproduk/iKat.svg";
import iMan from "../../../assets/icon/POS/iconproduk/iMan.svg";
import iPro from "../../../assets/icon/POS/iconproduk/iPro.svg";
import iPem from "../../../assets/icon/POS/iconproduk/iPem.svg";
import iLine from "../../../assets/icon/POS/iLine.svg";
import { NavbarPosActive } from "../components/NavbarPosActive"

export const Products = () => {
  document.title = '  Products'

  return (
    <div className="flex bg-gradient-to-l from-[#C2A353] to-[#EAC564] flex-col w-full h-[100vh]">
            <NavbarPosActive Title={'User'}/>
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">  
    
    <a href="jenisproduk" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPro} className="ms-[25px]"/><p className="ms-[15px]">Jenis Produk</p>
        <div className="flex ms-auto me-[15px]">
        <AiOutlineRight className="text-yellow-300" size={15}/>
        <AiOutlineRight className="text-yellow-600" size={15}/>
        </div>
        </span></a>

        <a href="kategoriproduks" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iKat} className="ms-[25px]"/><p className="ms-[15px]">Kategori</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>

        <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iDaf} className="ms-[25px]"/><p className="ms-[15px]">Daftar Produk</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>

        <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPem} className="ms-[25px]"/><p className="ms-[15px]">Pembelian Produk</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>

        <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iMan} className="ms-[25px]"/><p className="ms-[15px]">Manajemen Produk</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>

    </div>
    </div>
  )
}

import { AiOutlineBorderLeft, AiOutlineLineHeight, AiOutlineMenu, AiOutlineMenuFold, AiOutlineRight, AiOutlineShop, AiOutlineUp, AiOutlineVerticalLeft } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { useContext, useEffect } from "react"
import iBar from "../../../assets/icon/POS/iconlaporan/iBar.svg";
import iPenj from "../../../assets/icon/POS/iconlaporan/iPenj.svg";
import iPers from "../../../assets/icon/POS/iconlaporan/iPers.svg";
import iStok from "../../../assets/icon/POS/iconlaporan/iStok.svg";
import iLine from "../../../assets/icon/POS/iLine.svg";
import { NavbarPosActive } from "../components/NavbarPosActive"

export const Laporan = () => {

  return (
    <div className="flex bg-gradient-to-l from-[#C2A353] to-[#EAC564] flex-col w-full h-[100vh]">
                <NavbarPosActive Title={'Laporan'}/>
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">  
        <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPenj} className="ms-[25px]"/><p className="ms-[15px]">Penjualan</p>
        <div className="flex ms-auto me-[15px]">
        <AiOutlineRight className="text-yellow-300" size={15}/>
        <AiOutlineRight className="text-yellow-600" size={15}/>
        </div>
        </span></a>
            <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPers} className="ms-[25px]"/><p className="ms-[15px]">Persediaan Barang</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>
                <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iStok} className="ms-[25px]"/><p className="ms-[15px]">Stok Limit</p>
                <div className="flex ms-auto me-[15px]">
                <AiOutlineRight className="text-yellow-300" size={15}/>
                <AiOutlineRight className="text-yellow-600" size={15}/>
                </div>
                </span></a>
                    <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iBar} className="ms-[25px]"/><p className="ms-[15px]">Barang Terlaris</p>
                    <div className="flex ms-auto me-[15px]">
                    <AiOutlineRight className="text-yellow-300" size={15}/>
                    <AiOutlineRight className="text-yellow-600" size={15}/>
                    </div>
                    </span></a>
    </div>
    </div>
  
  )
}

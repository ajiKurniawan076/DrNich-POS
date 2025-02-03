import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { useContext, useEffect } from "react" 

import iSupp from "../../../assets/icon/POS/iconuser/iSuplier.svg";
import iTerapis from "../../../assets/icon/POS/iconuser/iTerapis.svg";
import iMark from "../../../assets/icon/POS/iconuser/iMark.svg";
import iPel from "../../../assets/icon/POS/iconuser/iPel.svg";
import iLine from "../../../assets/icon/POS/iLine.svg";
import { NavbarPosActive } from "../components/NavbarPosActive"

export const USer = () => {

  document.title = 'Users'

  return (
    <div className="flex bg-gradient-to-l from-[#C2A353] to-[#EAC564] flex-col w-full h-[100vh]">
            <NavbarPosActive Title={'User'}/>
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">  
    <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iSupp} className="ms-[25px]"/><p className="ms-[15px]">Supplier</p>
    <div className="flex ms-auto me-[15px]">
    <AiOutlineRight className="text-yellow-300" size={15}/>
    <AiOutlineRight className="text-yellow-600" size={15}/>
    </div>
    </span></a>
    <a href="terapis" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iTerapis} className="ms-[25px]"/><p className="ms-[15px]">Terapis</p>
    <div className="flex ms-auto me-[15px]">
    <AiOutlineRight className="text-yellow-300" size={15}/>
    <AiOutlineRight className="text-yellow-600" size={15}/>
    </div>
    </span></a>
    <a href="marketing" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iMark} className="ms-[25px]"/><p className="ms-[15px]">Marketing</p>
    <div className="flex ms-auto me-[15px]">
    <AiOutlineRight className="text-yellow-300" size={15}/>
    <AiOutlineRight className="text-yellow-600" size={15}/>
    </div>
    </span></a>
    <a href="pelanggan" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPel} className="ms-[25px]"/><p className="ms-[15px]">Pelanggan</p>
    <div className="flex ms-auto me-[15px]">
    <AiOutlineRight className="text-yellow-300" size={15}/>
    <AiOutlineRight className="text-yellow-600" size={15}/>
    </div>
    </span></a>

    

    </div>
    </div>
  )
}

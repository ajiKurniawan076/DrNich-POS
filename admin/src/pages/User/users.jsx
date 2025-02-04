import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";

import iSupp from "../../assets/iconuser/iSuplier.svg";
import next2 from "../../assets/next2.svg";
import iTerapis from "../../assets/iconuser/iTerapis.svg";
import iMark from "../../assets/iconuser/iMark.svg";
import iPel from "../../assets/iconuser/iPel.svg";
import iLine from "../../assets/iLine.svg";
import iNext from "../../assets/iNext.svg";

export const USer = () => {
    const {setNav, setLink} = useContext(navContext)
  useEffect(()=>{
    setNav('Data User')
    setLink('/pos')
  },[])
  document.title = 'Data Users'

  return (
    <div className="w-full h-full flex flex-col gap-y-[15px] px-10 py-10 bg-white items-start place-items-center">  
      <a href="supplier" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md">
        <span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white">
        <img src={iLine} /><img src={iSupp} className="ms-[25px]" /><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Supplier</p>
        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        </div>
        </span>
      </a>
      <a href="terapis" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px]-yellow-700 flex items-center bg-white">
        <img src={iLine} className="" /><img src={iTerapis} className="ms-[25px]" /><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Terapis</p>
        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        </div>
        </span>
      </a>
    <a href="marketing" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px]-yellow-700 flex items-center bg-white"><img src={iLine} className=""/><img src={iMark} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Marketing</p>
    <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
      <img src={iNext} alt="next" />
    </div>
    </span></a>
    <a href="pelanggan" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px]-yellow-700 flex items-center bg-white"><img src={iLine} className=""/><img src={iPel} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Pelanggan</p>
    <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
      <img src={iNext} alt="next" />
    </div>
    </span></a>

    

    </div>
  )
}

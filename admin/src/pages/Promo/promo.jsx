import { useContext, useEffect } from "react"
import { AiOutlineBorderLeft, AiOutlineLineHeight, AiOutlineMenu, AiOutlineMenuFold, AiOutlineRight, AiOutlineShop, AiOutlineUp, AiOutlineVerticalLeft } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { navContext } from "../../App2"
import iDis from "../../assets/iconpromo/iDis.svg";
import iCas from "../../assets/iconpromo/iCash.svg";
import iLine from "../../assets/iLine.svg";
import iNext from "../../assets/iNext.svg";



export const Promo = () => {
  const {setNav} = useContext(navContext)
  useEffect(()=>{
    setNav('Promo')
  },[])

  return (
    <div className="w-full h-full flex flex-col gap-y-[15px] px-10 py-10 bg-white items-start place-items-center">  
    <a href="TambahDiskon4" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iDis} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Diskon</p>
                        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                                  <img src={iNext} alt="next" />
                                </div>
                        </span></a>

    <a href="CashBack" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iCas} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Cashback</p>
                        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
                                  <img src={iNext} alt="next" />
                                </div>
                        </span></a>
    </div>
  )
}

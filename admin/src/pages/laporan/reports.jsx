import { AiOutlineBorderLeft, AiOutlineLineHeight, AiOutlineMenu, AiOutlineMenuFold, AiOutlineRight, AiOutlineShop, AiOutlineUp, AiOutlineVerticalLeft } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { useContext, useEffect } from "react"
import { navContext } from "../../App2"
import iBar from "../../assets/iconlaporan/iBar.svg";
import iPenj from "../../assets/iconlaporan/iPenj.svg";
import iPers from "../../assets/iconlaporan/iPers.svg";
import iStok from "../../assets/iconlaporan/iStok.svg";
import iLine from "../../assets/iLine.svg";
import iNext from "../../assets/iNext.svg";


export const Laporan = () => {
  const {setNav} = useContext(navContext)
  useEffect(()=>{
    setNav('Laporan')
  },[])
  document.title = 'Laporan'

  return (
    <div className="w-full h-full flex flex-col gap-y-[15px] px-10 py-10 bg-white items-start place-items-center">  
        <a href="LaporanRingkasanPenjualan" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iPenj} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Penjualan</p>
        <div className="flex ms-auto me-[15px] w-[24px] h-[24px]">
          <img src={iNext} alt="next" />
        
        </div>
        </span></a>
            <a href="supplier" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iPers} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Laporan Produk</p>
            <div className="flex ms-auto me-[15px]">
            <img src={iNext} alt="next" />
            </div>
            </span></a>
                <a href="LaporanPersediaan" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iPers} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Laporan Persediaan</p>
                <div className="flex ms-auto me-[15px]">
                <img src={iNext} alt="next" />
                </div>
                </span></a>
                    <a href="DaftarStokLimit" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iStok} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Stok Limit</p>
                    <div className="flex ms-auto me-[15px]">
                    <img src={iNext} alt="next" />
                    </div>
                    </span></a>
                        <a href="LaporanProdukTerlaris" className="w-full h-[80px] p-[1px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] rounded-xl shadow-md"><span className="w-full h-full rounded-xl px-[15px] py-[20px] flex items-center bg-white"><img src={iLine}/><img src={iBar} className="ms-[25px]"/><p className="ms-[15px] text-[14px] text-[#454545] font-medium">Produk Terlaris</p>
                        <div className="flex ms-auto me-[15px]">
                        <img src={iNext} alt="next" />
                        </div>
                        </span></a>
    </div>
  
  )
}

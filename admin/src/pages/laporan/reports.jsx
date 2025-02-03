import { AiOutlineBorderLeft, AiOutlineLineHeight, AiOutlineMenu, AiOutlineMenuFold, AiOutlineRight, AiOutlineShop, AiOutlineUp, AiOutlineVerticalLeft } from "react-icons/ai"
import { BiDotsVertical } from "react-icons/bi"
import { useContext, useEffect } from "react"
import { navContext } from "../../App2"
import iBar from "../../assets/iconlaporan/iBar.svg";
import iPenj from "../../assets/iconlaporan/iPenj.svg";
import iPers from "../../assets/iconlaporan/iPers.svg";
import iStok from "../../assets/iconlaporan/iStok.svg";
import iLine from "../../assets/iLine.svg";

export const Laporan = () => {
  const {setNav} = useContext(navContext)
  useEffect(()=>{
    setNav('Laporan')
  },[])
  document.title = 'Laporan'

  return (
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center">  
        <a href="LaporanRingkasanPenjualan" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPenj} className="ms-[25px]"/><p className="ms-[15px]">Penjualan</p>
        <div className="flex ms-auto me-[15px]">
        <AiOutlineRight className="text-yellow-300" size={15}/>
        <AiOutlineRight className="text-yellow-600" size={15}/>
        </div>
        </span></a>
            <a href="supplier" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPers} className="ms-[25px]"/><p className="ms-[15px]">Laporan Produk</p>
            <div className="flex ms-auto me-[15px]">
            <AiOutlineRight className="text-yellow-300" size={15}/>
            <AiOutlineRight className="text-yellow-600" size={15}/>
            </div>
            </span></a>
                <a href="LaporanPersediaan" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iPers} className="ms-[25px]"/><p className="ms-[15px]">Laporan Persediaan</p>
                <div className="flex ms-auto me-[15px]">
                <AiOutlineRight className="text-yellow-300" size={15}/>
                <AiOutlineRight className="text-yellow-600" size={15}/>
                </div>
                </span></a>
                    <a href="DaftarStokLimit" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iStok} className="ms-[25px]"/><p className="ms-[15px]">Stok Limit</p>
                    <div className="flex ms-auto me-[15px]">
                    <AiOutlineRight className="text-yellow-300" size={15}/>
                    <AiOutlineRight className="text-yellow-600" size={15}/>
                    </div>
                    </span></a>
                        <a href="LaporanProdukTerlaris" className="w-full h-[80px]"><span className="hover:scale-110 w-full h-full border rounded-xl px-0 py-[20px] border-yellow-700 flex items-center font-bold"><img src={iLine} className="ms-[15px]"/><img src={iBar} className="ms-[25px]"/><p className="ms-[15px]">Produk Terlaris</p>
                        <div className="flex ms-auto me-[15px]">
                        <AiOutlineRight className="text-yellow-300" size={15}/>
                        <AiOutlineRight className="text-yellow-600" size={15}/>
                        </div>
                        </span></a>
    </div>
  
  )
}

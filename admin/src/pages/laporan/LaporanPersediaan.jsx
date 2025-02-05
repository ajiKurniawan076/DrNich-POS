import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanah from "../../assets/iconproduk/iPanah.svg";

export const LaporanPersediaan = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Laporan Persediaan')   
document.title = 'Laporan Persediaan'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-5 w-full">
            <p className="">Kategori</p>
        </div>
        <a href='LaporanPersediaanDetail' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] p-4'>
            <p>Sunscreen</p>
            <img src={iPanah} alt="" />
        </a>
        <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] p-4 mt-2'>
            <p>Serum</p>
            <img src={iPanah} alt="" />
        </a>
        <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] p-4 mt-2'>
            <p>Toner</p>
            <img src={iPanah} alt="" />
        </a>
        <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] p-4 mt-2'>
            <p>Krim Pagi</p>
            <img src={iPanah} alt="" />
        </a>
    </div>
)
}

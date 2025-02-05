import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanah from "../../assets/iconproduk/iPanah.svg";

export const LaporanPersediaan = () => {
    const { setNav, setLink } = useContext(navContext)

setLink('/pos/laporan')
setNav('Laporan Persediaan')   
document.title = 'Laporan Persediaan'
return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
        <form className="my-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
            <input
                // onChange={filterData}
                // ref={cari}
                type="text"
                className="text-sm w-full h-[30px] focus:outline-none"
                placeholder="Cari..."
            ></input>
        </form>
        
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mb-[17px] w-full">
            <p className="">Kategori</p>
        </div>
        
        <div className='flex flex-col gap-[10px]'>
            <a href='LaporanPersediaanDetail' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px]'>
                <p>Sunscreen</p>
                <img src={iPanah} alt="" />
            </a>
            <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px]'>
                <p>Serum</p>
                <img src={iPanah} alt="" />
            </a>
            <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px]'>
                <p>Toner</p>
                <img src={iPanah} alt="" />
            </a>
            <a href='' className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px]'>
                <p>Krim Pagi</p>
                <img src={iPanah} alt="" />
            </a>
        </div>
    </div>
)
}

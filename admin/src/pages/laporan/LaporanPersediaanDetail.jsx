import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanah from "../../assets/iconproduk/iPanah.svg";

export const LaporanPersediaanDetail = () => {
    const { setNav } = useContext(navContext)


setNav('Laporan Persediaan')   
document.title = 'Laporan Persediaan'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-5 w-full">
            <p className="">Produk</p>
        </div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        <div className='grid text-start px-2'>
            <div className='flex justify-between text-center'>
                <p>DN001/14012025/SS</p>
                <p>Stok: 27</p>
            </div>
            <p className='text-[#C2A353]'>sunscreen SPF 30+ 100ml</p>
        </div>
        <div className='border my-2'></div>
        
    </div>
)
}

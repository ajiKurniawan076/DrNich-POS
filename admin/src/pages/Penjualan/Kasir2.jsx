import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";


export const Kasir2 = () => {
    const { setNav } = useContext(navContext)

setNav('Kasir')   
document.title = 'Kasir'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <button className='flex justify-between'>
            <button className='border-b-2 border-[#C2A353] w-[50%] shadow-md'>
                <p>Transaksi</p>
            </button>
            <button className='border-b-2 w-[50%]'>
                <p>Draft Transaksi</p>
            </button>
        </button>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className='flex justify-between mt-5'>
            <button className='flex justify-between border border-[#C2A353] rounded-xl p-2 px-4 w-[49%]'>
                <p>Jasa</p>
                <img src={iPanahB} alt="" />
            </button>
            <button className='flex justify-between border border-[#C2A353] rounded-xl p-2 px-4 w-[49%]'>
                <p>Semua Kategori</p>
                <img src={iPanahB} alt="" />
            </button>
        </div>
        <button className='grid place-items-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-4 '>
            <div className='flex justify-between w-full'>
                <p className='font-semibold'>Facial Gold Acne</p>
                <p className='text-[#BDBDBD]'>Jasa</p>
            </div>
            <p>Rp 70.000</p>
        </button>
        <button className='grid place-items-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-2 '>
            <div className='flex justify-between w-full'>
                <p className='font-semibold'>Facial Gold Acne</p>
                <p className='text-[#BDBDBD]'>Jasa</p>
            </div>
            <p>Rp 70.000</p>
        </button>
        <button className='grid place-items-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-2 '>
            <div className='flex justify-between w-full'>
                <p className='font-semibold'>Facial Gold Acne</p>
                <p className='text-[#BDBDBD]'>Jasa</p>
            </div>
            <p>Rp 70.000</p>
        </button>
        <button className='grid place-items-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-2 '>
            <div className='flex justify-between w-full'>
                <p className='font-semibold'>Facial Gold Acne</p>
                <p className='text-[#BDBDBD]'>Jasa</p>
            </div>
            <p>Rp 70.000</p>
        </button>
    </div>
)
}

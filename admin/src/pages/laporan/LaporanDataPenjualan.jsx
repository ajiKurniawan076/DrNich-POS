import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";

export const LaporanDataPenjualan = () => {
    const { setNav } = useContext(navContext)

setNav('Data Penjualan')   
document.title = 'Data Penjualan'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form> 
        <a href='LaporanPenjualanDetail' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 7.000.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 310.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 1.200.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 100.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 290.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 310.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 1.200.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='text-[14px]'>Rp 100.000</p>
            </div>
            <div>
                <p>1 Jan 24,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
    </div>
)
}

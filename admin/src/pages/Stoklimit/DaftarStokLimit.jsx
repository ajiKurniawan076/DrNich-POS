import React, { useContext } from 'react'
import { navContext } from '../../App2'
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";


export const DaftarStokLimit = () => {
    const { setNav, setLink } = useContext(navContext)

setNav('Daftar Stok Limit')   
document.title = 'Daftar Stok Limit'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className='grid place-items-start'>
            <a href='DetailDaftarStokLimit' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start pt-2 pb-4 mt-2 w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
        </div>
    </div>
)
}

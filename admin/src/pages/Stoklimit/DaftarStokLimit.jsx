import React, { useContext } from 'react'
import { navContext } from '../../App2'
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";


export const DaftarStokLimit = () => {
    const { setNav, setLink } = useContext(navContext)


setLink('/pos/laporan')
setNav('Daftar Stok Limit')   
document.title = 'Daftar Stok Limit'
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
        <div className='grid place-items-start gap-[15px]'>
            <a href='DetailDaftarStokLimit' className='grid place-items-start w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start w-full'>
                <p>Suncreen SPF 30+ 100ml</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>Minimum : 25</p>
                    <p>Tersedia : <span className='text-[#EB5757]'>17</span></p>
                </div>
            </a>
            <div className='border border-[#BDBDBD] w-full'></div>
            <a href='' className='grid place-items-start w-full'>
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

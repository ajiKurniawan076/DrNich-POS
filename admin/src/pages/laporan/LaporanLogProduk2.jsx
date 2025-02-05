import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";

export const LaporanLogProduk2 = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Log Produk')   
document.title = 'Log Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8 text-[12px] text-[#454545]'>
        <div className='items-start border border-[#C2A353] rounded-xl p-4'>
            <div className='flex justify-between'>
                <p className='text-[#27AE60]'>Produk Masuk</p>
                <p className='text-[#BDBDBD]'>20 Nov 2024</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Banyak Produk Masuk</p>
                <p>100</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Stok Awal</p>
                <p>2</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Total Stok Tersedia</p>
                <p>102</p>
            </div>
        </div>
        <div className='grid place-items-start border border-[#C2A353] rounded-xl p-4 my-2'>
            <div className='grid place-items-start'>
                <p className='text-[14px] font-semibold'>Pembayaran RP 7.000.000</p>
                <p className='text-[#BDBDBD]'>1 Nov 2024, 11:40 WIB</p>
            </div>
            <p className='text-[10px] text-[#BDBDBD] mt-5 mb-3'>Transaksi</p>
            <div className='grid place-items-start w-full'>
                <div className='flex justify-between w-full'>
                    <p>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[#BDBDBD]'>Rp 70.000</p>
                </div>
                <p className='text-[#BDBDBD]'>100 x Rp 70.000</p>
            </div>
            <div className='border border-dashed border-[#BDBDBD] w-full my-5'></div>
            <div className='flex justify-between w-full'>
                <p>Total</p>
                <p className='font-semibold'>Rp 7.000.000</p>
            </div>
        </div>
        <button className='flex justify-between w-full border border-[#C2A353] rounded-xl p-4 text-[#C2A353]'>
            Lihat Rincian
            <img src={iPan} alt="panah" />
        </button>
    </div>
)
}

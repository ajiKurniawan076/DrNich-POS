import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iFrame from "../../assets/iconLaporanPenjualan/iFrame.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";

export const LaporanPenjualanDetail = () => {
    const { setNav } = useContext(navContext)

setNav('Detail')   
document.title = 'Detail'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fit pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between text-center items-center border rounded-xl border-[#C2A353] p-4'> 
            <div className='Grid text-start'>
                <p className='text-[10px] text-[#BDBDBD]'>Pelanggan</p>
                <p>Diana</p>
            </div>
            <div className='flex gap-2'>
                <img src={iFrame} alt="poin" />
                <img src={iPan} alt="panah" />
            </div>
        </div>
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <div className='grid gap-1'>
                <p className='text-[10px] text-[#BDBDBD]'>ID Transaksi</p>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
            </div>
            <div className='grid gap-1'>
                <p>1 Nov 2024, 11.40 WIB</p>
                <p>Pembayaran Rp 7.000.000</p>
            </div>
        </div>
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <p className='text-[10px] text-[#BDBDBD]'>Detail Pesanan</p>
            <div className='font-semibold'>
                <p>Sunscreen SPF 30+ 100ml</p>
            </div>
            <div className='flex justify-between'>
                <p>Jumlah</p>
                <p>10 pcs</p>
            </div>
            <div className='flex justify-between'>
                <p>Harga Satuan</p>
                <p>Rp 70.000</p>
            </div>
            <div className='border border-dashed border-[#BDBDBD] my-3'></div>
            <div className='flex justify-between'>
                <p>Subtotal Produk</p>
                <p>Rp 7.000.000</p>
            </div>
            <div className='flex justify-between'>
                <p>Promo Diskon</p>
                <p>Rp 150.000</p>
            </div>
            <div className='flex justify-between'>
                <p>Total</p>
                <p>Rp 6.850.000</p>
            </div>
            <div className='flex justify-between'>
                <p>Pendapatan Poin</p>
                <p className='text-[#27AE60]'>+100</p>
            </div>
        </div>
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <p className='text-[10px] text-[#BDBDBD]'>Detail Pembayaran</p>
            <div className='flex justify-between'>
                <p>Tunai</p>
                <p>Rp 6.900.000</p>
            </div>
            <div className='border border-dashed border-[#BDBDBD] my-3'></div>
            <div className='flex justify-between'>
                <p>Kembalian</p>
                <p>Rp 50.000</p>
            </div>
        </div>
        <a href='LaporanPembayaran' className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4 '>
            <button className='flex justify-between text-start'>
                <p className='text-[14px] text-[#C2A353]'>Lihat Struk</p>
                <img src={iPan} alt="Panah" />
            </button>
        </a>



    </div>
)
}

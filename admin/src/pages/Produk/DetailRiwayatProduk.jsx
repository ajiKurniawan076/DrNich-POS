import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconproduk/iPan.svg";


export const DetailRiwayatProduk = () => {
    const { setNav, setLink } = useContext(navContext)

setNav('Detail Riwayat Produk')   
document.title = 'Detail Riwayat Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='flex justify-between p-4 border rounded-xl border-[#C2A353]'>
            <p>PT.BEAUTY</p>
            <img src={iPan} alt="" />
        </div>
        <div className='p-4 border rounded-xl border-[#C2A353] text-start mt-2'>
            <p className='text-[10px] text-[#BDBDBD]'>Kategori Produk</p>
            <p className='text-[12px] mt-1'>Sunscreen</p>
            <p className='text-[10px] text-[#BDBDBD] mt-4'>Nama Produk</p>
            <p className='text-[12px] mt-1'>Sunscreen SPF 30+ 100ml</p>
            <p className='text-[10px] text-[#BDBDBD] mt-4'>SKU</p>
            <p className='text-[12px] mt-1'>DN001</p>
            <p className='text-[10px] text-[#BDBDBD] mt-4'>Jumlah Pembelian</p>
            <p className='text-[12px] mt-1'>100</p>
            <p className='text-[10px] text-[#BDBDBD] mt-4'>Harga Produk</p>
            <p className='text-[12px] mt-1'>Rp 20.000</p>
            <p className='text-[10px] text-[#BDBDBD] mt-4'>Harga Jual</p>
            <p className='text-[12px] mt-1'>42.000</p>
            <div className='flex justify-between text-[12px] mt-5'>
                <p>Total Pembayaran</p>
                <p className='font-bold'>Rp 4.200.000</p>
            </div>
        </div>
    </div>
)
}
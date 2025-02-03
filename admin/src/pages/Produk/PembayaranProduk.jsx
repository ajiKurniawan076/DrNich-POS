import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPemSu from "../../assets/iconproduk/iPemSu.svg";
import iDown from "../../assets/iconproduk/iDown.svg";


export const PembayaranProduk = () => {
    const { setNav } = useContext(navContext)


setNav('Pembayaran Produk')
document.title = 'Pembayaran Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='grid place-items-center'>
            <img src={iPemSu} alt="Pembayaran Berhasil" />
            <p className='text-[14px] text-[#27AE60] pt-8'>Pembayaran Berhasil</p>
            <p className='text-[12px] text-[#bdbdbd] mt-4'>#DN0928013</p>
            <p className='text-[12px] text-[#bdbdbd]'>1 november 2024, 10:30 WIB</p>
            <p className='text-[24px] text-[#454545] font-bold mt-3'>IDR 4.284.000,00</p>
        </div>
        <div className='mt-7 text-[12px]'>
            <div className='flex justify-between text-start'>
                <p>Sunscreen SPF 30+ 100ml</p>
                <p>Rp 42.000</p>
            </div>
            <div className='flex items-start text-[#BDBDBD] my-1'>
                <p>1 x 42.000</p>
            </div>
            <div className='flex justify-between text-start'>
                <p>Serum Acne Skin 50ml</p>
                <p>Rp 42.000</p>
            </div>
            <div className='flex items-start text-[#BDBDBD] my-1'>
                <p>1 x 42.000</p>
            </div>
            <div className='flex justify-between text-start'>
                <p>Sunscreen SPF 30+ 100ml</p>
                <p>Rp 4.200.000</p>
            </div>
            <div className='flex items-start text-[#BDBDBD] my-1'>
                <p>100 x 42.000</p>
            </div>

            <div className='border border-dashed border-[#BDBDBD] my-8'></div>
            <div className='flex justify-between text-[12px]'>
                <p>Total</p>
                <p>Rp 4.284.000</p>
            </div>
        </div>
        <div className='flex h-full items-end'>
            <div className='flex justify-end w-full'>
            <div className='bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[90px] p-3 rounded-xl flex justify-center'>
                <img src={iDown} alt="iDownload" />
            </div>
            <div className='border ml-2 border-[#C2A353] w-full rounded-xl flex justify-center items-center text-[#C2A353]'>
                <p>Kembali</p>
            </div>
            </div>
        </div>
    </div>
)
}
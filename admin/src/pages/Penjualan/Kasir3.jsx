import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iPan from "../../assets/iconkasir/iPan.svg";


export const Kasir3 = () => {
    const { setNav } = useContext(navContext)

setNav('Kasir')   
document.title = 'Kasir'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fitt pt-8 text-[#454545] text-[12px]'>
        <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className='flex justify-between mt-5'>
            <button className='flex justify-between border border-[#C2A353] rounded-xl p-2 px-4 w-[49%]'>
                <p>Semua Jenis</p>
                <img src={iPanahB} alt="" />
            </button>
            <button className='flex justify-between border border-[#C2A353] rounded-xl p-2 px-4 w-[49%]'>
                <p>Semua Kategori</p>
                <img src={iPanahB} alt="" />
            </button>
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] py-0.5 text-start mt-4 w-full">
            <p>Daftar Produk</p>
        </div>
        <div className='grid'>
            <button className='grid place-items-start gap-1 border-2 border-[#C2A353] rounded-xl p-4 mt-1'>
                <div className='flex justify-between w-full'>
                    <p className='font-semibold'>Facial Gold Acne</p>
                    <p className='text-[#BDBDBD]'>Jasa</p>
                </div>
                <p>Rp 70.000</p>
            </button>
            <button className='grid place-items-start gap-1 border-2 border-[#C2A353] rounded-xl p-4 mt-2 '>
                <div className='flex justify-between w-full'>
                    <p className='font-semibold'>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[#BDBDBD]'>Barang</p>
                </div>
                <p>2 pcs</p>
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
                    <p className='font-semibold'>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[#BDBDBD]'>Barang</p>
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
                    <p className='font-semibold'>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[#BDBDBD]'>Barang</p>
                </div>
                <p>Rp 70.000</p>
            </button>
        </div>
        <div className='flex justify-between text-center text-[14px] mt-4'>
            <button className='border border-[#C2A353] text-[#C2A353] w-[39%] p-4 rounded-xl'>
                <p>Simpan Draft</p>
            </button>
            <button className='flex justify-between border rounded-xl bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-white w-[59%] p-4'>
                <p>3 Produk</p>
                <img src={iPan} alt="panah putih" />
            </button>
        </div>
    </div>
)
}

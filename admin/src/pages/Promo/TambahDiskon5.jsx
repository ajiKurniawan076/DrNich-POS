import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanahB from '../../assets/iconmanajement/iPanahB.svg'
import iFrameI from '../../assets/iconmanajement/iFrameI.svg'
import iPanahS from '../../assets/iconmanajement/iPanahS.svg'
import iTgl from '../../assets/iconproduk/iTgl.svg'



export const TambahDiskon5 = () => {
    const { setNav, setLink } = useContext(navContext)

setNav('Diskon')   
document.title = 'Diskon'
return (
    <div className="flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]">
        <div className='grid place-items-start'>
            <p>Kategori Diskon</p>
            <div className="relative w-full mt-1">
                <select
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" disabled selected className="text-gray-300">
                        Pilih
                    </option>
                    <option value="pria">Diskon1</option>
                    <option value="wanita">Diskon2</option>
                </select>
                <img
                    src={iPanahB}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
            </div>
        </div>
        <div className='grid place-items-start w-full mt-4'>
            <p>Nama diskon</p>
            <div className='flex justify-start border border-[#BDBDBD] rounded-xl p-4 w-full mt-1'>
                <p>Promo Produk Baru!</p>
            </div>
        </div>
        <div className='grid place-items-start w-full mt-4'>
            <p>Jumlah diskon</p>
            <div className='flex justify-start border border-[#BDBDBD] rounded-xl py-3 px-4 w-full mt-1'>
                <div className='flex justify-between w-full text-center items-center'>
                    <p>Rp 20.000</p>
                    <img src={iFrameI} alt="" />
                </div>
            </div>
        </div>
        <div className='grid place-items-start mt-4'>
            <p>Khusus Kategori Produk</p>
            <div className="relative w-full mt-1">
                <select
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" disabled selected className="text-[#BDBDBD]">
                        Pilih Produk
                    </option>
                    <option value="pria">Produk1</option>
                    <option value="wanita">Produk2</option>
                </select>
                <img
                    src={iPanahS}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
            </div>
        </div>
        <div className='grid place-items-start mt-4'>
            <p>Khusus Jenis Produk</p>
            <div className="relative w-full mt-1">
                <select
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" disabled selected className="text-[#BDBDBD]">
                        Pilih Produk
                    </option>
                    <option value="pria">Produk1</option>
                    <option value="wanita">Produk2</option>
                </select>
                <img
                    src={iPanahS}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
            </div>
        </div>
        <div className='Grid place-items-start mt-4'>
            <p>Masa Berlaku</p>
            <div className='flex justify-between w-full border border-[#BDBDBD] rounded-xl p-4 mt-1'>
                <p>20 Nov - 20 Des</p>
                <img src={iTgl} alt="Tanggal" />
            </div>
        </div>
        <div className='flex items-end h-full mt-8'>
            <button className='flex justify-center text-[14px] text-white bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4 '>
                Simpan
            </button>
        </div>
    </div>
)
}

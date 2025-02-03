import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanahB from '../../assets/iconmanajement/iPanahB.svg'

export const Cashback = () => {
    const { setNav } = useContext(navContext)

setNav('Tambah Cashback')   
document.title = 'Tambah Cashback'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <div className="grid gap-2">
            <p className="text-start">Kategori Cashback</p>
            <div className="relative w-full">
                <select
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" disabled selected className="text-gray-300">
                    Pilih
                    </option>
                    <option value="pria">Cashback1</option>
                    <option value="wanita">Cashback2</option>
                </select>
                <img
                    src={iPanahB}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
            </div>
        </div>
        <div className='flex justify-end items-end h-full'>
            <button className='flex justify-center border border-[#BDBDBD] rounded-xl p-4 w-full bg-[#BDBDBD] text-white text-[14px]'>
                <p>Simpan</p>
            </button>
        </div>
    </div>
)
}

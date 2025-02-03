import React, { useContext } from 'react'
import { navContext } from "../../App2"

export const ManajementKurangiStok2 = () => {
    const { setNav } = useContext(navContext)

setNav('Kurangi Stok')   
document.title = 'Manajemen Kurangi Stok'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] text-sm px-2 py-1">Stok Saat Ini</label>
            <input type="text" placeholder="26" className="text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] "/>
        </div>
        <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] text-sm px-2 py-1">Jumlah Pengurangan</label>
            <input type="text" placeholder="0" className="text-[12px] mx-3 px-4 border text-sm text-black border-[#C2A353] rounded-xl h-[40px] "/>
        </div>
        <div className="grid py-2">
            <label className="text-start text-[12px] text-sm text-[#454545] px-2 py-1">Keterangan <span className=' text-[#BDBDBD] '>( Optional )</span></label>
            <input type="text" placeholder="Barang Tidak Layak Pakai" className="text-[12px] mx-3 px-4 border text-sm text-black border-black/30 rounded-xl h-[40px] "/>
        </div>
        <div className="flex justify-end items-end gap-2 w-full h-full pt-4 py-3 px-2">
            <a href='DetailDaftarBelanja' className="flex justify-center items-center w-full  gap-2 h-[40px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl"> Simpan</a>
        </div>
    </div>
)
}
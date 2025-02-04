import React, { useContext } from 'react'
import { navContext } from "../../App2"

export const LaporanLogProduk3 = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Log Produk')   
document.title = 'Log Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8 text-[12px] text-[#454545]'>
        <div className='items-start border border-[#C2A353] rounded-xl p-4'>
            <div className='flex justify-between'>
                <p className='text-[#EB5757]'>Produk Keluar</p>
                <p className='text-[#BDBDBD]'>29 Nov 2024</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Banyak Produk Keluar</p>
                <p>2</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Stok Awal</p>
                <p>4</p>
            </div>
            <div className='grid place-items-start my-3'>
                <p className='text-[#BDBDBD] text-[10px]'>Total Stok Tersedia</p>
                <p>2</p>
            </div>
        </div>
    </div>
)
}

import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanah from "../../assets/iconkasir/iPanah.svg";
import iFrame100 from "../../assets/iconkasir/iFrame100.svg";


export const DraftTransaksi = () => {
    const { setNav, setLink } = useContext(navContext)

setNav('Draf Transaksi')   
document.title = 'Draf Transaksi'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between text-[#BDBDBD]'>
            <p>ID Transaksi</p>
            <p>#DN0928013</p>
        </div>
        <div className='flex justify-between border border-[#BDBDBD] rounded-xl p-4'>
            <p>Pilih Pelanggan</p>
            <img src={iPanah} alt="panah" />
        </div>
        <div className='flex justify-between border border-[#C2A353] rounded-xl p-4 mt-2'>
            <p>Diana</p>
            <img src={iFrame100} alt="" />
        </div>
        <div className='flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p>Promo</p>
            <img src={iPanah} alt="panah" />
        </div>
        <div className='flex justify-end items-end text-[14px] mt-4 w-full h-full'>
            <button className='border border-[#BDBDBD] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white w-full p-4 rounded-xl'>
            Simpan
            </button>
        </div>
    </div>
)
}

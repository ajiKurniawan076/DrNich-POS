import React, { useContext } from 'react'
import { navContext } from '../../App2'
import iRiwa from "../../assets/iconproduk/iRiwa.svg";



export const RiwayatProduk = () => {
    const { setNav } = useContext(navContext)

setNav('Riwayat')   
document.title = 'Riwayat'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='flex border border-[#BDBDBD] rounded-xl w-full px-5 text-[12px] h-[40px] items-center'>
            <img src={iRiwa} alt="IRiwayat" />
            <div className='flex pl-5'>
                <p>1 Nov 2024 </p>
                <p> - </p>
                <p>1 Des 2024</p>
            </div>
        </div>
        <div className='flex justify-between text-[12px] px-5 py-3 border border-[#BDBDBD] rounded-xl mt-5'>
            <div className='grid place-items-start'>
                <p className='text-[#C2A353]'>DN0298363SPP</p>
                <p>Rp 4.200.000</p>
            </div>
            <div className=''>
                <p className='text-[#BDBDBD]'>20 nov 2024, 10:40 WIB</p>
            </div>
        </div>
        <div className='flex justify-between text-[12px] px-5 py-3 border border-[#BDBDBD] rounded-xl mt-3'>
            <div className='grid place-items-start'>
                <p className='text-[#C2A353]'>DN0298363SPP</p>
                <p>Rp 4.200.000</p>
            </div>
            <div className=''>
                <p className='text-[#BDBDBD]'>20 nov 2024, 10:40 WIB</p>
            </div>
        </div>
        <div className='flex justify-between text-[12px] px-5 py-3 border border-[#BDBDBD] rounded-xl mt-3'>
            <div className='grid place-items-start'>
                <p className='text-[#C2A353]'>DN0298363SPP</p>
                <p>Rp 4.200.000</p>
            </div>
            <div className=''>
                <p className='text-[#BDBDBD]'>20 nov 2024, 10:40 WIB</p>
            </div>
        </div>
        <div className='flex justify-between text-[12px] px-5 py-3 border border-[#BDBDBD] rounded-xl mt-3'>
            <div className='grid place-items-start'>
                <p className='text-[#C2A353]'>DN0298363SPP</p>
                <p>Rp 4.200.000</p>
            </div>
            <div className=''>
                <p className='text-[#BDBDBD]'>20 nov 2024, 10:40 WIB</p>
            </div>
        </div>
    </div>
)
}
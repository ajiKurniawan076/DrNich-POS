import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanah from "../../assets/iconproduk/iPanah.svg";

export const DetailRiwayat = () => {
    const { setNav, setLink } = useContext(navContext)

setNav('Detail Riwayat')   
document.title = 'Detail Riwayat'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='text-[12px] border border-[#C2A353] p-5 w-full rounded-xl'>
            <div className='text-start'>
                <p className='text-[10px] text-[#BDBDBD] mb-1'>Tanggal Transaksi</p>
                <p>20 november 2024, 10:30 WIB</p>
                <p className='text-[10px] text-[#BDBDBD] mt-5 mb-1'>ID Transaksi</p>
                <p>DN0298363SPP</p>
            </div>    
            <div className='flex items-center justify-between mt-5'>
                <div className='flex flex-col items-start'>
                    <p className='mb-1'>Sunscreen SPF 30+ 100ml</p>
                    <p>Rp 42.000</p>
                </div>    
                <div>
                    <img src={iPanah} alt="panah" />
                </div>
            </div>
            <div className='border mt-2'></div>
            <div className='flex items-center justify-between mt-5'>
                <div className='flex flex-col items-start'>
                    <p className='mb-1'>Sunscreen SPF 30+ 100ml</p>
                    <p>Rp 42.000</p>
                </div>    
                <div>
                    <img src={iPanah} alt="panah" />
                </div>
            </div>
            <div className='border mt-2'></div>
            <div className='flex items-center justify-between mt-5'>
                <div className='flex flex-col items-start'>
                    <p className='mb-1'>Sunscreen SPF 30+ 100ml</p>
                    <p>Rp 42.000</p>
                </div>    
                <div>
                    <img src={iPanah} alt="panah" />
                </div>
            </div>
            <div className='border mt-2'></div>
            <div className='flex justify-between mt-5'>
                <p>Total Pembayaran</p>
                <p className='font-bold'>Rp 4.284.000</p>
            </div>
        </div>
    </div>
)
}
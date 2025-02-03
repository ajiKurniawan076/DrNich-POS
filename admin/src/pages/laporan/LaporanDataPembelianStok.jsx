import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iTgl from "../../assets/iconproduk/iTgl.svg";

export const LaporanDataPembelianStok = () => {
    const { setNav } = useContext(navContext)


setNav('Data Pembelian Stok')   
document.title = 'Data Pembelian Stok'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fitt pt-8 text-[#454545] text-[12px]'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        <div className='flex justify-between w-full mt-5'>
            <div className='flex gap-2 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <img src={iTgl} alt="iTgL" className='w-[20px] h-[20px] ml-1'/>
                <p>1 Nov 2024 - 30 Nov 2024</p>
            </div>
            <div className='flex gap-14 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <p>Minggu ini</p>        
                <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
            </div>
        </div>
        <a href='LaporanDataPembelianStokDetail' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-5'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 7.000.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 310.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 1.200.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 100.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 290.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 310.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 1.200.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
        <a href='' className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div className='grid text-start'>
                <p className='text-[#C2A353]'>DNFS001/25001</p>
                <p className='font-semibold text-[14px]'>Rp 100.000</p>
            </div>
            <div className='grid text-end'>
                <p>1 Jan 2024,</p>
                <p>10.35 WIB</p>
            </div>
        </a>
    </div>
)
}

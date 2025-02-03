import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iFrame0 from "../../assets/iconkasir/iFrame0.svg";
import iPanKu from "../../assets/iconkasir/iPanKu.svg";
import iPanah from "../../assets/iconkasir/iPanah.svg";
import iTamKu from "../../assets/iconkasir/iTamKu.svg";
import iPan from "../../assets/iconkasir/iPan.svg";




export const KasirLengkap = () => {
    const { setNav } = useContext(navContext)

setNav('Kasir')   
document.title = 'Kasir'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between items-center border border-[#EAC564] rounded-xl p-4'>
            <p>Surya</p>
            <div className='flex gap-4'>
                <img src={iFrame0} alt="0" />
                <img src={iPanKu} alt="panah kuning" />
            </div>
        </div>
        <div className='flex justify-between items-center border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p>Mega Launching</p>
            <img src={iPanah} alt="" />
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] py-0.5 text-start mt-4 w-full">
            <p>Rincian Pembelian</p>
        </div>
        <div className='flex justify-between text-[#BDBDBD] w-full mt-4'>
            <p>ID Transaksi</p>
            <p>#DN0928013</p>
        </div>
        <div className='flex justify-between w-full mt-2'>
            <div className='flex justify-between w-[60%] text-[#EAC564]'>
                <p>Facial Gold Acne</p>
                <p>x 1</p>
            </div>
            <p className='font-semibold'>Rp 70.000</p>
        </div>
        <div className='flex justify-between text-center w-full mt-2'>
            <div className='flex justify-between w-[60%] text-[#EAC564]'>
                <p className='w-[50%] text-start'>Suncreen SPF 30+ 100ml</p>
                <p>x 1</p>
            </div>
            <p className='font-semibold'>Rp 140.000</p>
        </div>
        <div className='border border-dashed border-[#BDBDBD] my-5'></div>
        <div className='flex justify-between w-full'>
            <p>Total Harga</p>
            <p className='font-semibold'>Rp 210.000</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Diskon</p>
            <p className='font-semibold'>- Rp 21.000</p>
        </div>

        <div className='border border-dashed border-[#BDBDBD] my-5'></div>

        <div className='flex justify-between w-full'>
            <p>Pembayaran</p>
            <p className='font-semibold'>Rp 189.000</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Pendapatan Poin</p>
            <p className='text-[#27AE60]'>+100</p>
        </div>

        <div className='flex justify-between items-end text-[14px] mt-4 w-full h-full'>
            <button className='flex gap-2 justify-center border border-[#C2A353] text-[#C2A353] w-[39%] p-4 rounded-xl'>
                <img src={iTamKu} alt="Tambah" />
                <p>Tambah</p>
            </button>
            <button className='flex justify-between items-center text-center border rounded-xl bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white w-[59%] p-4'>
                <p>Bayar</p>
                <img src={iPan} alt="panah putih" />
            </button>
        </div>
    </div>
)
}

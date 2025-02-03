import React, { useContext } from 'react'
import iTgl from "../../assets/iconproduk/iTgl.svg";
import { navContext } from "../../App2"
import { BsCart4 } from "react-icons/bs";


export const PembelianProduk = () => {
    const { setNav } = useContext(navContext)


setNav('Pembelian Produk')
document.title = 'Pembelian Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full'>
        <div className='mt-8'>
            <div className='text-start text-[12px] '>
                <p>Sunscreen SPF 30+ 100ml</p>
            </div>
            <div className="text-[12px] text-[#BDBDBD] text-start mt-2 rounded-lg flex justify-between">
                <p>1 x Rp 42.000</p>
                <p className='text-black'>Rp 42.000</p>
            </div>
            <div className='text-[12px] flex justify-between px-5 border border-[#BDBDBD] h-[40px] items-center rounded-xl mt-4'>
                <p>20/09/2027</p>
                <img src={iTgl} alt="" />
            </div>
        </div>
        <div className='border border-[#BDBDBD] w-full mt-5'></div>
        <div className='mt-3'>
            <div className='text-start text-[12px] '>
                <p>Sunscreen SPF 30+ 100ml</p>
            </div>
            <div className="text-[12px] text-[#BDBDBD] text-start mt-2 rounded-lg flex justify-between">
                <p>1 x Rp 42.000</p>
                <p className='text-black'>Rp 42.000</p>
            </div>
            <div className='text-[12px] flex justify-between px-5 border border-[#BDBDBD] h-[40px] items-center rounded-xl mt-4'>
                <p>20/09/2027</p>
                <img src={iTgl} alt="" />
            </div>
        </div>
        <div className='border border-[#BDBDBD] w-full mt-5'></div>
        <div className='mt-3'>
            <div className='text-start text-[12px] '>
                <p>Sunscreen SPF 30+ 100ml</p>
            </div>
            <div className="text-[12px] text-[#BDBDBD] text-start mt-2 rounded-lg flex justify-between">
                <p>100 x Rp 42.000</p>
                <p className='text-black'>Rp 4.200.000</p>
            </div>
            <div className='text-[12px] flex justify-between px-5 border border-[#BDBDBD] h-[40px] items-center rounded-xl mt-4'>
                <p className='text-[#BDBDBD]'>Tanggal Expired</p>
                <img src={iTgl} alt="" />
            </div>
        </div>
        <div className='border border-[#BDBDBD] w-full mt-5'></div>
        <div className="flex flex-col w-full h-full py-3 justify-end">
            <a href='/PembelianStok' className="flex justify-between items-center gap-2 h-[40px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl px-4"><span className='flex items-center gap-2'><BsCart4 />Bayar </span><p className=''>| Total : Rp 4.284.000</p></a>
        </div>
    </div>
)
}

import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import i1 from "../../assets/iconLaporanPenjualan/i1.svg";
import i2 from "../../assets/iconLaporanPenjualan/i2.svg";
import i3 from "../../assets/iconLaporanPenjualan/i3.svg";
import i4 from "../../assets/iconLaporanPenjualan/i4.svg";

export const LaporanProdukTerlaris = () => {
    const { setNav } = useContext(navContext)


setNav('Produk Terlaris')   
document.title = 'Produk Terlaris'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fitt pt-8 text-[#454545] text-[12px]'>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full">
            <p className="">Produk Terlaris</p>
        </div>
        <div className='grid mt-3'>
            <div className='flex h-full gap-3'>
                <div className='flex items-center text-center gap-8 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Banyak Produk terjual</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
                <div className='flex items-center text-center gap-16 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Jasa</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
            </div>
        </div>
        <div className='grid'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-7 mb-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Facial Gold</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Laser</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
            <p className="">Kategori Teratas</p>
        </div>
        <div className='grid mt-3'>
            <div className='flex h-full gap-3'>
                <div className='flex items-center text-center gap-6 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Pendapatan Penjualan</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
                <div className='flex items-center text-center gap-16 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Semua</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
            </div>
        </div>
        <div className='grid'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-7 mb-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Series</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 200.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Sunscreen</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 120.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Serum</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 50.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Toner</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp. 10.000.000</p>
                </div>
            </div>
        </div>
    </div>
)
}

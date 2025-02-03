import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iFrameGra from "../../assets/iconLaporanPenjualan/iFrameGra.svg";
import iFrameKet2 from "../../assets/iconLaporanPenjualan/iFrameKet2.svg";


export const LaporanPenjualanProduk = () => {
    const { setNav } = useContext(navContext)
    
setNav('Laporan Produk')   
document.title = 'Laporan Produk'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fit pt-8 text-[#454545] text-[12px]'>
        <div className='flex gap-4 border rounded-xl border-[#BDBDBD] p-2 w-full'>
            <img src={iTgl} alt="iTgL" className='w-[20px] h-[20px] ml-1'/>
            <p>1 Nov 2024 - 30 Nov 2024</p>
        </div>
        <div className='flex justify-between w-full mt-2'>
            <div className='flex gap-16 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <p>Minggu ini</p>        
                <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
            </div>
            <div className='flex gap-16 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <p>Semua Kategori</p>        
                <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
            </div>
        </div>
        <div>
            <div className='flex justify-between gap-2 text-start items-center border rounded-xl border-[#C2A353] p-4 mt-2'>
                <div className='flex gap-2 w-full'>
                    <p>Total Produk Terjual</p>
                    <img src={iSeruTrans} alt="seru" />
                </div>
                    <p className='text-[14px] font-semibold'>110</p>
            </div>
            <div className='flex justify-between gap-2 text-start items-center border rounded-xl border-[#C2A353] p-4 mt-2'>
                <div className='grid text-start'>
                    <div className='flex gap-2 w-full'>
                        <p>Total Produk Keseluruhan</p>
                        <img src={iSeruTrans} alt="seru" />
                    </div>
                        <p className='text-[14px] font-semibold'>120</p>
                </div>
                <img src={iPan}  alt="" />
            </div>
            <div className='flex justify-between gap-2 text-start items-center border rounded-xl border-[#C2A353] p-4 mt-2'>
                <div className='grid text-start'>
                    <div className='flex gap-2 w-full'>
                        <p>Total Kategori Keseluruhan</p>
                        <img src={iSeruTrans} alt="seru" />
                    </div>
                        <p className='text-[14px] font-semibold'>28</p>
                </div>
                <img src={iPan}  alt="" />
            </div>

            <div className='grid place-items-center'>
                <img src={iFrameGra} alt="Grafik" />
                <img src={iFrameKet2} alt="Ket Grafik" />
            </div>

            <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-5 w-full">
                <p className="">Data Penjualan Produk</p>
            </div>

            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-4'>
                <div className='grid text-start'>
                    <p>Facial Glow Acne</p>
                    <p className='text-[14px] font-semibold'>Rp 7.200.000</p>
                </div>
                <p>296 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-3'>
                <div className='grid text-start'>
                    <p>Facial Gold</p>
                    <p className='text-[14px] font-semibold'>Rp 5.437.000</p>
                </div>
                <p>194 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-3'>
                <div className='grid text-start'>
                    <p>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[14px] font-semibold'>Rp 1.200.000</p>
                </div>
                <p>13 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-3'>
                <div className='grid text-start'>
                    <p>Serum Niacnamide</p>
                    <p className='text-[14px] font-semibold'>Rp 1.200.000</p>
                </div>
                <p>10 Transaksi</p>
            </div>
        </div>
    </div>
)
}

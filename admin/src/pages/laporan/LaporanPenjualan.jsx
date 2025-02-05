import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iTgL from "../../assets/iconproduk/iTgl.svg";
import iSeru from "../../assets/iconLaporanPenjualan/iSeru.svg";
import iPanIjo from "../../assets/iconLaporanPenjualan/iPanIjo.svg";
import iGrafik from "../../assets/iconLaporanPenjualan/iGrafik.svg";
import i1 from "../../assets/iconLaporanPenjualan/i1.svg";
import i2 from "../../assets/iconLaporanPenjualan/i2.svg";
import i3 from "../../assets/iconLaporanPenjualan/i3.svg";
import i4 from "../../assets/iconLaporanPenjualan/i4.svg";



export const LaporanPenjualan = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Laporan Penjualan')   
document.title = 'Laporan Penjualan'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='flex justify-between items-center text-center text-[12px] h-max-[30px]'>
            <div className='flex gap-3 border rounded-xl border-[#BDBDBD] p-1 px-4 w-fit'>
                <img src={iTgL} alt="iTgL" className='w-[20px] h-[20px]'/>
                <p>1 Nov 2024 - 30 Nov 2024</p>
            </div>
            <div className='flex gap-16 border rounded-xl border-[#BDBDBD] p-1 px-4 w-fit'>
                <p>Semua</p>        
                <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
            </div>
        </div>
        <div className='border rounded-xl border-[#C2A353] p-4 mt-4'>
            <div className='flex items-center text-center gap-2'>
                <p>Total Penjualan</p>
                <img src={iSeru} alt="iSeru" />
            </div>
            <div className='flex items-center text-center mt-5'>
                <p className='font-semibold'>Rp 10.000.000</p>
                <img src={iPanIjo} alt="Panah ijo" className='ml-4'/>
                <p className='ml-1 text-[#27AE60]'>100%</p>
            </div>
        </div>
        <div className='flex justify-between gap-2 text-[12px] w-full h-auto'>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-4 h-[70%] w-[150%]'>
                <div className='flex items-center text-center gap-2'>
                    <p>Penjualan Bersih</p>
                    <img src={iSeru} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2 mb-3'>
                    <p className='font-semibold'>Rp 4.500.000</p>
                    <img src={iPanIjo} alt="Panah ijo" className='ml-4'/>
                    <p className='ml-1 text-[#27AE60]'>100%</p>
                </div>
            </div>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-4 w-full h-[70%]'>
                <div className='flex items-center text-center gap-2'>
                    <p>Total Transaksi</p>
                    <img src={iSeru} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2'>
                    <p className='font-semibold'>5000</p>
                    <img src={iPanIjo} alt="Panah ijo" className='ml-4'/>
                    <p className='ml-1 text-[#27AE60]'>100%</p>
                </div>
            </div>
        </div>
        <div className='flex justify-between gap-2 text-[12px] w-full h-auto'>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-4 w-full h-[70%]'>
                <div className='flex items-center text-center gap-2'>
                    <p>Total Produk</p>
                    <img src={iSeru} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2 mb-3'>
                    <p className='font-semibold'>50.000</p>
                    <img src={iPanIjo} alt="Panah ijo" className='ml-4'/>
                    <p className='ml-1 text-[#27AE60]'>100%</p>
                </div>
            </div>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-4 h-[70%] w-[150%]'>
                <div className='flex items-center text-center gap-2'>
                    <p>Penjualan Kotor</p>
                    <img src={iSeru} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2'>
                    <p className='font-semibold'>Rp 6.500.000</p>
                    <img src={iPanIjo} alt="Panah ijo" className='ml-4'/>
                    <p className='ml-1 text-[#27AE60]'>100%</p>
                </div>
            </div>
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-4 w-full">
            <p className="">Grafik Penjualan Kotor</p>
        </div>
        <div>
            <img src={iGrafik} alt="" className='h-fit w-fit' />
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-4 w-full">
            <p className="">Grafik Penjualan Kotor</p>
        </div>
        <div className='grid'>
            <div className='flex h-full gap-3'>
                <div className='flex items-center text-center gap-10 border rounded-xl text-[12px] text-[#BDBDBD] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
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
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-8 mb-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Facial Gold</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Laser</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
        </div>


        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-4 w-full">
            <p className="">Kategori Teratas</p>
        </div>

        
        <div className='flex justify-between items-center text-center gap-10 border rounded-xl text-[12px] text-[#BDBDBD] border-[#BDBDBD] py-2 px-4 mt-4 w-full'>
            <p>Pendapatan Penjualan</p>        
            <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
        </div>
        <div className='grid'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-8 mb-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Series</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 200.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Sunscreen</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 120.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Serum</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 50.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-2 mb-5 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Toner</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 10.000.000</p>
                </div>
            </div>
        </div>
    </div>
)
}
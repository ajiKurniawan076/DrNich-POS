import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iGrafik2 from "../../assets/iconLaporanPenjualan/iGrafik2.svg";
import i1 from "../../assets/iconLaporanPenjualan/i1.svg";
import i2 from "../../assets/iconLaporanPenjualan/i2.svg";
import i3 from "../../assets/iconLaporanPenjualan/i3.svg";
import i4 from "../../assets/iconLaporanPenjualan/i4.svg";



export const LaporanRingkasanPenjualan = () => {
    const { setNav } = useContext(navContext)


setNav('Ringkasan Penjualan')   
document.title = 'Ringkasan Penjualan'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form> 
        <div className='flex justify-between items-center text-center text-[12px] mt-5'>
            <div className='flex gap-4 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <img src={iTgl} alt="iTgL" className='w-[20px] h-[20px] ml-1'/>
                <p>1 Nov 2024 - 30 Nov 2024</p>
            </div>
            <div className='flex gap-12 border rounded-xl border-[#BDBDBD] p-3 w-fit'>
                <p>Minggu ini</p>        
                <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
            </div>
        </div>


        <div className='flex justify-between gap-3 text-[12px] w-full h-auto'>
            <div className='border rounded-xl border-[#C2A353] px-4 pt-3 mt-4 w-full'>
                <div className='flex items-center text-center gap-2'>
                    <p>Total Produk</p>
                    <img src={iSeruTrans} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2 mb-3'>
                    <p className='font-semibold text-[14px]'>Rp 4.000.000</p>
                </div>
            </div>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-4 w-full'>
                <div className='flex items-center text-center gap-2'>
                    <p>HPP</p>
                    <img src={iSeruTrans} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2'>
                    <p className='font-semibold text-[14px]'>Rp 400.000</p>
                </div>
            </div>
        </div>
        <div className='flex justify-between gap-3 text-[12px] w-full h-auto'>
            <div className='border rounded-xl border-[#C2A353] px-4 pt-3 mt-2 w-full'>
                <div className='flex items-center text-center gap-2'>
                    <p>Total Laba Kotor</p>
                    <img src={iSeruTrans} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2 mb-3'>
                    <p className='font-semibold text-[14px]'>Rp 3.600.000</p>
                </div>
            </div>
            <div className='border rounded-xl border-[#C2A353] px-4 py-2 mt-2 w-full'>
                <div className='flex items-center text-center gap-2'>
                    <p>Total Transaksi</p>
                    <img src={iSeruTrans} alt="iSeru" />
                </div>
                <div className='flex items-center text-center mt-2'>
                    <p className='font-semibold text-[14px]'>1000</p>
                </div>
            </div>
        </div>



        <a href='LaporanDataPenjualan' className='flex justify-between items-center text-center border border-[#C2A353] p-4 rounded-xl my-3 text-[12px]'>
            <p>Data Penjualan</p>
            <img src={iPan} alt="Panah" />
        </a>
        <a href='LaporanDataPembelianStok' className='flex justify-between items-center text-center border border-[#C2A353] p-4 rounded-xl mb-3 text-[12px]'>
            <p>Data Pembelian Stok</p>
            <img src={iPan} alt="Panah" />
        </a>
        <a href='LaporanMetodePembayaran' className='flex justify-between items-center text-center border border-[#C2A353] p-4 rounded-xl mb-3 text-[12px]'>
            <p>Laporan Metode Pembayaran</p>
            <img src={iPan} alt="Panah" />
        </a>


        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-2 w-full">
            <p className="">Grafik Penjualan</p>
        </div>
        <div>
            <img src={iGrafik2} alt="" className='h-fit w-fit' />
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-2 w-full">
            <p className="">Laporan Promo</p>
        </div>
        <div className='grid text-[12px] text-[#454545] mt-2'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl'>
                <p>Diskon</p>
                <img src={iPanahB} alt="PanahBawah" />
            </div>
            <div className='flex justify-between text-center items-center border border-[#BDBDBD] rounded-xl p-4 my-3'>
                <div className='grid text-start gap-2'>
                    <p>Mega Launching</p>
                    <p>Rp 2.000.000</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>200 Transaksi</p>
                </div>
            </div>
            <div className='flex justify-between text-center items-center border border-[#BDBDBD] rounded-xl p-4 mb-5'>
                <div className='grid text-start gap-2'>
                    <p>Birthday Promo</p>
                    <p>Rp 1.053.000</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>87 Transaksi</p>
                </div>
            </div>
        </div>


        {/* <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full">
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
        </div> */}

        
        {/* <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
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
        </div> */}

        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
            <p className="">Pelanggan Teratas</p>
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
                    <p>Hana</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 200.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Agus</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 120.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Caca</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 50.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px] mb-8'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Diana</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp. 10.000.000</p>
                </div>
            </div>
        </div>
    </div>
)
}

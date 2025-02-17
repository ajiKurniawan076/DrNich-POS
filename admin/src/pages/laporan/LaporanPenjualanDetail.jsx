import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iFrame from "../../assets/iconLaporanPenjualan/iFrame.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import { useLocation } from 'react-router-dom';

export const LaporanPenjualanDetail = () => {
    const { setNav, setLink } = useContext(navContext)
    const location = useLocation()
    const { transaksi } = location.state || {};
    const [total, setTotal] = useState()

    // useEffect(() => {
    //     const hasil = () => {}
    // },[transaksi])

setLink('/pos/LaporanRingkasanPenjualan')
setNav('Detail')   
document.title = 'Detail'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fit pt-8 text-[#454545] text-[12px]'>
        <button
            onClick={()=>console.log(transaksi)}
        >
            test
        </button>
        <div className='flex justify-between text-center items-center border rounded-xl border-[#C2A353] p-4'> 
            <div className='Grid text-start'>
                <p className='text-[10px] text-[#BDBDBD]'>Pelanggan</p>
                <p>{transaksi?.pelanggan?.pelanggan}</p>
            </div>
            <div className='flex gap-2'>
                <img src={iFrame} alt="poin" />
                <img src={iPan} alt="panah" />
            </div>
        </div>
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <div className='grid gap-1'>
                <p className='text-[10px] text-[#BDBDBD]'>ID Transaksi</p>
                <p className='text-[#C2A353]'>{transaksi?.invoice}</p>
            </div>
            <div className='grid gap-1'>
                <p>{transaksi.createdAt.substring(0, 10)} <span>/</span> {transaksi?.createdAt.substring(11, 16)}</p>
                <p>Pembayaran Rp. {transaksi?.totalAkhir.toLocaleString('id-ID')}</p>
            </div>
        </div>
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <p className='text-[10px] text-[#BDBDBD]'>Detail Pesanan</p>
            {transaksi?.transaksiDetail?.map((datax, i) => (
                <>
                    <div className='font-semibold text-[14px] mt-[10px]'>
                        <p>{datax?.produk?.namaProduk}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Jumlah</p>
                        <p>{datax?.jumlah}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Harga Satuan</p>
                        <p>Rp {datax?.produk?.hargaJual.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='border border-dashed border-[#BDBDBD] my-3'></div>
                    <div className='flex justify-between'>
                        <p>Subtotal Produk</p>
                        <p>Rp. {(Number(datax?.jumlah) * Number(datax?.produk?.hargaJual)).toLocaleString('id-ID')}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Promo Diskon</p>
                        <p>Rp. {transaksi?.potongan.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Total</p>
                        <p>Rp. {((Number(datax?.jumlah) * Number(datax?.produk?.hargaJual)) - (transaksi?.potongan)).toLocaleString('id-ID')}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Pendapatan Poin</p>
                        <p className='text-[#27AE60]'>+100</p>
                    </div>
                    {/* <button onClick={()=>console.log(datax)} >coba</button> */}
                </>
            ))}
        </div>
        
        <div className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4'>
            <p className='text-[10px] text-[#BDBDBD]'>Detail Pembayaran</p>
            <div className='flex justify-between'>
                <p>Toral Produk</p>
                <p>Rp. {transaksi?.totalAkhir.toLocaleString('id-ID')}</p>
            </div>
            <div className='flex justify-between'>
                <p>Tunai</p>
                <p>Rp. {transaksi?.pembayaran.toLocaleString('id-ID')}</p>
            </div>
            <div className='border border-dashed border-[#BDBDBD] my-3'></div>
            <div className='flex justify-between'>
                <p>Kembalian</p>
                <p>Rp. {transaksi?.kembalian.toLocaleString('id-ID')}</p>
            </div>
        </div>
        <a href={`/pos/LaporanLihatStruk/${transaksi?._id}`} className='grid mt-2 gap-2 text-start border rounded-xl border-[#C2A353] p-4 '>
            <button className='flex justify-between text-start'>
                <p className='text-[14px] text-[#C2A353]'>Lihat Struk</p>
                <img src={iPan} alt="Panah" />
            </button>
        </a>
    </div>
)
}

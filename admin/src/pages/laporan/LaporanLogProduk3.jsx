import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";


export const LaporanLogProduk3 = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState([])
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("https://api.drnich.co.id/api/pos/kasir/detailtransaksi/" + id)
                .then((response) => {
                    setData(response.data)
                    console.log(response.data)
            })
        }
        fetchData()
    },[])
setLink(-1)
setNav('Log Produk')   
document.title = 'Log Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-fit min-h-screen pt-8 text-[12px] text-[#454545]'>
        <div className='items-start border border-[#C2A353] rounded-xl p-4'>
                    <p className='font-semibold'>{data.transaksi?.pelanggan?.namaPelanggan}</p>
                </div>
                <div className='grid place-items-start border border-[#C2A353] rounded-xl p-4 my-2 gap-[10px]'>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>Tanggal Transaksi</label>
                        <p>{new Date(data.createdAt)?.toLocaleString("id-ID")}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>ID Transaksi</label>
                        <p>{data.transaksi?.invoice}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>Nama Produk</label>
                        <p>{data.produk?.namaProduk}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>SKU</label>
                        <p>{data.produk?.sku}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>Jumlah Barang Masuk</label>
                        <p>{data.jumlah}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>Harga Satuan</label>
                        <p>{data.produk?.hargaJual?.toLocaleString("id-ID")}</p>
                    </div>
                    <div className='grid place-items-start gap-[10px]'>
                        <label className='text-[#BDBDBD]'>Total Harga Pembelian</label>
                        <p>{(data.jumlah * data.produk?.hargaJual).toLocaleString("id-ID")}</p>
                    </div>
                </div>
                <a href={"/pos/pembayaranberhasil/"+data.transaksi?._id}  className='flex justify-between w-full border border-[#C2A353] rounded-xl p-4 text-[#C2A353]'>
                    Lihat Rincian
                    <img src={iPan} alt="panah" />
                </a>
    </div>
)
}

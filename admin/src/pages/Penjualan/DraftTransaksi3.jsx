import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iPanah from "../../assets/iconkasir/iPanah.svg";
import iFrame100 from "../../assets/iconkasir/iFrame100.svg";
import iPan from "../../assets/iconkasir/iPan.svg";
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const DraftTransaksi3 = () => {
    const { setNav, setLink } = useContext(navContext)
    const {id} = useParams()
    const [transaksi, setTransaksi] = useState({})
    useEffect(()=>{
        const fetch = async() =>{
            await axios.get('https://api.drnich.co.id/api/pos/kasir/transaksi/'+id).then(response => 
                response.status==200 && setTransaksi(response.data)
            )
        }
        fetch()
    },[])

    const handleBuy = (e) => {
        e.preventDefault()
        const data = {
            status: "Done"
        }

        const buy = async () => {
            await axios.put('https://api.drnich.co.id/api/pos/kasir/updatetransaksi/'+id, data).then(response=>
                response.status==200 && console.log(response)
            )
        }
        buy()
    }
    useEffect(()=>{
        console.log(transaksi.status)
    },[transaksi.status])
setNav('Detail')   
document.title = 'Detail'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between text-[#BDBDBD]'>
            <p>ID Transaksi</p>
            <p>#{transaksi?.invoice}</p>
        </div>
        <div className='flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p>{transaksi?.pelanggan?.namaPelanggan}</p>
            <img src={iFrame100} alt="" />
        </div>
        <div className='flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p>{transaksi?.promo?.namaPromo}</p>
            <img src={iPanah} alt="panah" />
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] py-0.5 text-start mt-4 w-full">
            <p>Rincian Pembelian</p>
        </div>
        <div className='flex justify-between text-[#BDBDBD] w-full mt-4'>
            <p>ID Transaksi</p>
            <p>#{transaksi?.invoice}</p>
        </div>
        {transaksi?.transaksiDetail?.map((item,i) => (
           <div key={i} className='flex justify-between w-full mt-2'>
           <div className='grid place-items-start w-fitt font-semibold'>
               <p>{item?.produk?.namaProduk}</p>
               <p>{item?.jumlah} x Rp {item?.produk?.hargaJual}</p>
           </div>
           <p className='font-semibold'>Rp {item?.jumlah * item?.produk?.hargaJual}</p>
       </div>
        ))}
        <div className='border border-dashed border-[#BDBDBD] my-5'></div>
        <div className='flex justify-between w-full'>
            <p>Total</p>
            <p className='font-semibold'>Rp {transaksi?.total}</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Potongan</p>
            <p className='font-semibold'>Rp {transaksi?.potongan}</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Total Akhir</p>
            <p className='font-semibold'>Rp {transaksi?.totalAkhir}</p>
        </div>
        <div className='flex justify-between items-end h-full text-[14px] font-semibold'>
            <a href='#' className='border border-[#C2A353] text-[#C2A353] rounded-xl w-[18%] p-4'>
                Edit
            </a>
            <button
            onClick={handleBuy}
            className='flex justify-between bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[80%] p-4 rounded-xl text-white'>
                Bayar
                <img src={iPan} alt="" />
            </button>
        </div>
    </div>
)
}

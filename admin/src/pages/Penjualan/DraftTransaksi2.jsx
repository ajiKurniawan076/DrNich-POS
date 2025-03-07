import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import axios from 'axios'

export const DraftTransaksi2 = () => {
    const { setNav, setLink } = useContext(navContext)
    const [transaksi, setTransaksi] = useState([])

    useEffect(()=>{
        const fetch = async() =>{
            await axios.get('https://api.drnich.co.id/api/pos/kasir/draftTransaksi').then(
                response => response.status==200 && setTransaksi(response.data)
            )
        }
        fetch()
        setNav('Transaksi')   
        setLink('/pos')
        document.title = 'Transaksi'
    },[])
        return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full min-h-screen h-fit pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between'>
            <a href='Kasir' className='flex justify-center text-center border-b-2 w-[50%] text-[#BDBDBD]'>
                <p>Transaksi</p>
            </a>
            <button className='border-b-2 border-[#C2A353] text-[#C2A353] w-[50%] shadow-md'>
                <p>Draf Transaksi</p>
            </button>
        </div>
        {transaksi.map((item, i) => (
            <a href={`DrafTransaksiDetail/${item._id}`} className='bg-[#C2A353] flex justify-between w-full border border-[#BDBDBD] rounded-b-lg rounded-t-xl pt-4 mt-4' key={i}>
            <div className='grid w-full'>
                <p className='text-white font-bold px-3'>{item?.pelanggan?.namaPelanggan || 'Anonim'}</p>
            <div className='bg-white p-2 mt-1 rounded-b-lg'> 
            <div className='flex ms-3 p-2 w-full justify-between mb-3'>  
                <p>Produk</p>
                <p>#{item.invoice}</p>
            </div>
            <div className='border-t border-[#BDBDBD] rounded-lg p-2'>
                {item.transaksiDetail.length>0 && item.transaksiDetail.map((isi,j) => (
                    <div key={j} className='w-full flex justify-between'>
                   <p>{isi.produk.namaProduk}</p> 
                   <p>Rp. {isi.produk.hargaJual?.toLocaleString('id-ID')}</p> 
                   </div>
                ))}
                <div className='w-full border-t mt-2 mb-2 flex justify-between'>
                   <p>Total</p> 
                   <p>Rp. {item.totalAkhir?.toLocaleString('id-ID')}</p> 
                   </div>
                </div>
                </div>
            </div>
        </a>
        ))}
        
        
    </div>
)
}

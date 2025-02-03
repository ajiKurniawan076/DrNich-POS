import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { navContext } from '../../App2'

export const RiwayatDetail = () => {
    const {id} = useParams()
    const {setNav} = useContext(navContext)
    const [transaksi, settransaksi] = useState([])
    useEffect(()=>{
        fetch("/TransaksiSupplier.json").then(
          (response) => response.json()
        ).then((data)=>{
          const Transaksi = data.find((trans)=>trans.id ===id)
          settransaksi(Transaksi)
      })
        setNav('Detail Transaksi')
      },[])
  return (
    
        
        <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full">
        <div className="flex flex-col gap-1 px-3 mx-10 rounded-xl border-2 border-yellow-500/40">
          <label className="text-start font-light text-sm">Tanggal Transaksi</label>
          <p className="text-start font-bold px-2 text-sm rounded-xl h-[30px]">Tangal Disini</p>
          <label className="text-start font-light text-sm">ID Transaksi</label>
          <p className="text-start font-bold px-2 text-sm rounded-xl h-[30px]" >{transaksi.id}</p>
          <label className="text-start font-light text-sm">Items</label>
          <p className="text-start font-bold px-2 text-sm rounded-xl h-[30px]" >Item disini</p>
          <label className="text-start font-light text-sm">Total Pembayaran</label>
          <p className="text-start font-bold px-2 text-sm rounded-xl h-[30px]" >{transaksi.Total}</p>
        </div>
        
     
        </div>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Transaksihapus = () => {
    const [transaksi,setTransaksi] = useState([])
useEffect(()=>{
    const fetch = async() =>{
        await axios.get('https://api.drnich.co.id/api/pos/kasir/transaksi').then(
            response => {
                setTransaksi(response.data)
                console.log('abc')
            }
        )
    }
    fetch()
},[])
const deletee =  (e,id)=>{
    e.preventDefault()
    axios.delete('https://api.drnich.co.id/api/pos/kasir/deletetransaksi/'+id).then(response =>
        response.status==200 && console.log('sukses')
    )
}
  return (
    <div className='bg-white w-full min-h-full h-fit'>
        <ul className='flex flex-col'>
            {transaksi.length>0 && transaksi.map((item,i)=>(
                <div className='flex'>
                <li>{item._id}</li>
                <button className='ms-5 text-red-500' onClick={(e)=>{deletee(e,item._id)}}>delete</button>
                </div>
            ))}
            
        </ul>
    </div>

  )
}

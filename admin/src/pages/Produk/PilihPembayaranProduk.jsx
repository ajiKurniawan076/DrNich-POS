import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export const PilihPembayaranProduk = () => {
    const { setNav, setLink } = useContext(navContext)
    const [transaksi, setTransaksi] = useState([])
    const { id } = useParams()
    const [tunai, setTunai] = useState('')
    const [tunaiR, setTunaiR] = useState(0)
    const tunaiRef = useRef(null)
    const [metode, setmetode] = useState("Tunai")
    useEffect(() => {
        const fetch = async () => {
            await axios.get('https://api.drnich.co.id/api/pos/produk/belanjapos/' + id)
                .then(response => (
                    setTransaksi(response.data),
                    console.log(response.data)
            ))
        }
        fetch()
        setNav('Pembayaran')
        document.title = 'Pembayaran'
        setLink('/pos/kasir')
    }, [])

    const changeTunai = () => {
        setTunaiR(tunaiRef.current.value.replace(/\D/g, ""))
        setTunai(Number(tunaiRef.current.value.replace(/\D/g, "")).toLocaleString('id-ID'))
    }


    const bayar = async (e) => {
        e.preventDefault()
        if (tunaiR < transaksi.totalAkhir) { toast.error('Uang Tunai Tidak Cukup') }
        else {
            const kembalian = tunaiR - transaksi.totalAkhir
            try {
                await axios.put('https://api.drnich.co.id/api/pos/produk/updatebelanjapos/' + id, { status: 'Done', pembayaran: tunaiR, kembalian: kembalian, metode: metode}, 
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        withCredentials: true,
                    }
                ).then(
                    response => {
                        if (response.status == 200) {
                            toast.success('Pembayaran Berhasil')
                            setTimeout(() => {
                                toast.success('Redirecting...')
                                window.location.href = `/pos/PembayaranProduk/${id}`
                            }, 1500)
                        }
                        else {
                            toast.error('Gagal Melakukan Transaksi')
                        }
                    }
                )
            }
            catch (error) {
                toast.error('Gagal Melakukan Transaksi')
            }
        }
    }


    return (
        <form className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
            <ToastContainer />
            <div className='Grid place-items-start'>
                <p>Total pembayaran</p>
                <p className='font-semibold text-[24px] my-2'>Rp. {transaksi.total?.toLocaleString('id-ID')}</p>
                <p>Penerimaan Tunai</p>
            </div>
            <div className='flex justify-start items-start text-[14px] border border-[#BDBDBD] rounded-xl w-full px-4 py-2'>
                <span>{`Rp. `}<span className='ms-2'></span></span>
                <input
                    ref={tunaiRef}
                    onChange={changeTunai}
                    value={tunai}
                    type="text"
                    placeholder='180.000'
                    className='w-full outline-none'
                />
            </div>
            <div className='flex justify-between items-center text-center my-2 w-full text-[#C2A353] gap-2'>
            <button onClick={(e)=>{
                    e.preventDefault()
                    setmetode('Tunai')
                }} className={`border border-[#C2A353] rounded-xl p-2 w-[20%] duration-500 ${metode=='Tunai' ? 'bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white' : 'bg-white text-[#C2A353]'}`}>
                    <p>Tunai</p>
                </button>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setmetode('Debit')
                }} className={`border border-[#C2A353] rounded-xl p-2 w-[35%] duration-500 ${metode=='Debit' ? 'bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white' : 'bg-white text-[#C2A353]'}`}>
                    <p>Kartu Debit</p>
                </button>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setmetode('QRIS')
                }} className={`border border-[#C2A353] rounded-xl p-2 w-[20%] duration-500 ${metode=='QRIS' ? 'bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white' : 'bg-white text-[#C2A353]'}`}>
                    <p>QRIS</p>
                </button>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setmetode('Transfer')
                }} className={`border border-[#C2A353] rounded-xl p-2 w-[35%] duration-500 ${metode=='Transfer' ? 'bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white' : 'bg-white text-[#C2A353]'}`}>
                    <p>Transfer</p>
                </button>
            </div>
            <div className='flex justify-end items-end text-[14px] mt-4 w-full h-full'>
                <button
                    onClick={bayar}
                    className='border border-[#BDBDBD] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white w-full p-4 rounded-xl'>
                    Bayar
                </button>
            </div>
        </form>
    )
}

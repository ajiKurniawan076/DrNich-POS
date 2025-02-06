import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTam from "../../assets/iconkasir/iTam.svg";
import { modaltransaksi } from './Kasir4'


export const PilihPromo = () => {
    const { setNav, setLink } = useContext(navContext)
    const {modalPro, setModalPro, promo, promoTerpilih, setPromoTerpilih} = useContext(modaltransaksi)
    const [filter, setFilter] = useState([])
    const [pencarian, setpencarian] = useState([])
    const [pilihan, setPilihan] = useState('Diskon')
    const cariRef = useRef(null)
    useEffect(()=>{
        const filterr = promo.filter(item=>item.jenis == pilihan && item.namaPromo.toLowerCase().includes(cariRef.current.value.toLowerCase()))
        setFilter(filterr)
    },[pilihan])
    useEffect(()=>{
        const filterr = promo.filter(item=>item.jenis == 'Diskon')
        cari()
        setFilter(filterr)
    },[promo])

    const cari = () => {
        const list = promo.filter(item =>
            item.namaPromo.toLowerCase().includes(cariRef.current.value.toLowerCase()) && item.jenis == pilihan
        )
        setFilter(list)
    }
return (
    <div className={`fixed z-50 top-0 bg-black/20 start-0 flex justify-center w-full h-full overflow-scroll ${modalPro ? '' : 'hidden'}`}>
    <div className='flex mt-[75px] flex-col px-5 py-8 gap-1 bg-white max-w-[550px] w-[100%] md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] h-full pt-8 text-[#454545] text-[12px]'>
        <div className='flex justify-between'>
            <button
            onClick={(e)=>{
                e.preventDefault()
                setPilihan('Diskon')
            }}
            className={`${pilihan == 'Diskon'? 'border-[#C2A353] text-[#C2A353]':'text-[#BDBDBD]'} border-b-2  w-[50%] shadow-md p-2`}>
                <p>Diskon</p>
            </button>
            <button
            onClick={(e)=>{
                e.preventDefault()
                setPilihan('Cashback')
            }}
            className={`${pilihan == 'Cashback'? 'border-[#C2A353] text-[#C2A353]':'text-[#BDBDBD]'} border-b-2  w-[50%] shadow-md p-2`}>
                <p>Cashback</p>
            </button>
        </div>
        <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2 my-5">
            <img src={iCari} alt="Cari" />
            <input
            ref ={cariRef}
            onChange={cari}
            type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        {filter.map((item,i)=>(
        <button
        onClick={(e) => {
            e.preventDefault()
            setPromoTerpilih(item)
            setModalPro(false)
        }}
        key={i} className='grid text-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p className='font-semibold'>{item.namaPromo}</p>
            <div className='flex justify-between'>
                {pilihan == 'Diskon' ? <p>Diskon {item.jenisPotongan=='persen'? '%':"Rp."} {item.potongan}</p>: <p>Cashback {item.cashback} Poin</p>}
                <p className='text-[10px] text-[#C2A353]'>{item.keterangan}</p>
            </div>
        </button>
        ))
    }
        <div className='flex items-end h-full'>
            <button 
            onClick={(e)=>{
                e.preventDefault()
                setModalPro(false)
            }}
            className='flex gap-2 justify-center text-center items-center border bg-gradient-to-l from-[#C2A353] to-[#EAC564] text-white w-[100%] p-3 rounded-xl'>
                <p className='text-[14px] font-semibold'>Tutup</p>
            </button>
        </div>
    </div>
    </div>
)
}

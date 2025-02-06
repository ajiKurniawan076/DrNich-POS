import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iFrame0 from "../../assets/iconkasir/iFrame0.svg";
import iFrame100 from "../../assets/iconkasir/iFrame100.svg";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import { modaltransaksi } from './Kasir4'




export const PilihPelanggan = () => {
    const { setNav, setLink } = useContext(navContext)
    const {modalPel, setModalPel, pelanggan, pelangganTerpilih, setPelangganTerpilih} = useContext(modaltransaksi)
    const [filterPelanggan, setFilterPelanggan] = useState([])
    const cariRef = useRef(null)
    useEffect(()=>{
        pelanggan.length>0 && setFilterPelanggan(pelanggan)
    },[pelanggan])

    const filter = () => {
        const list =  pelanggan.filter(item => 
            item.namaPelanggan?.toLowerCase().includes(cariRef.current.value.toLowerCase()) ||
            item.nomorTelepon?.toLowerCase().includes(cariRef.current.value.toLowerCase())
        )
        setFilterPelanggan(list)
    }
return (
    
    <div className={`fixed bg-black/20 z-50 top-0 start-0 w-full h-full overflow-scroll ${modalPel ? '' : 'hidden'}`}>
    <div className='flex mx-auto md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] flex-col px-5 py-8 gap-1 w-[100%] bg-white max-w-[500px] min-h-full h-fit pt-8 text-[#454545] text-[12px] mt-[75px]'>
    <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input
            ref={cariRef}
            onChange={filter}
            type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        {!filterPelanggan ? pelanggan.map((item,i) => (
        <button
        onClick={(e)=>{
            e.preventDefault()
            setPelangganTerpilih(item)
            setModalPel(false)
        }}
        key={i} className='flex justify-between text-center items-center border border-[#BDBDBD] p-4 rounded-xl mt-5'>
            <div className='grid text-start gap-1'>
                <p className='font-semibold'>{item.namaPelanggan}</p>
                <p className='text-[#BDBDBD]'>{item.nomorTelepon}</p>
            </div>
            <img src={iFrame0} alt="" />
        </button>
        ))
        :
        filterPelanggan.map((item,i) => (
            <button
            onClick={(e)=>{
                e.preventDefault()
                setPelangganTerpilih(item)
                setModalPel(false)
            }}
            key={i} className='flex justify-between text-center items-center border border-[#BDBDBD] p-4 rounded-xl mt-5'>
                <div className='grid text-start gap-1'>
                    <p className='font-semibold'>{item.namaPelanggan}</p>
                    <p className='text-[#BDBDBD]'>{item.nomorTelepon}</p>
                </div>
                <img src={iFrame0} alt="" />
            </button>
            ))
    }
        
        <div className='flex items-end mt-auto'>
            <button 
            onClick={(e)=>{
                e.preventDefault()
                setModalPel(false)
            }}
            className='flex gap-2 justify-center text-center items-center border bg-gradient-to-l from-[#C2A353] to-[#EAC564] text-white w-[100%] p-3 rounded-xl'>
                <p className='text-[14px] font-semibold'>Tutup</p>
            </button>
        </div>
    </div>
    </div>
)
}

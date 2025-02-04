import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import axios from 'axios';

export const TambahDiskon4 = () => {
    const { setNav } = useContext(navContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => { await axios.get('https://api.drnich.co.id/api/pos/promo/promo').then(
            Response => {
                const filterr = Response.data.filter(item => item.jenis == "Diskon")
                setData(filterr)
                console.log(filterr)
                }
            
            )
        }
        fetchData();
    },[])

setNav('Diskon')   
document.title = 'Diskon'
return (
<<<<<<< HEAD
    <div className="flex flex-col px-7 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]">
        <div className='flex flex-col overflow-auto gap-[10px] mx-3 h-full'>
            <form className="mb-5 flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
                <img src={iCari} alt="Cari" />
                <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
            </form>
            {data.map((item, i) => (
                <div key={i} className='grid place-items-start w-full border border-[#BDBDBD] rounded-xl px-[20px] py-[15px]'>
                    <p className='font-semibold'>{item.namaPromo}</p>
                    <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                        <p>{item.potongan}</p>
                        <p className='text-[#EAC564]'>{item.keterangan}</p>
                    </div>
=======
    <div className="flex flex-col px-5 py-8 gap-1 bg-white w-full min-h-full h-fit pt-8 text-[#454545] text-[12px]">
        <form className="flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form>
        {data.map((item, i) => (
            <div key={i} className='grid place-items-start mt-4 w-full border border-[#BDBDBD] rounded-xl p-4'>
                <p className='font-medium'>{item.namaPromo}</p>
                <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                    <p>{item.potongan}</p>
                    <p className='text-[10px] text-[#EAC564]'>{item.keterangan}</p>
>>>>>>> fff49db36a3ddff6d9bfa10ad8c60295f19ce99b
                </div>
            ))}
        </div>
        
<<<<<<< HEAD
        <a href='TambahDiskon3' className='flex mt-auto mx-2'>
=======
        <a href='TambahDiskon3' className='flex items-end mt-auto h-fit'>
>>>>>>> fff49db36a3ddff6d9bfa10ad8c60295f19ce99b
            <button className='flex justify-center gap-2 text-white text-[14px] bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4'>
                <img src={iTamPu} alt="TambahPu" />
                <p>Tambah diskon</p>
            </button>
        </a>
    </div>
)
}

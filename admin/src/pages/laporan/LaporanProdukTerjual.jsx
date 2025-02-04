import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";

export const LaporanProdukTerjual = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Produk Terjual')   
document.title = 'Produk Terjual'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fit pt-8 text-[#454545] text-[12px]'>
        <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
            <img src={iCari} alt="Cari" />
            <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
        </form> 
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-5'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Facial Glow Acne</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Facial Glow Acne</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Facial Glow Acne</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Facial Glow Acne</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Facial Glow Acne</p>
        </div>
        <div className='grid text-start p-3 border border-[#BDBDBD] rounded-xl w-full mt-1'>
            <p>Suncreen SPF 30+ 100ml</p>
        </div>
    </div>
)
}

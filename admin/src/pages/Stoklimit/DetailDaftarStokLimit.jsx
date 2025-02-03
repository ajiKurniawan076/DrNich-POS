import React, { useContext } from 'react'
import { navContext } from '../../App2'
import iPanKu from "../../assets/iconkasir/iPanKu.svg";
import iKranjang from "../../assets/iconkasir/iKranjang.svg";

export const DetailDaftarStokLimit = () => {
    const { setNav } = useContext(navContext)

setNav('Detail')   
document.title = 'Detail'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <button className='flex justify-between text-center items-center border border-[#EAC564] rounded-xl p-4 mb-2'>
            <div className='Grid place-items-start gap-1'>
                <p className='text-[#BDBDBD] text-[10px]'>Supplier</p>
                <p>PT. BEAUTY</p>
            </div>
            <img src={iPanKu} alt="panah kuning" />
        </button>
        <div className='Grid place-items-start border border-[#EAC564] rounded-xl p-4'>
            <div className='grid place-items-start gap-1'>
                <p className='text-[#BDBDBD] text-[10px]'>Kategori Produk</p>
                <p>Sunscreen</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Nama Produk</p>
                <p>Sunscreen SPF 30+ 100ml</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>SKU</p>
                <p>DN001</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Harga Beli</p>
                <p>Rp 70.000</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Harga Jual</p>
                <p>Rp 100.000</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Persentase Keuntungan</p>
                <p>30%</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Nominal Keuntungan</p>
                <p>Rp 30.000</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Stok Terbatas</p>
                <p>17 Pcs</p>
            </div>
            <div className='grid place-items-start gap-1 mt-4'>
                <p className='text-[#BDBDBD] text-[10px]'>Stok Minimum</p>
                <p>25 Pcs</p>
            </div>
        </div>
        <button className='flex justify-center items-center text-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white text-[14px] border rounded-xl p-4 w-full'>
            <img className='mt-2' src={iKranjang} alt="Keranjang" />
            <p>Beli Produk</p>
        </button>
    </div>
)
}

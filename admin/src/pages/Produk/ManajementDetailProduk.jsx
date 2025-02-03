import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconproduk/iPan.svg";
import iSeru from "../../assets/iconproduk/iSeru.svg";
import iTambahP from "../../assets/iconproduk/iTambahP.svg";


export const ManajementDetailProduk = () => {
    const { setNav } = useContext(navContext)

setNav('Detail')   
document.title = 'Manajemen Detail Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8'>
        <div className='flex justify-between p-4 border rounded-xl border-[#C2A353]'>
            <div className='grid text-start'>
                <p className='text-[#BDBDBD] text-[10px]'>Supplier</p>
                <p className='text-[12px]'>PT.BEAUTY</p>
            </div>
            <img src={iPan} alt="" />
        </div>
        <div className="flex flex-col w-full gap-1 py-3 px-3 mt-2 rounded-xl border-2 border-yellow-500/40 text-[12px]">
            <div className="flex items-center p-2">
                <div>
                    <img src={iSeru} alt="seru" />
                </div>
                <div className="flex flex-col items-start pl-4 text-[10px]">
                    <p>26 Item Tersisa</p>
                        <div className="text-[12px] text-[#E2B93B]">
                            <p>Stok Hampir Habis</p>
                        </div>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Kategori Produk</p>
                <div className="text-[12px] text-[#454545]">
                    <p>Sunscreen</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Nama Produk</p>
                <div className="text-[12px] text-[#454545]">
                    <p>Sunscreen SPF 30+ 100ml</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>SKU</p>
                <div className="text-[12px] text-[#454545]">
                    <p>DN001</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Harga Beli</p>
                <div className="text-[12px] text-[#454545]">
                    <p>Rp 42.000</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Harga Jual</p>
                <div className="text-[12px] text-[#454545]">
                    <p>Rp 70.000</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Persentase Keuntungan</p>
                <div className="text-[12px] text-[#454545]">
                    <p>30%</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Nominal Keuntungan</p>
                <div className="text-[12px] text-[#454545]">
                    <p>Rp 30.000</p>
                </div>
            </div>
            <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                <p>Stok Minimum</p>
                <div className="text-[12px] text-[#454545]">
                    <p>10 Pcs</p>
                </div>
            </div>
        </div>
        <div className='flex justify-between p-4 border rounded-xl border-[#C2A353] mt-2'>
            <p className='text-[12px] text-[#C2A353]'>Lihat Log Produk</p>
            <img src={iPan} alt="" />
        </div>
        <div className="flex justify-between gap-2 w-full pt-2 py-3 text-[14px]">
            <a href='DetailDaftarBelanja' className="flex justify-center items-center w-[180px] gap-2 h-[45px] bg-white text-yellow-500 border border-yellow-500 rounded-xl"> Kurangi Stok</a>
            <a href='DetailDaftarBelanja' className="flex justify-center items-center w-full gap-2 h-[45px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl"><img src={iTambahP} alt="" /> Tambah Stok</a>
        </div>
    </div>
)
}
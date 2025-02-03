import { useContext, useEffect, useState } from "react"
import { navContext } from "../../App2"
import iSeru from "../../assets/iconproduk/iSeru.svg";
import iPan from "../../assets/iconproduk/iPan.svg";
import { BsCart4 } from "react-icons/bs";

export const DetailDaftarBelanja = () => {
const {setNav} = useContext(navContext)


setNav('Detail Daftar Belanja')
document.title = 'Detail Daftar Belanja'
return (
    <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full">
        <div className="flex items-center justify-between px-4 text-start mx-4 w-auto rounded-xl border-2 py-3 border-yellow-500/40">
            <p>PT. BEAUTY</p>
            <img src={iPan} className="h-[15px] w-[15px]" alt="panah" />
        </div>
        <form action="">
        <div className="flex flex-col mx-4 w-auto gap-1 py-3 px-3 mt-2 rounded-xl border-2 border-yellow-500/40 text-[12px]">
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
        <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">Jumlah Pembelian</label>
            <input type="text" placeholder="1"
            className="mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[30px] "/>
        </div>
        <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">Harga Total</label>
            <input type="text" placeholder="Rp 42.000"
            className="mx-3 px-4 bg- border text-sm text-black border-black/30 rounded-xl h-[30px]"/>
        </div>
        <div className="flex flex-col justify-end w-full pt-4 py-3 px-3">
            <a href='DetailDaftarBelanja' className="flex justify-center items-center gap-2 h-[40px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl"><BsCart4 /> Beli Sekarang</a>
        </div>
        </form>
    </div>
)
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconproduk/iPan.svg";
import iSeru from "../../assets/iconproduk/iSeru.svg";
import iTambahP from "../../assets/iconproduk/iTambahP.svg";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DaftarBelanja } from './DaftarBelanja'
import { DaftarBelanjaModals } from './DaftarBelanjaModals'

export const modalStokContext = createContext()
export const ManajementDetailStok = () => {
    const { setNav, setLink } = useContext(navContext)
    const [produk, setProduk] = useState([])
    const { id } = useParams()
    const [modalStok, setModalStok] = useState(false)
    const handlemodals = () => {
        setModals(true)
    }

    useEffect(() => {
        const fetch = async () => {
            await axios.get(`https://api.drnich.co.id/api/pos/produk/produk/${id}`).then(
                response => {
                    setProduk(response.data)
                    console.log(response.data)
                }
            )
        }
        fetch()
        setNav('Manajemen Stok')
        setLink('/pos/manajementstok')
    }, [])

setNav('Detail')   
document.title = 'Manajemen Detail Stok'
return (
    <modalStokContext.Provider value={{ modalStok, setModalStok }}>
        <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-fit pt-8'>
            <div className='flex justify-between p-4 border rounded-xl border-[#C2A353]'>
                <div className='grid text-start'>
                    <p className='text-[#BDBDBD] text-[10px]'>Supplier</p>
                    <p className='text-[12px]'>PT.BEAUTY</p>
                </div>
                <img src={iPan} alt="Panah" />
            </div>
            
            <div className="flex flex-col w-full gap-1 py-3 px-3 mt-2 rounded-xl border-2 border-yellow-500/40 text-[12px]">
                <div className="flex items-center p-2">
                    <div>
                        <img src={iSeru} alt="seru" />
                    </div>
                    <div className="flex flex-col items-start pl-4 text-[10px]">
                        <p>{produk.stok} Item Tersisa</p>
                            <div className="text-[12px] text-[#E2B93B]">
                            <p> {produk.stok < produk.minStok && "Stok Melewati Minimum" }</p>
                            </div>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Kategori Produk</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>{produk.kategori?.kategori}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Nama Produk</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>{produk.namaProduk}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>SKU</label>
                    <div className="text-[12px] text-[#454545]">
                        <p></p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Harga Beli</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>Rp. {produk.hargaBeli?.toLocaleString("id-ID")}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <p>Harga Jual</p>
                    <div className="text-[12px] text-[#454545]">
                        <p>Rp. {produk.hargaJual?.toLocaleString("id-ID")}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Persentase Keuntungan</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>{((produk.hargaJual - produk.hargaBeli)/produk.hargaBeli*100).toFixed(2)}%</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Nominal Keuntungan</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>Rp. {(produk.hargaJual - produk.hargaBeli).toLocaleString("id-ID")}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start text-[10px] text-[#BDBDBD] pt-1 pb-2">
                    <label>Stok Minimum</label>
                    <div className="text-[12px] text-[#454545]">
                        <p>{produk.minStok}</p>
                    </div>
                </div>
            </div>
            <a href='ManajementLihatLogProduk' className='flex justify-between p-4 border rounded-xl border-[#C2A353] mt-2'>
                <p className='text-[12px] text-[#C2A353]'>Lihat Log Produk</p>
                <img src={iPan} alt="" />
            </a>
            <div className='border my-3'></div>
            <div className="flex justify-between gap-2 w-full pb-5 text-[14px]">
                <a href={`/pos/ManajementKurangiStok/${id}`} className="flex justify-center items-center w-[180px] gap-2 h-[45px] bg-white text-yellow-500 border border-yellow-500 rounded-xl"> Kurangi Stok</a>
                <button onClick={(e) => {
                    e.preventDefault()
                    setModalStok(true)
                }}  className="flex justify-center items-center w-full gap-2 h-[45px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl"><img src={iTambahP} alt="" /> Tambah Stok</button>
            </div>
        <DaftarBelanjaModals data={produk} />
        </div>
    </modalStokContext.Provider>
)
}
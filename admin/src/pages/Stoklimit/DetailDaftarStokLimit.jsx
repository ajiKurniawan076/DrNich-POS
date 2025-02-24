import React, { createContext, useContext, useEffect, useState } from 'react'
import { navContext } from '../../App2'
import iPanKu from "../../assets/iconkasir/iPanKu.svg";
import iKranjang from "../../assets/iconkasir/iKranjang.svg";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DaftarBelanjaModals } from '../Produk/DaftarBelanjaModals';


export const modalStokContext2 = createContext()
export const DetailDaftarStokLimit = () => {
    const { setNav, setLink } = useContext(navContext)
    const [produk, setProduk] = useState({})
    const { id } = useParams()
    const [modalStok, setModalStok] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://api.drnich.co.id/api/pos/produk/produk/${id}`)
                setProduk(response.data)
                console.log(response.data)
            } catch {

            }
        }
        fetch()
    },[])

setLink('/pos/DaftarStokLimit')
setNav('Detail')   
document.title = 'Detail'
    return (
        <modalStokContext2.Provider value={{ modalStok, setModalStok }}>
            <div className='flex flex-col px-10 py-8 gap-1 bg-white w-full h-fit min-h-full pt-8 text-[#454545] text-[12px]'>
                {/* <button onClick={() => console.log(produk)}>Debug ProdukList</button> */}
                    <button className='flex justify-between text-center items-center border border-[#EAC564] rounded-xl p-4 mb-2'>
                        <div className='Grid place-items-start gap-1'>
                            <p className='text-[#BDBDBD] text-[10px]'>Supplier</p>
                            <p>{produk?.supplier?.namaPerusahaan}</p>
                        </div>
                        <img src={iPanKu} alt="panah kuning" />
                    </button>
                    <div className='Grid place-items-start border border-[#EAC564] rounded-xl p-4'>
                        <div className='grid place-items-start gap-1'>
                            <p className='text-[#BDBDBD] text-[10px]'>Kategori Produk</p>
                            <p>{produk?.kategori?.kategori}</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Nama Produk</p>
                            <p>{produk?.namaProduk}</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>SKU</p>
                            <p>blm</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Harga Beli</p>
                            <p>Rp {produk?.hargaBeli?.toLocaleString("id-ID")}</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Harga Jual</p>
                            <p>Rp {produk?.hargaJual?.toLocaleString("id-ID")}</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Persentase Keuntungan</p>
                            <p> {produk ? ((produk.hargaJual - produk.hargaBeli) / produk.hargaBeli * 100).toFixed(2) + "%": "Loading..."} </p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Nominal Keuntungan</p>
                            <p> Rp. {produk ? (produk.hargaJual - produk.hargaBeli).toLocaleString("id-ID") : "Loading ..."} </p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Stok</p>
                            <p> {produk.stok} Pcs</p>
                        </div>
                        <div className='grid place-items-start gap-1 mt-4'>
                            <p className='text-[#BDBDBD] text-[10px]'>Stok Minimum</p>
                            <p>{produk?.minStok} Pcs</p>
                        </div>
                </div>
                <div>
                    <button onClick={(e) => {
                    e.preventDefault()
                    setModalStok(true)
                    }}
                        className='flex justify-center items-center text-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white text-[14px] border rounded-xl p-4 w-full'>
                        <img className='mt-2' src={iKranjang} alt="Keranjang" />
                        <p>Beli Produk</p>
                    </button>
                </div>
                <DaftarBelanjaModals data={produk} />
            </div>
        </modalStokContext2.Provider>        
)
}

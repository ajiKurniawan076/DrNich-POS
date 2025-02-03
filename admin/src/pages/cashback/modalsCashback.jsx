import React, { useContext, useEffect, useRef, useState } from 'react'
import { modalContext } from './Cashback3'

import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";

export const ModalsCashback = () => {
    const { modal, setModal, jenis, kategori, produk, produkTerpilih, setProdukTerpilih, kategoriname } = useContext(modalContext)
    const [jenisM, setJenisM] = useState("")
    const [kategoriM, setKategoriM] = useState([])
    const [produkM, setProdukM] = useState([])
    const jenisRef = useRef(null)
    const kategoriRef = useRef(null)
    const handleProduk = (item) => {
        const exist = produkTerpilih.filter(itemx => itemx._id == item._id)
        exist.length == 0 ? setProdukTerpilih((prev) => [...prev, item]) : setProdukTerpilih((prev) => prev.filter(itemx => itemx !== item))
    }
    const gantiKategori = (e) => {
        e.preventDefault()
        const filterproduk = produk.filter(item => item.kategori._id == kategoriRef.current.value)
        console.log(filterproduk)
        setProdukM(filterproduk)
        if(kategoriname=="Kategori Produk"){setProdukTerpilih(filterproduk)}
    }
    const gantiRef = (e) => {
        e.preventDefault()
        setJenisM(jenisRef.current.value)
    }
    useEffect(() => {
        const filterKategori = kategori.filter(item => item.jenis.jenis == jenisM)
        setKategoriM(filterKategori)
        if(kategoriname=="Jenis Produk"){
            const filterproduk = produk.filter(item => item.jenis.jenis == jenisRef.current.value)
        console.log(filterproduk)
        setProdukTerpilih(filterproduk)
        setProdukM(filterproduk)
        }
    }, [jenisM])
    useEffect(()=>{
        produk.length>0 && setProdukM(produk)
    },[produk])
    return (
        <div className={`fixed flex flex-col items-center top-0 start-0 w-full bg-white h-full ${modal == true ? '' : 'hidden'}`}>
            <button className='text-[#454545] font-semibold'
                onClick={(e) => {
                    e.preventDefault()
                    setModal(false)
                }}>X</button>
      <div className="md:w-[700px] lg:w-[900px] w-[500px] border-2 border-[#454545] rounded-xl bg-white h-full overflow-auto px-3">
      <form className='h-full'>
                    <div className='flex justify-between mt-4'>
                        <div className="relative w-full mt-1">
                            <select
                                ref={jenisRef}
                                onChange={gantiRef}
                                name="options"
                                id="kategoriproduk"
                                className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                aria-label="Kategori Produk"
                            >
                                <option value="" selected className="text-gray-300">
                                    Semua Jenis
                                </option>
                                {jenis.map((item, i) => (
                                    <option key={i} value={item.jenis}>{item.jenis}</option>
                                ))}
                            </select>
                            <img
                                src={iPanahB}
                                alt="Dropdown icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                            />
                        </div>
                        {kategoriname == 'Produk' || kategoriname == 'Kategori Produk' ?
                            <div className="relative w-full mt-1">
                                <select
                                    ref={kategoriRef}
                                    onChange={gantiKategori}
                                    name="options"
                                    id="kategoriproduk"
                                    className={`relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                                    aria-label="Kategori Produk"
                                >
                                    <option value="" selected className="text-gray-300">
                                        Semua Kategori
                                    </option>
                                    {kategoriM.map((item, i) => (
                                        <option key={i} value={item._id}>{item.kategori}</option>
                                    ))}
                                </select>
                                <img
                                    src={iPanahB}
                                    alt="Dropdown icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                                />
                            </div>
                            :
                            <></>}

                    </div>
                    {kategoriname=="Produk" && produkM.map((item, i) => (
                        <button key={i}
                            onClick={(e) => {
                                e.preventDefault()
                                handleProduk(item)
                            }}
                            className={`flex justify-between w-full border border-[#BDBDBD] rounded-xl p-4 mt-2 ${produkTerpilih.some((itemx) => itemx._id === item._id) ? 'border-2 border-[#C2A353]' : ''
                                }`}>
                            <p>{item.namaProduk}</p>
                            <p className='text-[#BDBDBD]'>{item.jenis.jenis} | {item.kategori.kategori}</p>
                        </button>
                    ))
                    }
                    <div className='flex items-end h-full'>
                        <button className='flex justify-between text-white text-[14px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] p-4 px-5 rounded-xl w-full'>
                            <p>Tambah</p>
                            <p>| 5 Produk</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

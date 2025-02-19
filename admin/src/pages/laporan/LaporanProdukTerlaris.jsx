import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import i1 from "../../assets/iconLaporanPenjualan/i1.svg";
import i2 from "../../assets/iconLaporanPenjualan/i2.svg";
import i3 from "../../assets/iconLaporanPenjualan/i3.svg";
import i4 from "../../assets/iconLaporanPenjualan/i4.svg";
import axios from 'axios';
import { toast } from 'react-toastify';

export const LaporanProdukTerlaris = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState([])
    const [datax, setDatax] = useState([])
    const [tampil, setTampil] = useState("jumlah")
    const [tampilx, setTampilx] = useState("pendapatan")
    const tampilRef = useRef()
    const tampilRefx = useRef()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.drnich.co.id/api/pos/laporan/laporanterlaris");
                toast.success("Berhasil Masuk", {
                    autoClose: 1000,
                })
                const sortedData = response.data.produklist.sort((a, b) => b.jumlah - a.jumlah);
                const sortedDatax = response.data.kategorilist.sort((a, b) => b.jumlah - a.jumlah);
                const short = sortedData.slice(0, 4);
                const shortx = sortedDatax.slice(0, 4);
                setData(short)
                setDatax(shortx)
            } catch (error) {
                console.error("Error Fetching data:", error)
                toast.error("Terjadi Kesalahan", {
                    autoClose: 2000,
                })
            }
        }
        fetchData()
    }, [])

    const PilihProduk = () => {
        setTampil(tampilRef.current.value)
    }

    const PilihKategori = () => {
        setTampilx(tampilRefx.current.value)
    }
    
    useEffect(() => {
        setLink('/pos/laporan')
        setNav('Produk Terlaris')   
        document.title = 'Produk Terlaris'
    },[])

return (
    <div className='flex flex-col px-10 py-8 gap-1 bg-white w-full h-fit min-h-full pt-8 text-[#454545] text-[12px]'>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full">
            <p className="">Produk Terlaris</p>
        </div>
        <div className="flex h-full w-full gap-3 my-3">
            {/* Select pertama */}
            <div className="relative w-[70%]">
                <select
                    ref={tampilRef}
                    onChange={PilihProduk}
                    className="appearance-none w-full border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 h-[130%]">
                    <option value={"jumlah"}>Banyak Produk terjual</option>
                    <option value={"pendapatan"}>Pendapatan Penjualan</option>
                </select>
                <img 
                src={iPanahB} 
                alt="Ikon panah" 
                className="absolute top-[18px] right-4 transform -translate-y-1/2 pointer-events-none" 
                />
            </div>

            {/* Select kedua */}
            <div className="relative w-[30%]">
                <select
                    
                    className="appearance-none w-full border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 h-[130%]">
                    <option value={"semua"}>Semua</option>
                    <option value={"jasa"}>Jasa</option>
                    <option value={"produk"}>Produk</option>
                </select>
                <img 
                src={iPanahB} 
                alt="Ikon panah" 
                className="absolute top-[18px] right-4 transform -translate-y-1/2 pointer-events-none" 
                />
            </div>
        </div>
        {data.map((item, i) => (
            <div key={i} className='grid'>
                <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                    <div className='flex items-center text-center gap-3'>
                        <p>{item.namaProduk}</p>
                    </div>
                    <div className='text-[#C2A353]'>
                        <p>{tampil === "jumlah" ? item.jumlah + "Terjual" : "Rp. " + item.pendapatan.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>
        ))}
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
            <p className="">Kategori Teratas</p>
        </div>
        <div className="flex h-full w-full gap-3 my-3">
            {/* Select pertama */}
            <div className="relative w-[70%]">
                <select
                    ref={tampilRefx}
                    onChange={PilihKategori}
                    className="appearance-none w-full border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 h-[130%]">
                    <option value={"pendapatan"}>Pendapatan Penjualan</option>
                    <option value={"jumlah"}>Banyak Produk terjual</option>
                </select>
                <img 
                src={iPanahB} 
                alt="Ikon panah" 
                className="absolute top-[18px] right-4 transform -translate-y-1/2 pointer-events-none" 
                />
            </div>

            {/* Select kedua */}
            <div className="relative w-[30%]">
                <select className="appearance-none w-full border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 h-[130%]">
                    <option value={"semua"}>Semua</option>
                    <option value={"jasa"}>jasa</option>
                    <option value={"produk"}>Produk</option>
                </select>
                <img 
                src={iPanahB} 
                alt="Ikon panah" 
                className="absolute top-[18px] right-4 transform -translate-y-1/2 pointer-events-none" 
                />
            </div>
        </div>
        {datax.map((itemx, i) => (
            <div key={i} className='grid'>
                <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                    <div className='flex items-center text-center gap-3'>
                        {/* <img src={i1} alt="" /> */}
                        <p>{ itemx.kategori }</p>
                    </div>
                    <div className='text-[#C2A353]'>
                        <p> {tampilx === "pendapatan" ? "Rp. " + itemx.pendapatan.toLocaleString("id-ID") : itemx.jumlah + "Terjual"}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
}

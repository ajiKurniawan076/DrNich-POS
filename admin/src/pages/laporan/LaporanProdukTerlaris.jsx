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
  const [tampilProduk, setTampilProduk] = useState([])
  const [tampilKategori, setTampilKategori] = useState([])
  const [tampil, setTampil] = useState("jumlah")
  const [tampilx, setTampilx] = useState("pendapatan")
  const tampilRef = useRef()
  const tampilRefx = useRef()
  const jenisRef = useRef()
  const jenisRefx = useRef()

  // Array gambar yang akan digunakan secara dinamis
    const productImages = [i1, i2, i3, i4]
    const kategoriImages = [i1, i2, i3, i4]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.drnich.co.id/api/pos/laporan/laporanterlaris");
        toast.success("Berhasil Masuk", {
          autoClose: 1000,
        })
        const sortedData = response.data.produklist.sort((a, b) => b.jumlah - a.jumlah);
        const sortedDatax = response.data.kategorilist.sort((a, b) => b.pendapatan - a.pendapatan);
        const short = sortedData.slice(0, 4);
        const shortx = sortedDatax.slice(0, 4);
        setData(response.data.produklist)
        setTampilProduk(short)
        setDatax(response.data.kategorilist)
        setTampilKategori(shortx)
        console.log(response.data.produklist)
        console.log(response.data.kategorilist)
      } catch (error) {
        console.error("Error Fetching data:", error)
        toast.error("Terjadi Kesalahan", {
          autoClose: 2000,
        })
      }
    }
    fetchData()
  }, [])

  const pilihJenisProduk = () =>{
    if(jenisRef.current.value == 'semua'){
      setTampilProduk(data)
    }
    else if(jenisRef.current.value == 'jasa'){
      const filter = data.filter((a) => a.jenis == 'jasa')
      setTampilProduk(filter)
    }
    else if(jenisRef.current.value == 'produk'){
      const filter = data.filter((a) => a.jenis == 'produk')
      setTampilProduk(filter)
    }
  }

  const PilihProduk = () => {
    setTampil(tampilRef.current.value)
    if(tampilRef.current.value == 'pendapatan'){
      const filter = data.sort((a,b) => b.pendapatan - a.pendapatan)
      setTampilProduk(filter)
    }
    else if(tampilRef.current.value == 'jumlah'){
      const filter = data.sort((a,b) => b.jumlah - a.jumlah)
      setTampilProduk(filter)
    }
  }

  const pilihJenisKategori =()=>{
      if(jenisRefx.current.value == 'semua'){
        setTampilKategori(datax)
      }
      else if(jenisRefx.current.value == 'jasa'){
        const filter = datax.filter((a) => a.jenis == 'jasa')
        setTampilKategori(filter)
      }
      else if(jenisRefx.current.value == 'produk'){
        const filter = datax.filter((a) => a.jenis == 'produk')
        setTampilKategori(filter)
      }
    
  }

  const PilihKategori = () => {
    setTampilx(tampilRefx.current.value)
    if(tampilRefx.current.value == 'pendapatan'){
      const filter = datax.sort((a,b) => b.pendapatan - a.pendapatan)
      setTampilKategori(filter)
    }
    else if(tampilRefx.current.value == 'jumlah'){
      const filter = datax.sort((a,b) => b.jumlah - a.jumlah)
      setTampilKategori(filter)
    }
  }
    
  useEffect(() => {
    setLink('/pos/laporan')
    setNav('Produk Terlaris')   
    document.title = 'Produk Terlaris'
  },[])

  return (
    <div className='flex flex-col px-10 py-8 gap-1 bg-white w-full h-fit min-h-full pt-8 text-[#454545] text-[12px]'>
      <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full">
        <p>Produk Terlaris</p>
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
          onChange={pilihJenisProduk}
          ref={jenisRef}
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
      
      {/* Render produk terlaris */}
      {tampilProduk.map((item, i) => (
        <div key={i} className='grid'>
          <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
            <div className='flex items-center text-center gap-3'>
              {/* Tampilkan gambar berdasarkan indeks data, misal urutan ke-i */}
              <img src={productImages[i]} alt={item.namaProduk} className="w-6 h-6" />
              <p>{item.namaProduk}</p>
            </div>
            <div className='text-[#C2A353]'>
              <p>{tampil === "jumlah" ? item.jumlah + " Terjual" : "Rp. " + item.pendapatan.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
        <p>Kategori Teratas</p>
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
          <select 
          onChange={pilihJenisKategori}
          ref={jenisRefx}
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

      {/* Render kategori teratas */}
      {tampilKategori.map((itemx, i) => (
        <div key={i} className='grid'>
          <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
            <div className='flex items-center text-center gap-3'>
              {/* Tampilkan gambar berdasarkan indeks data, misal urutan ke-i */}
              <img src={kategoriImages[i]} alt={itemx.kategori} className="w-6 h-6" />
              <p>{itemx.kategori}</p>
            </div>
            <div className='text-[#C2A353]'>
              <p>{tampilx === "pendapatan" ? "Rp. " + itemx.pendapatan.toLocaleString("id-ID") : itemx.jumlah + " Terjual"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

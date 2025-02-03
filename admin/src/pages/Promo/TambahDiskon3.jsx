import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iPanahB from '../../assets/iconmanajement/iPanahB.svg'
import iFrameI from '../../assets/iconmanajement/iFrameI.svg'
import iPanahS from '../../assets/iconmanajement/iPanahS.svg'
import iTgl from '../../assets/iconproduk/iTgl.svg'
import { ModalsDiskon } from './modalsDiskon'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'


export const modalsContext = createContext()
export const TambahDiskon3 = () => {
    const { setNav } = useContext(navContext)
    const [produkTerpilih, setProdukTerpilih] = useState([])
    const [modals, setModals] = useState(false)
    const [jenis, setJenis] = useState([])
    const [produk, setProduk] = useState([])
    const [kategori, setKategori] = useState([])
    const [tombol, setTombol] = useState(false)
    const [button, setButton] = useState(true)
    const [button2, setButton2] = useState(true)
    const [kategoriName, setKategoriName] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [jenisPotongan, setJenisPotongan] = useState('rupiah')
    const listkategori = [
        {
            id: 1,
            nama: "Diskon Untuk Produk Tertentu",
            setnama : 'Produk'
        },
        {
            id: 2,
            nama: "Diskon Total Transaksi",
            setnama : ''
        },
        {
            id: 3,
            nama: "Diskon Berdasarkan Kategori Produk",
            setnama : 'Kategori Produk'
        },
        {
            id: 4,
            nama: "Diskon Berdasarkan Jenis Produk",
            setnama : 'Jenis Produk'
        },
        {
            id: 5,
            nama: "Diskon Kuantitas",
            setnama : ''
        }
    ]
    const keteranganRef = useRef(null);
    const namaPromoRef = useRef(null);
    const potonganRef = useRef(null);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            namaPromo : namaPromoRef.current.value,
            potongan: potonganRef.current.value,
            keterangan : keteranganRef.current.value,
            berlakuDari : startDate.toISOString().split('T')[0],
            berlakuSampai : endDate.toISOString().split('T')[0],
            promoDetail  :   produkTerpilih,
            jenisPotongan : jenisPotongan,
            jenis   : "Diskon"
        }
        console.log(data)
        await axios.post('https://api.drnich.co.id/api/pos/promo/promo',data).then(
            response => response.status == 200 ? console.log(response) : console.log('eror')
        )
        navigate("../TambahDiskon3")
    }


    const datePickerRef = useRef(null); // Create a ref for the DatePicker
    
    const handleButtonClick = (e) => {
        e.preventDefault()
        if (datePickerRef.current) {
            datePickerRef.current.setFocus(); // Programmatically focus and open DatePicker
            setButton(false)
            }
    };
    
    const datePickerRef2 = useRef(null); // Create a ref for the DatePicker
    
    const handleButtonClick2 = (e) => {
        e.preventDefault()
        if (datePickerRef2.current) {
            datePickerRef2.current.setFocus(); // Programmatically focus and open DatePicker
            setButton2(false)
            }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api.drnich.co.id/api/pos/produk/jenisproduk').then(response => setJenis(response.data))
            await axios.get('https://api.drnich.co.id/api/pos/produk/kategoriproduk').then(response => setKategori(response.data))
            await axios.get('https://api.drnich.co.id/api/pos/produk/produk').then(response => setProduk(response.data))
        }
        fetchData()
    }, [])
    useEffect(() => {
        !tombol ? setJenisPotongan('rupiah') : setJenisPotongan('persen')
    }, [tombol])
    
    const gantiKategori = () => {
        const selected = listkategori.find(item => item.id == keteranganRef.current.value)
        setKategoriName(selected.setnama)
}

setNav('Tambah Diskon')   
document.title = 'Tambah Diskon'
return (
    <modalsContext.Provider value={{modals, setModals, jenis, kategori, produk, produkTerpilih, setProdukTerpilih, kategoriName}}>
    <form onSubmit={handleSubmit} className="flex flex-col py-8 gap-1 bg-white w-full h-fit min-h-screen pt-8 text-[#454545] text-[12px] px-9">
        <div className='grid place-items-start'>
            <p>Kategori Diskon</p>
            <div className="relative w-full mt-1">
                <select
                        ref={keteranganRef}
                        onChange={gantiKategori}
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" disabled selected className="text-gray-300">
                        Pilih Kategori diskon
                    </option>
                    {listkategori.map((item, i) => (
                        <option key={i} value={item.id}>{item.nama}</option>
                    ))}
                </select>
                <img
                    src={iPanahB}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
            </div>
        </div>
        <div className='grid place-items-start w-full mt-4'>
            <p>Nama Diskon</p>
            <input ref={namaPromoRef} type='text' placeholder='Nama Promo Diskon' className='flex justify-start border border-[#BDBDBD] rounded-xl p-4 w-full mt-1'>
            </input>
        </div>
        <div className='grid place-items-start w-full mt-4'>
            <p>Jumlah diskon</p>
            <div className='flex justify-start border border-[#BDBDBD] rounded-xl p-4 w-full mt-1'>
                <input ref={potonganRef} placeholder='20.000/20' className='outline-none flex justify-between w-full text-start items-center'>
                </input>
                <div className='flex w-[30%]'>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setTombol(!tombol)
                    }}    
                        className={`${tombol == false ? 'bg-[#C2A353] text-white' : "bg-slate-200 text-black"}  rounded-l-md w-[50%]`}>Rp</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setTombol(!tombol)
                    }} 
                        className={`${tombol == true ? 'bg-[#C2A353] text-white' : "bg-slate-200 text-black"} rounded-r-md w-[50%]`}>%</button>
                </div>
            </div>
        </div>
        <div className='grid place-items-start mt-4'>
                <p>Khusus {kategoriName}</p>
                <button onClick={(e) => {
                    e.preventDefault()
                    setModals(true)}
                } className='flex justify-start text-cemter w-full border border-[#BDBDBD] rounded-xl px-4 py-4 mt-1'>
                Tambah {kategoriName}
            </button>
        </div>
        
        
        <div className='Grid place-items-start mt-4'>
            <p>Masa Berlaku</p>
            <div className='flex flex-col gap-2 justify-between w-full mt-1'>
                <p>Dari :</p>
                    <div className="w-full relative flex justify-center items-center border border-gray-300 rounded-xl p-3">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            ref={datePickerRef} // Attach the ref
                            className="w-full outline-0 text-center" // Completely hide the DatePicker input
                            popperClassName="custom-datepicker-popper"
                        />
                        {/* Button to trigger DatePicker */}
                        <div className={`absolute h-full px-4 top-2 start-0 w-full ${button?'':'opacity-0'}`}>
                            <button
                            onClick={handleButtonClick}
                            className="flex text-[#BDBDBD] w-full items-center justify-between space-x-2"
                            >
                            Tanggal
                            <img src={iTgl} alt="Calendar Icon" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
            
            
                <p>Sampai :</p>
                <div className="w-full relative flex justify-center items-center border border-gray-300 rounded-xl p-3">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        ref={datePickerRef2} // Attach the ref
                        className="w-full outline-0 text-center" // Completely hide the DatePicker input
                        popperClassName="custom-datepicker-popper"
                    />
                    {/* Button to trigger DatePicker */}
                        <div className={`absolute h-full px-4 top-2 start-0 w-full ${button2?'':'opacity-0'}`}>
                            <button
                                onClick={handleButtonClick2}
                                className="flex text-[#BDBDBD] w-full items-center justify-between space-x-2"
                                >
                                Tanggal
                                <img src={iTgl} alt="Calendar Icon" className="w-6 h-6" />
                            </button>
                        </div>
                </div>
            </div>
        </div>


        <div className='Grid place-items-start mt-4'>
            <p>Produk Terpilih</p>
                {produkTerpilih.map((item, i) => (
                <div className='flex justify-between w-full border border-[#BDBDBD] rounded-xl p-4 mt-1'>
                    <p>{item.namaProduk}</p>
                    <button onClick={
                        (e) => {
                        e.preventDefault()
                        setProdukTerpilih((prev) => prev.filter(itemx => itemx !== item))
                        }}
                        className='text-red-500 font-bold'>X</button>
                </div>
            ))}
            
        </div>
        <div className='flex items-end mt-10 h-full'>
            <button type='submit' className='flex justify-center text-[14px] text-white bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4 '>
                Simpan
            </button>
        </div>
    </form>
    <ModalsDiskon/>
    </modalsContext.Provider>
)
}

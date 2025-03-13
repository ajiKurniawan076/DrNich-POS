import React, { createContext, useContext, useEffect, useRef } from 'react'
import { navContext } from "../../App2"
import iPanahB from '../../assets/iconmanajement/iPanahB.svg'
import iFrameI from '../../assets/iconmanajement/iFrameI.svg'
import iPanahS from '../../assets/iconmanajement/iPanahS.svg'
import iTgl from '../../assets/iconproduk/iTgl.svg'
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import { ModalsCashback } from './modalsCashback'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


export const modalContext = createContext()
export const Cashback3 = () => {
    const { setNav, setLink } = useContext(navContext)
    const [produkTerpilih, setProdukTerpilih] = useState([])
    const [jenis, setJenis] = useState([])
    const [produk, setProduk] = useState([])
    const [modal, setModal] = useState(false)
    const [button, setButton] = useState(true)
    const [button2, setButton2] = useState(true)
    const [kategori, setKategori] = useState([])
    const reqref = useRef(null)
    const [kategoriname, setKategoriName] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const listkategori = [
        {
            id: 1,
            nama: "Cashback Untuk Produk Tertentu",
            setnama: 'Produk'
        },
        {
            id: 2,
            nama: "Cashback Total Transaksi",
            setnama: ''
        },
        {
            id: 3,
            nama: "Cashback Berdasarkan Kategori Produk",
            setnama: 'Kategori Produk'
        },
        {
            id: 4,
            nama: "Cashback Berdasarkan Jenis Produk",
            setnama: 'Jenis Produk'
        },
        {
            id: 5,
            nama: "Cashback Kuantitas",
            setnama: ''
        },
    ]
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
        setNav('Tambah Cashback')
        setLink('/pos/cashback')
    }, [])
    const namaPromoRef = useRef(null)
    const cashbackRef = useRef(null)
    const keteranganRef = useRef(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            namaPromo: namaPromoRef.current.value,
            cashback: cashbackRef.current.value,
            keterangan: keteranganRef.current.value,
            berlakuDari: startDate.toISOString().split('T')[0],
            berlakuSampai: endDate.toISOString().split('T')[0],
            promoDetail: produkTerpilih,
            jenis: "Cashback",
            reqr : reqref.current.value
        }
        console.log(data)
        // await axios.post('https://api.drnich.co.id/api/pos/promo/promo', data).then(
        //     response => response.status == 200 ? navigate('../cashback') : console.log('error') 
        // )
        // navigate("../cashback")
        try {
            const response = await axios.post('https://api.drnich.co.id/api/pos/promo/promo', data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                toast.success("Cashback berhasil ditambahkan!");
                setTimeout(() => {
                    toast.success("Redirecting...");
                    window.location.href = "/pos/Cashback";
                }, 1500);
            } else {
                toast.error("Gagal menambahkan Cashback");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan saat menambahkan Cashback");
        }
    }
    const gantiKategori = () => {
        const selected = listkategori.find(item => item.nama == keteranganRef.current.value)
        setKategoriName(selected.setnama)
    }
    document.title = 'Tambah Cashback'
    return (
        <modalContext.Provider value={{ modal, setModal, jenis, kategori, produk, produkTerpilih, setProdukTerpilih, kategoriname }}>
            <form onSubmit={handleSubmit} className="flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-full px-7">
                <div className='flex flex-col h-full overflow-y-auto'>
                    <div className='flex flex-col px-3'>
                        <p>Kategori Cashback</p>
                        <div className="relative w-full mt-[5px]">
                            <select
                                name="options"
                                onChange={gantiKategori}
                                ref={keteranganRef}
                                id="kategoriproduk"
                                className="relative bg-white border text-sm border-gray-300 rounded-xl w-full h-[45px] py-[12px] p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none mb-[20px]"
                                aria-label="Kategori Produk"
                            >
                                <option value="" disabled selected className="text-gray-300">
                                    Pilih Kategori Cashback
                                </option>
                                {listkategori.map((item, i) => (
                                    <option key={i} value={item.nama}>{item.nama}</option>
                                ))}

                            </select>
                            <img
                                src={iPanahB}
                                alt="Dropdown icon"
                                className="absolute right-4 top-[35%] -translate-y-1/2 pointer-events-none w-4 h-4"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col px-3'>
                        <p>Nama Promo Cashback</p>
                        <input ref={namaPromoRef} type='text' placeholder='Nama Promo Cashback' className='border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                        </input>
                    </div>
                    <div className='flex flex-col px-3 h-full'>
                        <p>Syarat Limit ( Untuk kategori kuantitas atau total transaksi )</p>
                        <input ref={reqref} type='number' placeholder='Nama Promo Diskon' className='border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                        </input>
                    </div>
                    <div className='flex flex-col px-3'>
                        <p>Jumlah Cashback</p>
                        <div className='flex relative justify-start border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                            <input type='number' ref={cashbackRef} placeholder='100' className='outline-none flex justify-between w-full text-start items-center'>
                            </input>
                            <p className='absolute end-[20px] text-[#BDBDBD]'>Poin</p>
                        </div>
                    </div>
                    <div className='flex flex-col px-3 h-full'>
                        <label htmlFor="">Khusus {kategoriname}</label>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setModal(true)
                        }} className=' flex justify-start text-cemter border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                            Tambah {kategoriname}
                        </button>
                    </div>

                    <div className='flex flex-col px-3 h-full'>
                        <p>Masa Berlaku</p>
                        <div className='flex flex-col gap-2 justify-between w-full mt-[5px]'>
                            <p>Dari :</p>
                            <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    ref={datePickerRef} // Attach the ref
                                    className="w-full outline-0 text-center" // Completely hide the DatePicker input
                                    popperClassName="custom-datepicker-popper"
                                />
                                {/* Button to trigger DatePicker */}
                                <div className={`absolute h-full px-4 top-2 start-0 w-full ${button ? '' : 'opacity-0'}`}>
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
                            <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    ref={datePickerRef2} // Attach the ref
                                    className="w-full outline-0 text-center" // Completely hide the DatePicker input
                                    popperClassName="custom-datepicker-popper"
                                />
                                {/* Button to trigger DatePicker */}
                                <div className={`absolute h-full px-4 top-2 start-0 w-full ${button2 ? '' : 'opacity-0'}`}>
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

                    <div className='flex flex-col px-3 h-full'>
                        <p>Produk Terpilih</p>
                        {produkTerpilih.map((item, i) => (
                            <div className='flex justify-between w-full border border-[#BDBDBD] rounded-xl p-4 mt-1 mb-3'>
                                <p>{item.namaProduk}</p>
                                <button onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setProdukTerpilih((prev) => prev.filter(itemx => itemx !== item))
                                    }
                                } className='text-red-600 font-bold'>X</button>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='flex items-end mt-auto'>
                    <button type='submit' className=' flex justify-center text-[14px] text-white bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4 '>
                        Simpan
                    </button>
                </div>
                <ToastContainer />
            </form>
            <ModalsCashback />
        </modalContext.Provider>
    )
}

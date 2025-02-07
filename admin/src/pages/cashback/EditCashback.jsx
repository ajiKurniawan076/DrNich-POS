import React, { createContext, useContext, useEffect, useRef } from 'react'
import { navContext } from "../../App2"
import iPanahB from '../../assets/iconmanajement/iPanahB.svg'
import iFrameI from '../../assets/iconmanajement/iFrameI.svg'
import iPanahS from '../../assets/iconmanajement/iPanahS.svg'
import iTgl from '../../assets/iconproduk/iTgl.svg'
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { useNavigate, useParams } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { ModalEditCashback } from './ModalEditCashback'


export const modalsContext = createContext()
export const EditCashback = () => {
    const { setNav, setLink } = useContext(navContext)
    const [produkTerpilih, setProdukTerpilih] = useState([])
    const [jenis, setJenis] = useState([])
    const [produk, setProduk] = useState([])
    const [modal, setModal] = useState(false)
    const [button, setButton] = useState(true)
    const [button2, setButton2] = useState(true)
    const [kategori, setKategori] = useState([])
    const [kategoriname, setKategoriName] = useState('')
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { id } = useParams();
    const [data, setData] = useState([])
    const [tombol, setTombol] = useState()
    const [jenisPotongan, setJenisPotongan] = useState('rupiah')    

    const listkategori = [
        {
            id: 1,
            nama: "Cashback Untuk Produk Tertentu",
            setnama : 'Produk'
        },
        {
            id: 2,
            nama: "Cashback Total Transaksi",
            setnama : ''
        },
        {
            id: 3,
            nama: "Cashback Berdasarkan Kategori Produk",
            setnama : 'Kategori Produk'
        },
        {
            id: 4,
            nama: "Cashback Berdasarkan Jenis Produk",
            setnama : 'Jenis Produk'
        },
        {
            id: 5,
            nama: "Cashback Kuantitas",
            setnama : ''
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
            await axios.get(`https://api.drnich.co.id/api/pos/promo/promo/${id}`).then(response => setData(response.data))
        }
        fetchData()
        setNav('Edit Cashback')
        setLink('/pos/cashback')
    }, [])
    const namaPromoRef = useRef(null)
    const cashbackRef = useRef(null)
    const keteranganRef = useRef(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            namaPromo : namaPromoRef.current.value,
            cashback : cashbackRef.current.value,
            keterangan : keteranganRef.current.value,
            berlakuDari : startDate.toISOString().split('T')[0],
            berlakuSampai : endDate.toISOString().split('T')[0],
            promoDetail  :   produkTerpilih,
            jenis   : "Cashback"
        } 
        console.log(data)
        // await axios.post('https://api.drnich.co.id/api/pos/promo/promo', data).then(
        //     response => response.status == 200 ? navigate('../cashback') : console.log('error') 
        // )
        // navigate("../cashback")
        try {
        const response = await axios.post('https://api.drnich.co.id/api/pos/promo/promo', data);
    
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
    useEffect(() => {
        if (data?.promoDetail?.length > 0) {
            const uniqueProduk = new Set(data.promoDetail.map(item => item.produk));
            setProdukTerpilih([...uniqueProduk]); // Konversi ke array
            }
            setStartDate(new Date(data?.berlakuDari));
            setEndDate(new Date(data?.berlakuSampai));
            data.jenisPotongan == 'persen' ? setTombol(true) : setTombol(false)
        console.log(data);
        const cari = listkategori.find(item => item.nama === data?.keterangan);
        setKategoriName(cari?.setnama);
    }, [data]);
    
    useEffect(() => {
        !tombol ? setJenisPotongan('rupiah') : setJenisPotongan('persen')
    }, [tombol])
    
    const gantiKategori = () => {
        const selected =  listkategori.find(item => item.nama == keteranganRef.current.value)
        setKategoriName(selected.setnama)
    }
    document.title = 'Edit Cashback'
    return (
        <modalsContext.Provider value={{ modal, setModal, jenis, kategori, produk, produkTerpilih, setProdukTerpilih, kategoriname }}>
            <form onSubmit={handleSubmit} className="flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] min-h-full h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
                <div className='flex flex-col px-3 h-full'>
                    <p>Kategori Cashback</p>
                    <div className="relative w-full mt-[5px]">
                        <input
                            name="options"
                            onChange={gantiKategori}
                            ref={keteranganRef}
                            defaultValue={data?.keterangan}
                            disabled
                            id="kategoriproduk"
                            className="relative bg-white border text-sm border-gray-300 rounded-xl w-full h-[45px] py-[12px] p-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none mb-[20px]"
                            aria-label="Kategori Produk"
                        >
                        </input>
                    </div>
                </div>
                <div className='flex flex-col px-3 h-full'>
                    <p>Nama Promo Cashback</p>
                    <input
                        ref={namaPromoRef}
                        defaultValue={data.namaPromo}
                        type='text'
                        placeholder='Nama Promo Cashback'
                        className='border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                    </input>
                </div>
                <div className='flex flex-col px-3 h-full'>
                    <p>Jumlah Cashback</p>
                    <div className='flex relative justify-start border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                        <input
                            type='number'
                            ref={cashbackRef}
                            defaultValue={data?.cashback}
                            placeholder='100'
                            className='outline-none flex justify-between w-full text-start items-center'>
                        </input>
                        <p className='absolute end-[20px] text-[#BDBDBD]'>Poin</p>
                    </div>
                </div>
                <div className='flex flex-col px-3 h-full'>
                    <label htmlFor="">Khusus {kategoriname}</label>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setModal(true)}} className=' flex justify-start text-cemter border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]'>
                        Tambah {kategoriname}
                    </button>
                </div>

                <div className='flex flex-col px-3 h-full'>
                    <p>Masa Berlaku</p>
                    <div className='flex flex-col gap-2 justify-between w-full mt-[5px]'>
                        <p>Dari :</p>
                        <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px] mt-[5px]">
                            <DatePicker
                                selected={startDate instanceof Date && !isNaN(startDate) ? startDate : null}
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
                                selected={endDate instanceof Date && !isNaN(endDate) ? endDate : null}
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
                <div className='flex items-end h-full mt-[20px] mx-3'>
                    <button type='submit' className=' flex justify-center text-[14px] text-white bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4 '>
                        Simpan
                    </button>
                </div>
            <ToastContainer/>
            </form>
            <ModalEditCashback/>
        </modalsContext.Provider>
    )
}

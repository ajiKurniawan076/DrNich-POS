import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconproduk/iPan.svg";
import iTgL from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iPanahIjo from "../../assets/iconmanajement/iPanahIjo.svg";
import iPanahMerah from "../../assets/iconmanajement/iPanahMerah.svg";
import iPanahKuning from "../../assets/iconmanajement/iPanahKuning.svg";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import iTgl from "../../assets/iconproduk/iTgl.svg";


export const LaporanLogProduk = () => {
    const { setNav, setLink, setSort } = useContext(navContext)
    const [data, setData] = useState([])
    const [supllier, setSupllier] = useState([])
    const { id } = useParams()
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');

    useEffect(() => {
        const fetchData = async () => {
            const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z', sampai: endDate, id : id }
            const response = await axios.post(`https://api.drnich.co.id/api/pos/laporan/laporanlogproduk/`, tanggal)
            try {
                setData(response.data.logProduk)
                setSupllier(response.data.supplier)
                console.log(response.data)
            } catch {
                
            }
        }
        fetchData()
    }, [startDate, endDate])
    
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
        setNav('Log Produk')
        setLink(-1)
        // setSort(true)
        document.title = 'Log Produk'
    }, [])
    

return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-fit min-h-screen pt-8 text-[12px] text-[#454545]'>
        <div className='flex justify-between p-4 border rounded-xl border-[#C2A353]'>
            <div className='grid text-start'>
                <p className='text-[12px]'>{supllier}</p>
            </div>
            {/* <img src={iPan} alt="Panah" /> */}
        </div>
        {/* <div className='flex justify-between text-[12px] mt-3'>
            <div className='flex gap-3 border rounded-xl border-[#BDBDBD] p-4 w-auto'>
                <img src={iTgL} alt="iTgL" />
                <p>1 Nov 2024 - 30 Nov 2024</p>
            </div>
        </div> */}
        <div className='flex flex-col h-full'>
                            <p>Masa Berlaku</p>
                            <div className='flex flex-col gap-2 justify-between w-full mt-[5px]'>
                                <p>Dari :</p>
                                <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[5px] mt-[5px]">
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
                                <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[10px] mt-[5px]">
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
        {data.map((item, i) => (
            <>
                <div key={i} className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-2 w-auto'>
                    <div className='flex items-center gap-3'>
                        <div>
                            {/* Conditional Rendering untuk Gambar */}
                            {item.jenis === "transaksi" && <img src={iPanahIjo} alt="Panah Ijo" />}
                            {item.jenis === "belanja" && <img src={iPanahMerah} alt="Panah Merah" />}
                            {item.jenis === "minStok" && <img src={iPanahKuning} alt="Panah Kuning" />}
                        </div>
                        <div className='grid text-start'>
                            <p>
                                {/* {item.jenis} */}
                                {item.jenis === "minStok"
                                ? "Pengurangan Barang"
                                : item.jenis === "transaksi"
                                ? "Barang Keluar"
                                : item.jenis === "belanja"
                                ? "Barang Masuk"
                                : item.jenis
                                }
                            </p>
                        </div>
                    </div>
                    <div className='text-[#BDBDBD]'>
                        <p>{item?.waktu?.toLocaleString("id-ID").split('T')[0]}</p>
                    </div>
                </div>
            </>
        ))}
    </div>
)
}
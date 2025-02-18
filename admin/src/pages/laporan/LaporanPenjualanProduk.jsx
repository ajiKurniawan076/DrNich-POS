import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iFrameGra from "../../assets/iconLaporanPenjualan/iFrameGra.svg";
import iFrameKet2 from "../../assets/iconLaporanPenjualan/iFrameKet2.svg";
import DatePicker from 'react-datepicker'
import axios from 'axios';


export const LaporanPenjualanProduk = () => {
    const { setNav, setLink } = useContext(navContext)
    const cari = useRef(null)
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');
    const [data, setData] = useState();
        
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
        const tanggal = { dari : "2025-01-01T00:00:00Z", sampai : new Date().toISOString().split('.')[0] + 'Z'}
        const fetchData = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualanproduk", tanggal)
                .then((response) => (setData(response.data),console.log(response.data)))
        }
        fetchData();
        console.log(tanggal)
    }, [])
    
    useEffect(() => {
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z' , sampai: endDate}
        console.log(tanggal)
        const fetch = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualanproduk", tanggal)
                .then((response) => (setData(response.data)))
        }
        fetch()
    }, [startDate, endDate])

setLink('/pos/laporan')
setNav('Laporan Produk')   
document.title = 'Laporan Produk'
return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
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
        <div className="flex flex-col my-[10px]">
            <select
                // ref={}
                name="options"
                className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[13px] px-[20px]"
                id="Gender"
                // onChange={}
            >
                <option value="" className="text-gray-300" selected disabled>
                    Minggu ini
                </option>
                <option value="wanita">Hari ini</option>
                <option value="pria">Kemarin</option>
                <option value="pria">Bulan Ini</option>
                <option value="pria">Minggu Lalu</option>
                <option value="pria">Bulan Lalu</option>
                <option value="pria">Tahun Ini</option>
                <option value="pria">Tahun Lalu</option>
            </select>
        </div>
        {/* <button onClick={()=>console.log(data)}>
            sad
        </button> */}
        <div>
            <div className='flex justify-between gap-[5px] text-start items-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] my-[10px]'>
                <div className='flex gap-2 w-full '>
                    <p>Total Produk Terjual</p>
                    <img src={iSeruTrans} alt="seru" />
                </div>
                <p className='text-[14px] font-semibold'>{data?.totalProduk}</p>
            </div>
            <div className='flex justify-between gap-[5px] text-start items-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] my-[10px]'>
                <div className='grid text-start gap-[6px]'>
                    <div className='flex gap-2 w-full'>
                        <p>Total Produk Keseluruhan</p>
                        <img src={iSeruTrans} alt="seru" />
                    </div>
                        <p className='text-[14px] font-semibold'>blm</p>
                </div>
                <img src={iPan}  alt="" />
            </div>
            <div className='flex justify-between gap-[5px] text-start items-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] my-[10px]'>
                <div className='grid text-start gap-[6px]'>
                    <div className='flex gap-2 w-full'>
                        <p>Total Kategori Keseluruhan</p>
                        <img src={iSeruTrans} alt="seru" />
                    </div>
                        <p className='text-[14px] font-semibold'>blm</p>
                </div>
                <img src={iPan}  alt="" />
            </div>

            <div className='grid place-items-center'>
                <img src={iFrameGra} alt="Grafik" />
                <img src={iFrameKet2} alt="Ket Grafik" />
            </div>

            <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                <p className="">Data Penjualan Produk</p>
            </div>

            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px] mt-[10px]'>
                <div className='grid text-start gap-[5px]'>
                    <p>Facial Glow Acne</p>
                    <p className='text-[14px] font-semibold'>Rp 7.200.000</p>
                </div>
                <p>296 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px] mt-[10px]'>
                <div className='grid text-start'>
                    <p>Facial Gold</p>
                    <p className='text-[14px] font-semibold'>Rp 5.437.000</p>
                </div>
                <p>194 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px] mt-[10px]'>
                <div className='grid text-start'>
                    <p>Sunscreen SPF 30+ 100ml</p>
                    <p className='text-[14px] font-semibold'>Rp 1.200.000</p>
                </div>
                <p>13 Transaksi</p>
            </div>
            <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px] mt-[10px]'>
                <div className='grid text-start'>
                    <p>Serum Niacnamide</p>
                    <p className='text-[14px] font-semibold'>Rp 1.200.000</p>
                </div>
                <p>10 Transaksi</p>
            </div>
        </div>
    </div>
)
}

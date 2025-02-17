import React, { useContext, useEffect, useRef, useState } from 'react';
import { navContext } from "../../App2";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTgl from "../../assets/iconproduk/iTgl.svg";
import DatePicker from 'react-datepicker';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const LaporanDataPembelianStok = () => {
    const { setNav, setLink } = useContext(navContext);
    const [button, setButton] = useState(false);
    const [button2, setButton2] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { tanggal } = location.state || {};

    const [startDate, setStartDate] = useState(new Date(tanggal?.dari || Date.now()));
    const [endDate, setEndDate] = useState(new Date(tanggal?.sampai || Date.now()));

    // Navigasi ke halaman detail
    const handleNavigate = (e, datax) => {
        e.preventDefault();
        navigate('/pos/LaporanDataPembelianStokDetail', { state: { belanja: datax } });
    };

    // Refs untuk DatePicker
    const datePickerRef = useRef(null);
    const datePickerRef2 = useRef(null);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (datePickerRef.current) {
            datePickerRef.current.setFocus();
            setButton(false);
        }
    };

    const handleButtonClick2 = (e) => {
        e.preventDefault();
        if (datePickerRef2.current) {
            datePickerRef2.current.setFocus();
            setButton2(false);
        }
    };

    useEffect(() => {
        setLink('/pos/LaporanRingkasanPenjualan');
        setNav('Data Pembelian Stok');
        document.title = 'Data Pembelian Stok';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://api.drnich.co.id/api/pos/laporan/laporanbelanja", tanggal);
                setData(response.data.belanja);
                console.log(response.data.belanja);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (tanggal) {
            fetchData();
        }
    }, [tanggal]);

    useEffect(() => {
        const tanggalBaru = { 
            dari: startDate?.toISOString().split('.')[0] + 'Z', 
            sampai: endDate?.toISOString().split('.')[0] + 'Z' 
        };

        const fetch = async () => {
            try {
                const response = await axios.post("https://api.drnich.co.id/api/pos/laporan/laporanbelanja", tanggalBaru);
                setData(response.data.belanja);
                console.log(response.data.belanja);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetch();
    }, [startDate, endDate]);

    return (
        <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
            <div className='flex flex-col'>
                <p>Masa Berlaku</p>
                <div className='flex flex-col gap-2 justify-between w-full mt-[5px]'>
                    <p>Dari :</p>
                    <div className="relative flex justify-center items-center border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[5px] mt-[5px]">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            ref={datePickerRef}
                            className="w-full outline-0 text-center"
                            popperClassName="custom-datepicker-popper"
                        />
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
                            ref={datePickerRef2}
                            className="w-full outline-0 text-center"
                            popperClassName="custom-datepicker-popper"
                        />
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

            {data?.map((data, i) => (
                <button 
                    key={i} 
                    onClick={(e) => handleNavigate(e, data)} 
                    className='flex justify-between text-center border border-[#BDBDBD] rounded-xl p-4 mt-5'
                >
                    <div className='grid text-start'>
                        <p className='text-[#C2A353]'>belum</p>
                        <p className='font-semibold text-[14px]'>Rp. {data?.total}</p>
                    </div>
                    <div className='grid text-end'>
                        <p>{data.createdAt.substring(0, 10)}</p>
                        <p>WIB {data.createdAt.substring(11, 16)}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

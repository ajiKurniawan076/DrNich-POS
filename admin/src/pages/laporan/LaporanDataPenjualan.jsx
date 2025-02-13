import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTgl from "../../assets/iconproduk/iTgl.svg";
import DatePicker from 'react-datepicker'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


export const LaporanDataPenjualan = () => {
    const { setNav, setLink } = useContext(navContext)
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [data, setData] = useState([]);
    const location = useLocation();
    const { tanggal } = location.state || [];
    const [startDate, setStartDate] = useState(new Date(tanggal.dari));
    const [endDate, setEndDate] = useState(new Date(tanggal.sampai));
    const navigate = useNavigate();
    
    const handleNavigate = (e, datax) => {
        e.preventDefault()
        navigate('/pos/LaporanPenjualanDetail', { state:{transaksi: datax} })
        // console.log(data)
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
        setLink('/pos/LaporanRingkasanPenjualan')
        setNav('Data Penjualan')   
        document.title = 'Data Penjualan'
        // console.log(location.state)
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualan", tanggal)
                .then((response) => (setData(response.data.transaksi),console.log(response.data.transaksi)))
        }
        fetchData();
        // console.log(tanggal)
    }, [])

    useEffect(() => {
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z' , sampai: endDate?.toISOString().split('.')[0] + 'Z' }
        console.log(tanggal)
        const fetch = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualan", tanggal)
                .then((response) => (setData(response.data.transaksi), console.log(response.data.transaksi)))

        }
        fetch()
        
    }, [startDate, endDate])
    

return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
        {/* <form className="my-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
            <input
                // onChange={filterData}
                // ref={cari}
                type="text"
                className="text-sm w-full h-[30px] focus:outline-none"
                placeholder="Cari..."
            ></input>
        </form> */}
        <div className='flex flex-col'>
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
        
        {data.length>0 && data?.map((data, i) => (
            
            <button onClick={(e)=>handleNavigate(e, data)} className='flex justify-between text-start text-[12px] border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <div>
                <p className='text-[#C2A353]'>{data.invoice}</p>
                    <p className='text-[14px]'>Rp {data?.totalAkhir?.toLocaleString('id-ID')}</p>
            </div>
            <div>
                <p>{data.createdAt.substring(0, 10)}</p>
                <p>WIB {data.createdAt.substring(11, 16)}</p>
            </div>
        </button>
        ))}
        
    </div>
)
}

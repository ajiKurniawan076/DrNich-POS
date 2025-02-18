import { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iGrafik2 from "../../assets/iconLaporanPenjualan/iGrafik2.svg";
import i1 from "../../assets/iconLaporanPenjualan/i1.svg";
import i2 from "../../assets/iconLaporanPenjualan/i2.svg";
import i3 from "../../assets/iconLaporanPenjualan/i3.svg";
import i4 from "../../assets/iconLaporanPenjualan/i4.svg";
import DatePicker from 'react-datepicker'
import axios from 'axios';
import { toDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



export const LaporanRingkasanPenjualan = () => {
    const { setNav, setLink } = useContext(navContext)
    const cari = useRef(null)
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');
    const [data, setData] = useState();
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault()
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z', sampai: endDate }
        navigate('/pos/laporanDataPenjualan', { state: { tanggal: tanggal } })
        console.log(data.transaksi)
    }
    const handleNavigatePs = (e) => {
        e.preventDefault()
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z', sampai: endDate }
        navigate('/pos/LaporanDataPembelianStok', { state: { tanggal: tanggal } })
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
        const tanggal = { dari: "2025-01-01T00:00:00Z", sampai: new Date().toISOString().split('.')[0] + 'Z' }
        const fetchData = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualan", tanggal)
                .then((response) => (setData(response.data)))
        }
        fetchData();
    }, [])

    useEffect(() => {
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z', sampai: endDate }
        const fetch = async () => {
            await axios
                .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualan", tanggal)
                .then((response) => (
                    setData(response.data), toast.success("Sukses Mengambil Data")))
        }
        fetch()
        console.log(tanggal)
    }, [startDate, endDate])


    setLink('/pos/laporan')
    setNav('Ringkasan Penjualan')
    document.title = 'Ringkasan Penjualan'
    return (

        <div className="flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10">
            {/* <form className="my-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
            <input
                // onChange={filterData}
                ref={cari}
                type="text"
                className="text-sm w-full h-[30px] focus:outline-none"
                placeholder="Cari..."
            ></input>
        </form> */}
            <ToastContainer />
            <div className='flex flex-col'>
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


                <div className='flex justify-between gap-[10px] text-[12px] w-full'>
                    <div className='flex flex-col gap-[10px] border rounded-xl border-[#C2A353] px-[20px] py-[15px] mt-[20px] w-full'>
                        <div className='flex items-center text-center gap-[5px]'>
                            <p>Total Produk</p>
                            <img src={iSeruTrans} alt="iSeru" />
                        </div>
                        <div className='flex items-center text-center'>
                            <p className='font-semibold text-[14px]'>Rp. {data?.totalPendapatan?.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[10px] border rounded-xl border-[#C2A353] px-[20px] py-[15px] mt-[20px] w-full'>
                        <div className='flex items-center text-center gap-[5px]'>
                            <p>HPP</p>
                            <img src={iSeruTrans} alt="iSeru" />
                        </div>
                        <div className='flex items-center text-center'>
                            <p className='font-semibold text-[14px]'>Rp.</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between gap-[10px] my-[10px] text-[12px] w-full'>
                    <div className='flex flex-col gap-[10px] border rounded-xl border-[#C2A353] px-[20px] py-[15px] w-full'>
                        <div className='flex items-center text-center gap-[5px]'>
                            <p>Total Laba Kotor</p>
                            <img src={iSeruTrans} alt="iSeru" />
                        </div>
                        <div className='flex items-center text-center'>
                            <p className='font-semibold text-[14px]'>Rp.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[10px] border rounded-xl border-[#C2A353] px-[20px] py-[15px] w-full'>
                        <div className='flex items-center text-center gap-[5px]'>
                            <p>Total Transaksi</p>
                            <img src={iSeruTrans} alt="iSeru" />
                        </div>
                        <div className='flex items-center text-center'>
                            <p className='font-semibold text-[14px]'>{data?.totalTransaksi}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[10px]'>
                    <button
                        onClick={handleNavigate}
                        className='flex justify-between items-center text-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] text-[12px]'>
                        <p>Data Penjualan</p>
                        <img src={iPan} alt="Panah" />
                    </button>
                    <button
                        onClick={handleNavigatePs}
                        className='flex justify-between items-center text-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] text-[12px]'>
                        <p>Data Pembelian Stok</p>
                        <img src={iPan} alt="Panah" />
                    </button>
                    <a href='LaporanMetodePembayaran' className='flex justify-between items-center text-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] text-[12px]'>
                        <p>Laporan Metode Pembayaran</p>
                        <img src={iPan} alt="Panah" />
                    </a>
                </div>
                <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                    <p className="">Grafik Penjualan</p>
                </div>
                <div>
                    <img src={iGrafik2} alt="" className='h-fit w-fit' />
                </div>
                <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                    <p className="">Laporan Promo</p>
                </div>
                <div className='grid text-[12px] text-[#454545] gap-[10px]'>
                    <div className='flex justify-between px-[20px] py-[10px] border border-[#BDBDBD] rounded-xl'>
                        <p>Diskon</p>
                        <img src={iPanahB} alt="PanahBawah" />
                    </div>
                    <div className='flex justify-between text-center items-center border border-[#BDBDBD] rounded-xl p-[15px]'>
                        <div className='grid text-start gap-2'>
                            <p>Mega Launching</p>
                            <p>Rp 2.000.000</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>200 Transaksi</p>
                        </div>
                    </div>
                    <div className='flex justify-between text-center items-center border border-[#BDBDBD] rounded-xl p-[15px]'>
                        <div className='grid text-start gap-2'>
                            <p>Birthday Promo</p>
                            <p>Rp 1.053.000</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>87 Transaksi</p>
                        </div>
                    </div>
                </div>


                {/* <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full">
            <p className="">Produk Terlaris</p>
        </div>
        <div className='grid mt-3'>
            <div className='flex h-full gap-3'>
                <div className='flex items-center text-center gap-8 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Banyak Produk terjual</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
                <div className='flex items-center text-center gap-16 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Jasa</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
            </div>
        </div>
        <div className='grid'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-7 mb-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Facial Gold</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Laser</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Facial Glow Acne</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>5000 terjual</p>
                </div>
            </div>
        </div> */}


                {/* <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start w-full mt-2">
            <p className="">Kategori Teratas</p>
        </div>
        <div className='grid mt-3'>
            <div className='flex h-full gap-3'>
                <div className='flex items-center text-center gap-6 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Pendapatan Penjualan</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
                <div className='flex items-center text-center gap-16 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                    <p>Semua</p>        
                    <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                </div>
            </div>
        </div>
        <div className='grid'>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl mt-7 mb-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i1} alt="" />
                    <p>Facial Series</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 200.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i2} alt="" />
                    <p>Sunscreen</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 120.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i3} alt="" />
                    <p>Serum</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp 50.000.000</p>
                </div>
            </div>
            <div className='flex justify-between p-4 border border-[#BDBDBD] rounded-xl my-1 text-[12px]'>
                <div className='flex items-center text-center gap-3'>
                    <img src={i4} alt="" />
                    <p>Toner</p>
                </div>
                <div className='text-[#C2A353]'>
                    <p>Rp. 10.000.000</p>
                </div>
            </div>
        </div> */}

                <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                    <p className="">Pelanggan Teratas</p>
                </div>
                <div className='grid'>
                    <div className='flex h-full gap-3'>
                        <div className='flex items-center text-center gap-6 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                            <p>Pendapatan Penjualan</p>
                            <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                        </div>
                        <div className='flex items-center text-center gap-16 border rounded-xl text-[12px] text-[#454545] border-[#BDBDBD] p-1 px-4 w-fit h-[130%]'>
                            <p>Semua</p>
                            <img src={iPanahB} alt="iPanahB" className='w-[20px] h-[20px]' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[10px] mt-[30px] h-full'>
                    <div className='flex justify-between p-[15px] border border-[#BDBDBD] rounded-xl text-[12px]'>
                        <div className='flex items-center text-center gap-[10px]'>
                            <img src={i1} alt="" />
                            <p>Hana</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>Rp 200.000.000</p>
                        </div>
                    </div>
                    <div className='flex justify-between p-[15px] border border-[#BDBDBD] rounded-xl text-[12px]'>
                        <div className='flex items-center text-center gap-[10px]'>
                            <img src={i2} alt="" />
                            <p>Agus</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>Rp 120.000.000</p>
                        </div>
                    </div>
                    <div className='flex justify-between p-[15px] border border-[#BDBDBD] rounded-xl text-[12px]'>
                        <div className='flex items-center text-center gap-[10px]'>
                            <img src={i3} alt="" />
                            <p>Caca</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>Rp 50.000.000</p>
                        </div>
                    </div>
                    <div className='flex justify-between p-[15px] border border-[#BDBDBD] rounded-xl text-[12px] mb-8'>
                        <div className='flex items-center text-center gap-[10px]'>
                            <img src={i4} alt="" />
                            <p>Diana</p>
                        </div>
                        <div className='text-[#C2A353]'>
                            <p>Rp. 10.000.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

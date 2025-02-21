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
import { toast } from 'react-toastify';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";


export const LaporanPenjualanProduk = () => {
    const { setNav, setLink } = useContext(navContext)
    const cari = useRef(null)
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');
    const [data, setData] = useState();
    const [chart, setChart] = useState([])
    const [tampil, setTampil] = useState([])
    const [dataPenjualan, setDataPenjualan] = useState([])
    const [produkList, setProdukList] = useState([])
    const [chartTampil, setChartTampil] = useState([])
        
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
                .then((response) => (setData(response.data)) )
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
                .then((response) => (
                    setData(response.data),
                    toast.success("Berhasil Masuk", {
                        autoClose: 1000,
                    })
                ))
                .catch((error) => {
                    console.error(error),
                        toast.error("Terjadi Kesalahan", {
                        autoClose: 2000,
                    })
                })
        }
        fetch()
    }, [startDate, endDate])


    useEffect(() => {
        const tanggal = {
            endOfWeek : (new Date().toISOString().split('.')[0] + 'Z')
            // endOfWeek : '2025-02-08'
        }
        const fetchChart = async () => {
            try {
                const response = await axios.post("https://api.drnich.co.id/api/pos/laporan/laporangrafikproduk", tanggal)
                console.log(response.data)
                setChart(response.data.penjualan)
                response.data.penjualan.map(item => setChartTampil(prev => [...prev, {name:item.name, terisi:0}]))
                setProdukList(response.data.produklist)
            } catch (error) {
                console.log("Error Saat Fetching Chart data:", error)
            }
        }
        fetchChart()
    }, [])

    
    
    useEffect(() => {
        if (produkList.length > 2) {
            const visibleChart = produkList.slice(0, 3)
            setTampil(visibleChart)
        } 
    }, [produkList])
    
    useEffect(() => {
        if (tampil.length > 0) {
            tampil.forEach(tp => {
                chart.forEach(item => {
                    item.penjualan.forEach(datax => {
                        if (tp.namaProduk === datax.namaProduk) {
                            setChartTampil(prev =>
                                prev.map(y => {
                                    if (y.name === item.name) {
                                        let updatedTerisi = y.terisi + 1;
                                        
                                        if (y.terisi === 0) {
                                            return { ...y, penjualan1: datax.jumlah, terisi: updatedTerisi };
                                        } else if (y.terisi === 1) {
                                            return { ...y, penjualan2: datax.jumlah, terisi: updatedTerisi };
                                        } else if (y.terisi === 2) {
                                            return { ...y, penjualan3: datax.jumlah, terisi: updatedTerisi };
                                        }
                                    }
                                    return y;
                                })
                            );
                        }
                    });
                });
            });
        }
    }, [tampil]);
    
    useEffect(()=>{
        console.log(chartTampil)
    },[chartTampil])

    // useEffect(() => {
    //     const penjualanProduk = async () => {
    //         try {
    //             const response = await axios.post("")
    //             console.log(response.data)
    //             setDataPenjualan(response.data)
    //         } catch (error) {
    //             console.log("Error Saat Fetching Chart data:", error)
    //         }
    //     }
    //     penjualanProduk()
    // },[])

setLink('/pos/laporan')
setNav('Laporan Produk')   
document.title = 'Laporan Produk'
return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
        <button onClick={()=>console.log(produkList)}>asd</button>
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
                <div className="text-[12px] font-semibold bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                    <p>Grafik Penjualan Seminggu Terakhir</p>
                </div>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={chartTampil}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barCategoryGap="30%"
                            barGap={-5}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, dy: 2 }} textAnchor="middle" />
                            <YAxis tickFormatter={(val) => {
                                if (val >= 1000000) return `${(val/1000000).toLocaleString("id-ID")}jt`;
                                return val.toLocaleString('id-ID');
                            }} />
                            <Tooltip />
                            <Legend formatter={(value) => {
                                const index = parseInt(value.replace("penjualan", ""), 10) - 1;
                                return tampil[index]?.namaProduk || value;
                            }} 
                                onClick={(e)=>{console.log(e.value)}}
                            />

                            {tampil.map((produk, i) => (
                            <Bar
                                key={i}
                                dataKey={`penjualan${i + 1}`}
                                name={produk.namaProduk}
                                fill={`url(#colorGradient${i === 0 ? '' : i + 1})`}
                                radius={[5, 5, 0, 0]}
                            />
                            ))}

                            <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFC120" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#F8A39B" stopOpacity={0.7} />
                            </linearGradient>
                            <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#280594" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#F8A39B" stopOpacity={0.7} />
                            </linearGradient>
                            <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF708C" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#A7B5FF" stopOpacity={0.7} />
                            </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                <p className="">Data Penjualan Produk</p>
            </div>
            {/* {dataPenjualan.map((item, i) => {
                <div key={i} className='flex justify-between items-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px] mt-[10px]'>
                    <div className='grid text-start gap-[5px]'>
                        <p>{item.namaProduk}</p>
                        <p className='text-[14px] font-semibold'>Rp {item.harga.toLocaleString("id-ID")}</p>
                    </div>
                    <p>{item.jumlah} Transaksi</p>
                </div>
            })} */}
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

import React, { useContext, useEffect, useRef, useState } from 'react';
import { navContext } from "../../App2";
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iFrameGra from "../../assets/iconLaporanPenjualan/iFrameGra.svg";
import iFrameKet2 from "../../assets/iconLaporanPenjualan/iFrameKet2.svg";
import DatePicker from 'react-datepicker';
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
    const { setNav, setLink } = useContext(navContext);
    // State untuk datepicker
    const [button, setButton] = useState(true);
    const [button2, setButton2] = useState(true);
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');

    // State data API
    const [data, setData] = useState(null);
    const [chart, setChart] = useState([]);        // data grafik asli dari API
    const [produkList, setProdukList] = useState([]); // seluruh produk dari API
    const [tampil, setTampil] = useState([]);        // produk yang akan ditampilkan (misalnya, 3 produk)
    const [chartTampil, setChartTampil] = useState([]); // data gabungan untuk chart

    // State untuk visibilitas bar (legend interaktif)
    const [visibleBars, setVisibleBars] = useState([]);

    const datePickerRef = useRef(null);
    const datePickerRef2 = useRef(null);

    // Fungsi untuk membuka datepicker
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

    // Fetch data laporan penjualan produk (data umum)
    useEffect(() => {
        const tanggal = { dari: "2025-01-01T00:00:00Z", sampai: new Date().toISOString().split('.')[0] + 'Z' };
        axios
        .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualanproduk", tanggal)
        .then(response => setData(response.data))
        .catch(error => console.error(error));
    }, []);

    // Fetch data laporan penjualan produk berdasarkan tanggal
    useEffect(() => {
        const tanggal = { dari: startDate?.toISOString().split('.')[0] + 'Z', sampai: endDate };
        axios
        .post("https://api.drnich.co.id/api/pos/laporan/laporanpenjualanproduk", tanggal)
        .then(response => {
            setData(response.data);
            toast.success("Berhasil Masuk", { autoClose: 1000 });
        })
        .catch(error => {
            console.error(error);
            toast.error("Terjadi Kesalahan", { autoClose: 2000 });
        });
    }, [startDate, endDate]);

    // Fetch data grafik penjualan produk
    useEffect(() => {
        const tanggal = { endOfWeek: new Date().toISOString().split('.')[0] + 'Z' };
        axios
        .post("https://api.drnich.co.id/api/pos/laporan/laporangrafikproduk", tanggal)
        .then(response => {
            // Pastikan struktur data: response.data.penjualan dan response.data.produklist
            const penjualan = response.data.penjualan || [];
            setChart(penjualan);
            // Inisialisasi chartTampil berdasarkan data penjualan
            const initialChart = penjualan.map(item => ({ name: item.name, terisi: 0 }));
            setChartTampil(initialChart);
            setProdukList(response.data.produklist || []);
        })
        .catch(error => console.error("Error Saat Fetching Chart data:", error));
    }, []);

    // Ambil 3 produk pertama dari produkList untuk ditampilkan
    useEffect(() => {
        if (produkList.length >= 3) {
        const visibleChart = produkList.slice(0, 3);
        setTampil(visibleChart);
        }
    }, [produkList]);

    // Inisialisasi state visibleBars setelah data tampil tersedia
    useEffect(() => {
        if (tampil.length > 0) {
        setVisibleBars(new Array(tampil.length).fill(true));
        }
    }, [tampil]);

    // Update chartTampil dengan data penjualan sesuai produk pada tampil
    useEffect(() => {
        if (tampil.length === 0 || chart.length === 0) return;
        const updatedChart = chart.map(item => {
        let newItem = { name: item.name, terisi: 0 };
        item.penjualan.forEach(datax => {
            // Cari apakah produk ini termasuk dalam array tampil
            const indexProduk = tampil.findIndex(tp => tp.namaProduk === datax.namaProduk);
            if (indexProduk !== -1) {
            if (newItem.terisi === 0) {
                newItem = { ...newItem, penjualan1: datax.jumlah, terisi: 1 };
            } else if (newItem.terisi === 1) {
                newItem = { ...newItem, penjualan2: datax.jumlah, terisi: 2 };
            } else if (newItem.terisi === 2) {
                newItem = { ...newItem, penjualan3: datax.jumlah, terisi: 3 };
            }
            }
        });
        return newItem;
        });
        setChartTampil(updatedChart);
    }, [tampil, chart]);

    // Custom Legend dengan interaksi klik
    const CustomLegend = (props) => {
        const { payload } = props;
        const handleLegendClick = (index) => {
        setVisibleBars(prev => {
            const newVisible = [...prev];
            newVisible[index] = !newVisible[index];
            return newVisible;
        });
        };
        
        

        return (
        <ul style={{ listStyle: 'none', display: 'flex', padding: 0, cursor: 'pointer' }}>
            {payload.map((entry, index) => (
            <li
                key={`legend-${index}`}
                onClick={() => handleLegendClick(index)}
                style={{
                    
                marginRight: 10,
                color: visibleBars[index] ? entry.color : '#ccc',
                }}
            >
                {tampil[index] ? tampil[index].namaProduk : entry.value}
            </li>
            ))}
        </ul>
        );
    };

    useEffect(() => {
        console.log("chartTampil:", chartTampil);
    }, [chartTampil]);

    // Set judul halaman dan link navigasi
    setLink('/pos/laporan');
    setNav('Laporan Produk');
    document.title = 'Laporan Produk';

    return (
        <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
        <button onClick={() => console.log(produkList)}>Debug ProdukList</button>
        <div className='flex flex-col h-full'>
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
        <div className="flex flex-col my-[10px]">
            <select
            name="options"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[13px] px-[20px]"
            id="Gender"
            defaultValue=""
            disabled
            >
            <option value="" className="text-gray-300" disabled>
                Minggu ini
            </option>
            <option value="hariini">Hari ini</option>
            <option value="kemarin">Kemarin</option>
            <option value="bulanini">Bulan Ini</option>
            <option value="minggulalu">Minggu Lalu</option>
            <option value="bulanlalu">Bulan Lalu</option>
            <option value="tahunini">Tahun Ini</option>
            <option value="tahunlalu">Tahun Lalu</option>
            </select>
        </div>
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
            <img src={iPan} alt="" />
            </div>
            <div className='flex justify-between gap-[5px] text-start items-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] my-[10px]'>
            <div className='grid text-start gap-[6px]'>
                <div className='flex gap-2 w-full'>
                <p>Total Kategori Keseluruhan</p>
                <img src={iSeruTrans} alt="seru" />
                </div>
                <p className='text-[14px] font-semibold'>blm</p>
            </div>
            <img src={iPan} alt="" />
            </div>
            {/* Grafik Penjualan */}
            <div className='grid place-items-center'>
            <div className="text-[12px] font-semibold bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
                <p>Grafik Penjualan Seminggu Terakhir</p>
            </div>
            {tampil.length > 0 && chartTampil.length > 0 && (
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
                        if (val >= 1000000) return `${(val / 1000000).toLocaleString("id-ID")}jt`;
                        return val.toLocaleString('id-ID');
                    }} />
                    <Tooltip />
                    <Legend content={<CustomLegend />} />
                    {tampil.map((produk, i) => (
                        <Bar
                        key={i}
                        dataKey={`penjualan${i + 1}`}
                        name={produk.namaProduk}
                        fill={`url(#colorGradient${i === 0 ? '' : i + 1})`}
                        radius={[5, 5, 0, 0]}
                        hide={!visibleBars[i]}
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
            )}
            </div>
            <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-[17px] w-full">
            <p>Data Penjualan Produk</p>
            </div>
            {/* Data Penjualan Contoh */}
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
    );
};

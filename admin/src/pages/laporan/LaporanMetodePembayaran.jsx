import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iTgl from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iSeruTrans from "../../assets/iconLaporanPenjualan/iSeruTrans.svg";
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import iFrameGra from "../../assets/iconLaporanPenjualan/iFrameGra.svg";
import iFrameKet from "../../assets/iconLaporanPenjualan/iFrameKet.svg";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toast } from 'react-toastify';


export const LaporanMetodePembayaran = () => {
    const { setNav, setLink } = useContext(navContext)
    const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
    const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');
    const [button, setButton] = useState();
    const [button2, setButton2] = useState();
    const [chartData, setChartData] = useState([])
    const [tampilanMetode, setTampilanMetode] = useState([])
    const [atur, setAtur] = useState("harian")
    const [data, setData] = useState()
    const [chart, setChart] = useState([])
    const [chartTampil, setChartTampil] = useState([])
    const [produkList, setProdukList] = useState([])
    const [tampil, setTampil] = useState([]);        // produk yang akan ditampilkan (misalnya, 3 produk)
    const [visibleBars, setVisibleBars] = useState([]);        // produk yang akan ditampilkan (misalnya, 3 produk)
    const [dataProduk, setDataProduk] = useState([]);        // produk yang akan ditampilkan (misalnya, 3 produk)
    const pilihProdukRef = useRef([])

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

    useEffect(() => {
        const tanggal = { tanggal: new Date().toISOString().split('.')[0] + 'Z', menu : atur }
        const fetchData = async () => {
            await axios
                .post(
                    "https://api.drnich.co.id/api/pos/laporan/laporangrafikmetode",tanggal
                    )
                    .then((response) => {
                        setData(response.data);
                        const penjualan = response.data.penjualan || [];
                        setChart(penjualan);
                        // Inisialisasi chartTampil berdasarkan data penjualan
                        const initialChart = penjualan.map(item => ({ name: item.name, terisi: 0 }));
                        setChartTampil(initialChart);
                        setProdukList(response.data.produklist || []);
                        // console.log(response.data)
                    })
                    .catch(function (error) {
                        console.log("error saat fetching", error);
                    });
            };
            fetchData();
    }, [atur]);

    useEffect(() => {
        if (produkList.length >= 3) {
            const visibleChart = produkList.slice(0, 3);
            setTampil(visibleChart);
        }
        else {
            const visibleChart = produkList.slice(0, produkList.length);
            setTampil(visibleChart);
        }
    }, [produkList]);

    useEffect(() => {
        if (tampil.length > 0) {
            setVisibleBars(new Array(tampil.length).fill(true));
        }
    }, [tampil]);

    useEffect(() => {
        if (tampil.length === 0 || chart.length === 0) return;
        const updatedChart = chart.map(item => {
            let newItem = { name: item.name, terisi: 0 };
            item.penjualan.forEach(datax => {
                // Cari apakah produk ini termasuk dalam array tampil
                const indexProduk = tampil.findIndex(tp => tp.metode === datax.metode);
                if (indexProduk !== -1) {
                if (indexProduk === 0) {
                    newItem = { ...newItem, penjualan1: datax.jumlah, pendapatan1: datax.pendapatan, terisi: 1 };
                } else if (indexProduk === 1) {
                    newItem = { ...newItem, penjualan2: datax.jumlah, pendapatan2: datax.pendapatan, terisi: 2 };
                } else if (indexProduk === 2) {
                    newItem = { ...newItem, penjualan3: datax.jumlah, pendapatan3: datax.pendapatan, terisi: 3 };
                }
                }
            });
            return newItem;
        });
        console.log(updatedChart)
        setChartTampil(updatedChart);
    }, [tampil]);

    const gantiTampil = () => {
        const data = [
            { metode: pilihProdukRef.current[0].value },
            { metode: pilihProdukRef.current[1].value },
            { metode: pilihProdukRef.current[2].value },
            ]
            setTampil(data)
    }
    const CustomLegend = (props) => {
    const { payload } = props;
    // const handleLegendClick = (index,e) => {
    //     e.preventDefault()
    //     setVisibleBars(prev => {
    //     const newVisible = [...prev];
    //     newVisible[index] = !newVisible[index];
    //     return newVisible;
    //   });
    // }
    // ;

    return (
        <div className='w-full flex justify-center items-center my-1'>
            <ul style={{ listStyle: 'none', display: 'flex', padding: 0, cursor: 'pointer' }}>
            {tampil && tampil.map((entry, index) => (
            <>
                <svg width={20} height={20} className='rounded-md'>
                <rect x={0} y={0} width={20} height={20} fill={`url(#colorGradient${index})`} />
                </svg>
                <select
                onChange={gantiTampil}
                className='w-fit flex text-center font-bold'
                key={`legend-${index}`}
                ref={(el) => (pilihProdukRef.current[index] = el)} // Assign dynamically
                style={{
                    marginRight: 10,
                    color: visibleBars[index] ? `url(#colorGradient${index})` : '#ccc',
                    appearance: 'none',
                }}
                >
                {produkList.map((item, i) => (
                    <>
                    {item.metode == entry.metode ? 
                    <option selected disabled key={i} value={item.metode}>{entry.metode}</option>
                    :
                    <option key={i} value={item.metode}>{item.metode}</option>
                    }
                    </>
                ))}
                </select>
            </>
            ))}
            </ul>
        </div>
    );
    // return (
    //   <ul style={{ listStyle: 'none', display: 'flex', padding: 0, cursor: 'pointer' }}>
    //     {payload.map((entry, index) => (
    //       <li
    //         key={`legend-${index}`}
    //         onClick={(e) => handleLegendClick(index,e)}
    //         style={{
    //           marginRight: 10,
    //           color: visibleBars[index] ? entry.color : '#ccc',
    //         }}
    //       >
    //         {tampil[index] ? tampil[index].namaProduk : entry.value}
    //       </li>
    //     ))}
    //   </ul>
    // );
    };

    useEffect(() => {
        let isi = [
            { metode: tampil[0]?.metode || "", penjualan: 0 },
            { metode: tampil[1]?.metode || "", penjualan: 0 },
            { metode: tampil[2]?.metode || "", penjualan: 0 },
            ];
        
            tampil.forEach((item, i) => { 
            chartTampil.forEach((itemx) => { 
                isi = isi.map((itemz) => {
                if (itemz.penjualan === item.penjualan) {
                    return {
                    ...itemz,
                    penjualan:
                        (itemz.penjualan || 0) + 
                        (i === 0 ? (itemx.penjualan1 || 0) :
                        i === 1 ? (itemx.penjualan2 || 0) :
                        i === 2 ? (itemx.penjualan3 || 0) : 0),
                    pendapatan:
                    (itemz.pendapatan || 0) + 
                        (i === 0 ? (itemx.pendapatan1 || 0) :
                        i === 1 ? (itemx.pendapatan2 || 0) :
                        i === 2 ? (itemx.pendapatan3 || 0) : 0)
                };
                }
                return itemz;
                });
            });
            });
        setDataProduk(isi);
    }, [chartTampil, tampil]);
    
    const download = async (e,jsonData, fileName = "data.xlsx") => {
        e.preventDefault()
        // console.log(data)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");
        // Add header row
        worksheet.columns = Object.keys(jsonData[0]).map((key) => ({ header: key, key }));
        // Add data rows
        jsonData.forEach((row) => worksheet.addRow(row));
        // Write to file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), fileName);
    }

    const hari = useRef(null);
    const MBT = () => {
        setAtur(hari.current.value)
        // console.log("Minggu :", Minggu.current.value)
    }

setNav('Metode Pembayaran') 
setLink('/pos/laporanRingkasanPenjualan')
document.title = 'Metode Pembayaran'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-fit pt-8 text-[#454545] text-[12px]'>
        <div className='flex flex-col h-fit'>
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
        <div>
            <div className='flex flex-col gap-[10px]'>
                <button
                    onClick={(e)=>{download(e,data.transaksi,'laporan.xlsx')}}
                    className='flex justify-between items-center text-center border rounded-xl border-[#C2A353] px-[20px] py-[15px] text-[12px]'>
                    <p>Download Laporan</p>
                    <img src={iPan} alt="Panah" />
                </button>
            </div>
            <div className='flex justify-between gap-2 text-start items-center border rounded-xl border-[#C2A353] p-4 mt-2'>
                <div className='flex gap-2 w-full'>
                    <p>Total Transaksi</p>
                    <img src={iSeruTrans} alt="seru" />
                </div>
                <p className='text-[14px] font-semibold'>{data?.total}</p>
            </div>
            <div className='flex justify-between gap-2 text-start items-center border rounded-xl border-[#C2A353] p-4 mt-2'>
                <div className='grid text-start'>
                    <div className='flex gap-2 w-full'>
                        <p>Total Metode Pembayaran</p>
                        <img src={iSeruTrans} alt="seru" />
                    </div>
                    {/* <p className='text-[14px] font-semibold'>{data.metodePembayaran}</p> */}
                </div>
                <img src={iPan}  alt="" />
            </div>
            <div className="flex flex-col my-[10px]">
                <select
                    name="options"
                    className="border border-[#C2A353] rounded-xl w-[50%] h-[45px] py-[13px] px-[20px]"
                    id="Gender"
                    defaultValue=""
                    ref={hari}
                    onChange={MBT}
                >
                    <option value="harian">Hari Ini</option>
                    <option value="mingguan">Minggu Ini</option>
                    <option value="bulanan">Bulan Ini</option>
                    <option value="tahunan">Tahun Ini</option>
                </select>
            </div>
        </div>
        {/* Grafik Penjualan menggunakan Recharts */}
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mb-[17px] w-full">
            <p>Grafik Penjualan</p>
        </div>
        <div className='grid place-items-center'>
            {tampil.length > 0 && chartTampil.length > 0 && (
                <div className='scrollvisible mb-[10px]' style={{ width: '100%', height: 400, overflowX: 'auto' }}> {/* Scrollable container */}
                    <div className='flex justify-center' style={{ width: 'max-content', minWidth: '100%' }}> {/* Ensures BarChart does not shrink */}
                    <ResponsiveContainer width={chartTampil.length * 80} height={400}>
                            <BarChart
                                data={chartTampil}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                barCategoryGap="20%"
                                barGap={-5}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 12, dy: 2 }} 
                                textAnchor="middle" 
                            />
                            <YAxis 
                                tickFormatter={(val) => val >= 1000000 
                                ? `${(val / 1000000).toLocaleString("id-ID")}jt` 
                                : val.toLocaleString('id-ID')} 
                            />
                            <Tooltip />
                            {tampil.map((produk, i) => (
                                <Bar
                                key={i}
                                dataKey={`penjualan${i + 1}`}
                                name={produk.namaProduk}
                                fill={`url(#colorGradient${i})`}
                                radius={[5, 5, 0, 0]}
                                hide={!visibleBars[i]}
                                />
                            ))}
                            <defs>
                                <linearGradient id="colorGradient0" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFC120" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#F8A39B" stopOpacity={0.7} />
                                </linearGradient>
                                <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#280594" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#F8A39B" stopOpacity={0.7} />
                                </linearGradient>
                                <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF708C" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#A7B5FF" stopOpacity={0.7} />
                                </linearGradient>
                            </defs>
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                    
                    
                    )}
                    <CustomLegend/>
                </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mt-3 w-full">
            <p className="">Data Metode Pembayaran</p>
        </div>
        {/* {produkList.map((item, i) => (
            <div key={i} className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-4'>
                <div className='grid text-start'>
                    <p>Tunai</p>
                    <p className='text-[14px] font-semibold'>Rp {item.total.ToLocaleString("id-ID")}</p>
                </div>
                <p>{item.jumlah} Transaksi</p>
            </div>
        ))} */}
        <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-4'>
            <div className='grid text-start'>
                <p>Tunai</p>
                <p className='text-[14px] font-semibold'>Rp 7.200.000</p>
            </div>
            <p>296 Transaksi</p>
        </div>
        <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-2'>
            <div className='grid text-start'>
                <p>Kartu Debit</p>
                <p className='text-[14px] font-semibold'>Rp 5.437.000</p>
            </div>
            <p>194 Transaksi</p>
        </div>
        <div className='flex justify-between items-center border rounded-xl border-[#BDBDBD] p-4 mt-2'>
            <div className='grid text-start'>
                <p>Transfer</p>
                <p className='text-[14px] font-semibold'>Rp 1.200.000</p>
            </div>
            <p>13 Transaksi</p>
        </div>
        {/* <span className='text-white'>a</span> */}
    </div>
)
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { modalsContext } from "./EditDiskon";
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahS from "../../assets/iconmanajement/iPanahS.svg";

export const ModalEditDiskon = () => {
    const {
        modals,
        setModals,
        jenis,
        kategori,
        produk,
        produkTerpilih,
        setProdukTerpilih,
        kategoriName
    } = useContext(modalsContext);

    const [jenisM, setJenisM] = useState("");
    const [kategoriM, setKategoriM] = useState([]);
    const [produkM, setProdukM] = useState([]);
    const jenisRef = useRef(null);
    const kategoriRef = useRef(null);
    
        const handleProduk = (item) => {
        const exist = produkTerpilih.filter((itemx) => itemx._id == item._id);
        exist.length == 0
        ? setProdukTerpilih((prev) => [...prev, item])
        : setProdukTerpilih((prev) => prev.filter((itemx) => itemx !== item));
    };

    const gantiKategori = (e) => {
        e.preventDefault();
        const filterproduk = produk.filter(
        (item) => item.kategori.kategori == kategoriRef.current.value
        );
        setProdukM(filterproduk);
    };
    const gantiRef = (e) => {
        e.preventDefault();
        setJenisM(jenisRef.current.value);
    };
    useEffect(() => {
        const filterKategori = kategori.filter(
        (item) => item.jenis.jenis == jenisM
        );
        setKategoriM(filterKategori);
        if(kategoriName=="Jenis Produk"){
        const filterproduk = produk.filter(item => item.jenis.jenis == jenisRef.current.value)
    console.log(filterproduk)
    setProdukTerpilih(filterproduk)
    setProdukM(filterproduk)
    }
    
    }, [jenisM]);

    useEffect(()=>{
            produk.length>0 && setProdukM(produk)
        },[produk])
    document.title = "Edit Diskon";
    return (
        <div
        className={`fixed z-50 flex flex-col items-center bg-black/20 top-0 h-full overflow-auto start-0 w-full ${
            modals == true ? "" : "hidden"
        }`}
        >
        <div className="md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] w-[100%] max-w-[500px] border-2 border-[#454545] rounded-xl bg-white overflow-auto min-h-full px-3">
            <form className="h-full flex flex-col">
            <div className="flex gap-[10px] justify-between mt-4">  
                <div className="relative w-full mt-1">
                <select
                    ref={jenisRef}
                    onChange={gantiRef}
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" selected className="text-[#BDBDBD]">
                    Semua Jenis
                    </option>
                    {jenis.map((item) => (
                    <option value={item.jenis}>{item.jenis}</option>
                    ))}
                </select>
                <img
                    src={iPanahS}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
                </div>
                {kategoriName == 'Produk' || kategoriName == 'Kategori Produk' ? 
                <div className="relative w-full mt-1">
                    <select
                    ref={kategoriRef}
                    onChange={gantiKategori}
                    name="options"
                    id="kategoriproduk"
                    className="relative bg-white border text-sm border-gray-300 rounded-xl w-full px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    aria-label="Kategori Produk"
                >
                    <option value="" selected className="text-[#BDBDBD]">
                    Semua Kategori
                    </option>
                    {kategoriM.map((item, i) => (
                    <option key={i} value={item.kategori}>
                        {item.kategori}
                    </option>
                    ))}
                </select>
                <img
                    src={iPanahS}
                    alt="Dropdown icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
                />
                </div>
                : <></>}
                
            </div>
            
            {kategoriName == 'Produk' && produkM.map((item, i) => (
                <button
                onClick={(e) => {
                    e.preventDefault();
                    handleProduk(item);
                }}
                className={`flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2 w-full ${
                    produkTerpilih.some((itemx) => itemx._id === item._id)
                    ? "border-2 border-[#C2A353]"
                    : ""
                }`}
                >
                <p>{item.namaProduk}</p>
                <p className="text-[#BDBDBD]">
                    {item.jenis.jenis} | {item.kategori.kategori}
                </p>
                </button>
            ))}
            <div className="flex items-end h-fit mt-auto">
                <button
                onClick={(e) => {
                e.preventDefault();
                setModals(false);
                }}
                className="flex mt-auto justify-between text-white text-[14px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] p-4 px-5 rounded-xl w-full">
                <p>Tambah</p>
                <p>| {produkTerpilih.length} Produk</p>
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};
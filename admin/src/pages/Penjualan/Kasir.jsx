import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iMin from "../../assets/iconproduk/iMin.svg";
import iPlus from "../../assets/iconproduk/iPlus.svg";
import iPan  from "../../assets/iconproduk/iPan.svg";
import axios from 'axios'
import { Kasir4 } from './Kasir4'
import { useNavigate } from 'react-router-dom'

export const kasirContext = createContext()
export const Kasir = () => {
    const { setNav, setLink } = useContext(navContext)
    const [modal , setModal] = useState(false)
    const [angka, setAngka] = useState(0)
    const [total, setTotal] = useState(0)
    const [potongan, setPotongan] = useState(0)
    const [totalAkhir, setTotalAkhir] = useState(0)
    const [cashback, setCashback] = useState(0)
    const [kategori, setKategori] = useState([])
    const [jenis, setJenis] = useState([])
    const [produk, setProduk] = useState([])
    const [promo, setPromo] = useState([])
    const [pelanggan, setPelanggan] = useState([])
    const [terapis, seTterapis] = useState([])
    const [marketing, setMarketing] = useState([])
    const [kategoriTampil, setKategoriTampil] = useState([])
    const [pelangganTerpilih, setPelangganTerpilih] = useState([{namaPelanggan : ''}])
    const [terapisTerpilih, setTerapisTerpilih] = useState([])
    const [marketingTerpilih, setMarketingTerpilih] = useState([])
    const [promoTerpilih, setPromoTerpilih] = useState([])
    const [kategoriTerpilih, setKategoriTerpilih] = useState('')
    const [jenisTerpilih, setJenisTerpilih] = useState('')
    const [produkTampil, setProdukTampil] = useState([])
    const [cart, setCart] = useState([])
    const jenisRef = useRef(null)
    const kategoriRef = useRef(null)
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState('')
    const cariRef = useRef(null)

    const cari =(e) => {
        e.preventDefault()
        const list = produk.filter(item => item.namaProduk.toLowerCase().includes(cariRef.current.value))
        console.log(list);
        
        setProdukTampil(list)
    }
    useEffect(() => {
        const fetch = async () => {
            await axios.get('https://api.drnich.co.id/api/pos/produk/produk').then(response => {
                setProduk(response.data)
                setProdukTampil(response.data)
            }
            )
            await axios.get('https://api.drnich.co.id/api/pos/produk/jenisProduk').then(response => {
                setJenis(response.data)
            }
            )
            await axios.get('https://api.drnich.co.id/api/pos/produk/kategoriProduk').then(response => {
                setKategori(response.data)
                setKategoriTampil(response.data)
            }
            )
            await axios.get('https://api.drnich.co.id/api/pos/user/pelanggan').then(response => {
                setPelanggan(response.data)
            }
            )
            await axios.get('https://api.drnich.co.id/api/pos/promo/promoaktif').then(response => {
                setPromo(response.data)
            }
            )
            await axios.get('https://api.drnich.co.id/api/pos/kasir/transaksiinvoice').then(response =>
                setInvoice(response.data))
           

        }
        fetch()
            setNav('Kasir')
            setLink('/pos')
    document.title = 'Kasir'
    }, [])
    const min = (isi) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === isi
                    ? { ...item, jumlah: Math.max(1, item.jumlah - 1) } // Ensure jumlah doesn't go below 0
                    : item)
        );
    };

    const plus = (isi) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === isi
                    ? { ...item, jumlah: Math.max(0, Number(item.jumlah) + 1) } // Ensure jumlah doesn't go below 0
                    : item)

        );
    }
    
    const pilihJenisKategori = () => {
        if(jenisRef.current.value == "reset" && kategoriRef.current.value == "reset"){
            setProdukTampil(produk)
            setKategoriTampil(kategori)
        }
        else if (jenisRef.current.value != "reset" && kategoriRef.current.value =='reset'){
            const filter = kategori.filter(item => item.jenis._id == jenisRef.current.value)
            setKategoriTampil(filter)
            const filtere = produk.filter(item => item.jenis._id == jenisRef.current.value)
            setProdukTampil(filtere)
        }
        else if (jenisRef.current.value == "reset" && kategoriRef.current.value !='reset'){
            setKategoriTampil(kategori)
            const filtere = produk.filter(item => item.kategori._id == kategoriRef.current.value)
            setProdukTampil(filtere)
        }
        else {
            const filter = kategori.filter(item => item.jenis._id == jenisRef.current.value)
            setKategoriTampil(filter)
            const filtere = produk.filter(item => (item.kategori._id == kategoriRef.current.value) && (item.jenis._id == jenisRef.current.value))
            setProdukTampil(filtere)
        }
    }
    const klikbarang = (isi) => {
        if (cart.some(item => item._id == isi._id)) {
            const filter = cart.find(item => item._id == isi._id)
            setCart((prev) => prev.filter(item => item !== filter))
        }
        else {
            const newisi = { ...isi, jumlah: 1 }
            setCart((prev) => [...prev, newisi])
        }

    }
    // useEffect(()=>{
    //     setTotal(0)
    //     cart.map((item)=>(setTotal(prev=>prev+item.jumlah*item.hargaJual)))
    // },[cart])

    useEffect(()=>{
        setTotal(0)
        setTotalAkhir(0)
        cart.map((item)=>(setTotal(prev=>prev+item.jumlah*item.hargaJual,
            setTotalAkhir(prev=>prev+item.jumlah*item.hargaJual)
        )))
        const datax = {
            promo : promoTerpilih._id,
            produks: cart
        }
        console.log(datax)
        const kalkulasi = async() =>{
            await axios.post('https://api.drnich.co.id/api/pos/kasir/kalkulasiharga/', datax).then(response => 
            {
                if(response.status==200){
                    setPotongan(response.data.kalkulasi.potongan)
                    setCashback(response.data.kalkulasi.cashback)
                    setTotalAkhir(total-response.data.kalkulasi.potongan)
                }
                else{}
            }
            )
        }
        kalkulasi()
    },[cart, promoTerpilih])
    const handleDraft =(e)=>{
            e.preventDefault()
            const data = {
                pelanggan : pelangganTerpilih._id,
                promo : promoTerpilih._id,
                total : total,
                invoice : invoice,
                poin : cashback,
                totalAkhir : totalAkhir,
                transaksiDetail : cart,
                potongan : potongan,
                status : "Pending"
            }
            console.log(data)
            axios.post('https://api.drnich.co.id/api/pos/kasir/transaksi', data).then(response =>{
                response.status==200 && navigate(0)
            })
        }

    return (
        <kasirContext.Provider value={{totalAkhir, handleDraft, potongan, cashback, total, promo, invoice, cart, setCart, pelanggan, setPelangganTerpilih, pelangganTerpilih, promoTerpilih, setPromoTerpilih, modal, setModal}}>
        <div className='flex flex-col px-10 py-8 gap-1 bg-white w-full h-fit min-h-full pt-8 text-[#454545] text-[12px]'>
            <button className='flex justify-between'>
                <button className='border-b-2 border-[#C2A353] text-[#C2A353] w-[50%] shadow-md'>  
                    <p>Transaksi</p>
                </button>
                <a href='DrafTransaksi2' className='border-b-2 w-[50%] text-[#BDBDBD]'>
                    <p>Draft Transaksi</p>
                </a>
            </button>
            <form className="mt-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
                <img src={iCari} alt="Cari" />
                <input
                    onChange={cari}
                    ref={cariRef}
                    type="text"
                    className="text-sm w-full h-[30px] focus:outline-none"
                    placeholder="Cari..."
                ></input>
            </form>
            <div className='flex justify-between mt-5'>
                <div className='relative flex justify-between border border-[#C2A353] appearance-none rounded-xl p-2 px-4 w-[49%]'>
                    <select onChange={pilihJenisKategori} ref={jenisRef} className='appearance-none w-full outline-none' name="" id="">
                        <option value="reset">Semua Jenis</option>
                        {jenis.map((item, i) => (
                            <option key={i} value={item._id}>{item.jenis}</option>
                        ))}
                    </select>
                    <img src={iPanahB} className='absolute top-50 end-2' />
                </div>
                <div className='relative flex justify-between border border-[#C2A353] appearance-none rounded-xl p-2 px-4 w-[49%]'>
                    <select onChange={pilihJenisKategori} ref={kategoriRef} className='appearance-none w-full outline-none' name="" id="">
                        <option value="reset">Semua Kategori</option>
                        {kategoriTampil.map((item, i) => (
                            <option key={i} value={item._id}>{item.kategori}</option>
                        ))}
                    </select>
                    <img src={iPanahB} className='absolute top-50 end-2' />
                </div>
            </div>
            <div className='w-full grid place-items-start h-fit border-b border-t my-2'>
                <p>Daftar Keranjang</p>
                {cart.length > 0 ? cart.map((item, i) => (
                    <button key={i} className='grid w-full place-items-start gap-1 border border-[#BDBDBD] rounded-xl p-4 mt-4 '>
                        <div className='flex justify-between w-full'>
                            <p className='font-semibold'>{item.namaProduk}</p>
                            <p className='text-[#BDBDBD]'>{item.jenis.jenis}</p>
                        </div>
                        <p>Rp {item.hargaJual}</p>
                        <div className="flex gap-4 ms-auto">
                            <button onClick={() => min(item._id)}>
                                <img src={iMin} alt="minus" />
                            </button>
                            <p>{item.jumlah}</p>
                            <button onClick={() => plus(item._id)}>
                                <img src={iPlus} alt="plus" />
                            </button>
                            <button onClick={
                                (e) => {
                                    e.preventDefault()
                                    setCart((prev) => prev.filter(itemx => itemx._id !== item._id))
                                }
                            } className='text-red-600 font-bold'>X</button>
                        </div>
                    </button>

                ))
                    :
                    <p className='w-full my-3 text-center text-[#BDBDBD]'>Belum ada data</p>
                }
            </div>
            <p className='text-start'>Daftar Barang</p>
            {produkTampil.map((item, i) => (
                <button onClick={(e) => {
                    e.preventDefault()
                    klikbarang(item)
                }}
                key={i}
                className={`grid w-full place-items-start gap-1 rounded-xl p-4 mt-4 ${cart.some(itemx => itemx._id == item._id) ? ' border border-[#C2A353]' : ' border border-[#BDBDBD]'}`}>
                    <div className='flex justify-between w-full'>
                        <p className='font-semibold'>{item.namaProduk}</p>
                        <p className='text-[#BDBDBD]'>{item.jenis.jenis}</p>
                    </div>
                    <p>Rp {item.hargaJual}</p>

                </button>
            ))}
            <div className='flex justify-between text-center text-[14px] mt-auto'>
                    <button 
                    onClick={handleDraft}
                    className='border border-[#C2A353] text-[#C2A353] w-[39%] p-4 rounded-xl'>
                        <p>Simpan Draft</p>
                    </button>
                    <button
                    onClick={(e)=>{
                        e.preventDefault()
                        setModal(true)
                    }}
                    className='flex justify-between border rounded-xl bg-gradient-to-l from-[#C2A353] to-[#EAC564] text-white w-[59%] p-4'>
                        <p>{cart.length} Produk</p>
                        <img src={iPan} alt="panah putih" />
                    </button>
                </div>
        </div>
                <Kasir4/>
        </kasirContext.Provider>
    )
}

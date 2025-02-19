import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanah from "../../assets/iconproduk/iPanah.svg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const LaporanPersediaan = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const cari = useRef(null)
    const [tampil, setTampil] = useState([])

    useEffect(() => {
        const fecthData = async () => {
            await axios
                .get("https://api.drnich.co.id/api/pos/produk/kategoriproduk")
                .then((response) => {
                    toast.success('Berhasil Masuk', {
                        autoClose: 1000,
                    })
                    const filter = response.data.filter((item) => item.jenis.jenis == 'produk')
                    setData(filter)
                    setTampil(filter)
                    console.log(filter)
                })
                .catch((error) => {
                    console.error(error)
                    toast.error('Terjadi Kesalahan', {
                        autoClose: 2000,
                    })
                })
        }
        fecthData()
    },[])
    
    const handleSubmit = (id, e) => {
        e.preventDefault()
        toast.success('Berhasil Masuk Ke Laporan Penjualan Detail');
        setTimeout(() => {
            navigate("/pos/LaporanPersediaanDetail/" + id);
        }, 2000);
    };
    
    useEffect(() => {
        setLink('/pos/laporan')
        setNav('Laporan Persediaan')   
        document.title = 'Laporan Persediaan'
    }, [])
    
    const filterData = () => {
        
        const filter = data.filter(
            (data) =>
                data.kategori?.toLowerCase().includes(cari.current.value.toLowerCase())
        )
        setTampil(filter)
    };


return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
        <ToastContainer/>
        <form className="my-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
            <input
                onChange={filterData}
                ref={cari}
                type="text"
                className="text-sm w-full h-[30px] focus:outline-none"
                placeholder="Cari..."
            ></input>
        </form>
        
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start mb-[17px] w-full">
            <p className="">Kategori</p>
        </div>
        
        <div className='flex flex-col gap-[10px]'>
            {tampil.length === 0 ?
                (
                    <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
                        Belum Ada Data!
                    </div>
                )
                :
                (
                    <>
                        {tampil.map((item, i) => (
                            <>
                                <a onClick={(e)=>handleSubmit(item._id, e)} key={i} className='flex justify-between items-center text-center border rounded-xl border-[#BDBDBD] px-[20px] py-[15px]'>
                                    <p>{item?.kategori}</p>
                                    <img src={iPanah} alt="" />
                                </a>
                            </>
                        ))}
                    </>
                )
            }
            
        </div>
    </div>
)
}

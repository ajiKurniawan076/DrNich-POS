import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from '../../App2'
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import axios from 'axios';
import { toast } from 'react-toastify';


export const DaftarStokLimit = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState()
    const [tampil, setTampil] = useState([])
    const cari = useRef(null)

    useEffect(() => {
        const fecthData = async () => {
            await axios
                .get("https://api.drnich.co.id/api/pos/laporan/laporanlimit")
                .then((respone) => {
                    toast.success("Berhasil Masuk", {
                        autoClose : 1000,
                    })
                    setData(respone.data)
                    setTampil(respone.data)
                    console.log(respone.data)
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Terjadi kesalahan', {
                        autoClose: 2000,
                    });
                });
        }
        fecthData();
    }, [])
    
    const filterData = () => {
        const filter = data.filter(
            (data) => 
                data.namaProduk?.toLowerCase().includes(cari.current.value.toLowerCase())
        )
        setTampil(filter)
    }

setLink('/pos/laporan')
setNav('Daftar Stok Limit')   
document.title = 'Daftar Stok Limit'
return (
    <div className='flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto overflow-y-scroll scrollbar-hide px-10'>
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
        <div className='grid place-items-start gap-[15px]'>
            {tampil.length === 0 ?
                (
                    <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
                        Belum Ada Data!
                    </div>
                )
                :
                (
                    <>
                        {tampil?.map((item, i) => (
                            <>
                                <a key={i} href='DetailDaftarStokLimit' className='grid place-items-start w-full'>
                                    <p>{item.namaProduk}</p>
                                    <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                                        <p>Minimum : {item.minStok}</p>
                                        <p>Stok Tersedia : <span className='text-[#EB5757]'>{item.stok}</span></p>
                                    </div>
                                </a>
                                <div className='border border-[#BDBDBD] w-full'></div>
                            </>
                        ))}
                    </>
                )
            }
            
        </div>
    </div>
)
}

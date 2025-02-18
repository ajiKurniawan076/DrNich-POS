import React, { useContext, useEffect, useRef, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iPanah from "../../assets/iconproduk/iPanah.svg";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const LaporanPersediaanDetail = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState([])
    const { _id } = useParams()
    const cari = useRef(null)
    const [tampil, setTampil] = useState([])

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get('https://api.drnich.co.id/api/pos/laporan/laporanpersediaan/' + _id)
                .then((response) => {
                    setData(response.data.produkRes)
                    setTampil(response.data.produkRes)
                    console.log(response.data.produkRes)
                })
        }
        fetch();
    }, [])
    
    useEffect(() => {
        setNav('Laporan Persediaan') 
        setLink('/pos/laporanpersediaan')    
        document.title = 'Laporan Persediaan'
    }, [])
    
    const filterData = () => {
        const filter = data.filter(
            (data) =>
                data.namaProduk?.toLowerCase().includes(cari.current.value.toLowerCase())
        )
        setTampil(filter)
    }

return (
    <div className='flex flex-col px-9 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <form className="my-[20px] flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
            <img src={iCari} alt="Cari" />
            <input
                onChange={filterData}
                ref={cari}
                type="text"
                className="text-sm w-full h-[30px] focus:outline-none"
                placeholder="Cari..."
            />
                </form>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start my-5 w-full">
            <p className="">Produk</p>
        </div>
        {tampil.length === 0 ?
            (
                <div>
                    <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
                        Belum Ada Data!
                    </div>
                </div>
            )
            :
            (
                <>
                    {tampil.map((item, i) => (
                        <>
                            <div key={i} className='grid text-start px-2'>
                                <div className='flex justify-between text-center'>
                                    <p>DN001/14012025/SS (belum ada)</p>
                                    <p>Stok: {item?.stok}</p>
                                </div>
                                <p className='text-[#C2A353]'>{item.namaProduk}</p>
                            </div>
                            <div className='border my-2'></div>
                        </>
                    ))}
                </>
            )
        }
    </div>
)
}

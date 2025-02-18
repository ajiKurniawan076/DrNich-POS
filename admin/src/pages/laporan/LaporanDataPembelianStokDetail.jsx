import React, { useContext, useEffect } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconLaporanPenjualan/iPan.svg";
import { useLocation } from 'react-router-dom';


export const LaporanDataPembelianStokDetail = () => {
    const { setNav, setLink } = useContext(navContext)
    const location = useLocation()
    const { belanja } = location.state || {};
    

    useEffect(() => {
        setLink("/pos/LaporanRingkasanPenjualan");
        setNav('Detail')   
        document.title = 'Detail'
    },[])
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        {/* <button
            onClick={()=>console.log(belanja)}
        >
            belanja test
        </button> */}
        <button className='flex justify-between text-center items-center border rounded-xl border-[#C2A353] p-4'>
            <div className='Grid text-start'>
                <p className='text-[10px] text-[#BDBDBD]'>Supplier</p>
                <p></p>
            </div>
            <div>
                <img src={iPan} alt="panah" />
            </div>
        </button>
        <button className='grid place-items-start gap-2 border rounded-xl border-[#C2A353] p-4 mt-1'>
            <div className='grid place-items-start'>
                <p className='text-[10px] text-[#BDBDBD]'>ID Transaksi</p>
                <p className='text-[#C2A353]'>{/* {belanja.invoice} */}</p>
                
            </div>
            <div className='grid place-items-start gap-1'>
                <p>{belanja?.createdAt.substring(0, 10)} <span>/</span> {belanja?.createdAt.substring(11, 16)}</p>
                <p className='font-semibold'>Pembayaran Rp {belanja?.total.toLocaleString('id-ID')}</p>
            </div>
        </button>
        <button className='grid place-items-start border rounded-xl border-[#C2A353] p-4 mt-1 w-full'>
            <p className='text-[10px] text-[#BDBDBD]'>Detail Pesanan</p>
            {belanja?.belanjaDetail?.map((data, i) => (
                <>
                    <p className='font-semibold my-1'>{data?.produk?.namaProduk}</p>
                    <div className='flex justify-between w-full'>
                        <p>Jumlah</p>
                        <p>{data?.jumlah} Pcs</p>
                    </div>
                    <div className='flex justify-between w-full mt-1'>
                        <p>Harga Satuan</p>
                        <p >Rp {data?.produk?.hargaBeli.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='border border-dashed border-[#BDBDBD] w-full my-5'></div>
                    <div className='flex justify-between w-full mb-[20px]'>
                        <p>Subtotal Produk</p>
                        <p>Rp {data?.totalHarga.toLocaleString('id-ID')}</p>
                    </div>
                    
                </>
            ))}
            <div className='flex justify-between w-full my-1'>
                <p>Total</p>
                <p>Rp {belanja?.total.toLocaleString('id-ID')}</p>
            </div>
        </button>
        <a href={`/pos/StrukPembelianStok/${belanja?._id}`} className='flex justify-between items-center border rounded-xl border-[#C2A353] p-4 mt-1'>
            <p className='text-[14px] text-[#C2A353]'>Lihat Stuk</p>
            <img src={iPan} alt="Panah" />
        </a>
        
    </div>
)
}

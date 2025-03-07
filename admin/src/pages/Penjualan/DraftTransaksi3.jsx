import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iPanah from "../../assets/iconkasir/iPanah.svg";
import iFrame100 from "../../assets/iconkasir/iFrame100.svg";
import iPan from "../../assets/iconkasir/iPan.svg";
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import PelangganModal from './PelangganModal';

export const DraftTransaksi3 = () => {
    const { setNav, setLink } = useContext(navContext)
    const {id} = useParams()
    const [transaksi, setTransaksi] = useState({})
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(()=>{
        const fetch = async() =>{
            await axios.get('https://api.drnich.co.id/api/pos/kasir/transaksi/'+id).then(response => 
                response.status==200 && setTransaksi(response.data)
            )
        }
        fetch()
        setNav('Detail')   
        document.title = 'Detail'
        setLink(-1)
    },[])

    const handleBuy = (e) => {
        e.preventDefault()
        toast.success("Ke Halaman Pembayaran...");
        setTimeout(() => {
                  
                  window.location.href = `/pos/pilihPembayaran/${transaksi._id}`;
                }, 1500);
    }
    useEffect(()=>{
        console.log(transaksi.status)
    },[transaksi.status])

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete('https://api.drnich.co.id/api/pos/kasir/deletetransaksi/'+id).then(response => 
            response.status==200 ? toast.success('Berhasil Menghapus Draft Transaksi') : toast.error("Gagal Menghapus Draft Transaksi")
        )
        setTimeout(() => {
                  
            window.location.href = `/pos/kasir`;
          }, 1500);
    }

    return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full min-h-full pt-8 text-[#454545] text-[12px] onverflow-y-auto'>
        <div className='flex justify-between text-[#BDBDBD]'>
            <p>ID Transaksi</p>
            <p>#{transaksi?.invoice}</p>
        </div>
        <div
            onClick={() => setModalOpen(true)}
            className='flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2'
        >
            <p>{transaksi?.pelanggan?.namaPelanggan}</p>
            <img src={iFrame100} alt="" />
        </div>
        <div className='flex justify-between border border-[#BDBDBD] rounded-xl p-4 mt-2'>
            <p>{transaksi?.promo?.namaPromo}</p>
            <img src={iPanah} alt="panah" />
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] py-0.5 text-start mt-4 w-full">
            <p>Rincian Pembelian</p>
        </div>
        <div className='flex justify-between text-[#BDBDBD] w-full mt-4'>
            <p>ID Transaksi</p>
            <p>#{transaksi?.invoice}</p>
        </div>
        {transaksi?.transaksiDetail?.map((item,i) => (
           <div key={i} className='flex justify-between w-full mt-2'>
           <div className='grid place-items-start w-fitt font-semibold'>
               <p>{item?.produk?.namaProduk}</p>
               <p>{item?.jumlah} x Rp {item?.produk?.hargaJual?.toLocaleString('id-ID')}</p>
           </div>
           <p className='font-semibold'>Rp {(item?.jumlah * item?.produk?.hargaJual).toLocaleString('id-ID')}</p>
       </div>
        ))}
        <div className='border border-dashed border-[#BDBDBD] my-5'></div>
        <div className='flex justify-between w-full'>
            <p>Total</p>
            <p className='font-semibold'>Rp {transaksi?.total?.toLocaleString('id-ID')}</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Potongan</p>
            <p className='font-semibold'>Rp {transaksi?.potongan?.toLocaleString('id-ID')}</p>
        </div>
        <div className='flex justify-between w-full'>
            <p>Total Akhir</p>
            <p className='font-semibold'>Rp {transaksi?.totalAkhir?.toLocaleString('id-ID')}</p>
        </div>
        <div className='flex flex-col gap-[10px] items-end mt-[20px] text-[14px] font-semibold'>
            <button
            onClick={handleBuy}
            className='mt-auto flex justify-between bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[100%] p-4 rounded-xl text-white'>
                Bayar
                <img src={iPan} alt="" />
            </button>
            <button
            onClick={handleDelete}
            className='mt-auto flex justify-between bg-[#BDBDBD] w-[100%] p-4 rounded-xl text-white'>
                Hapus
                <img src={iPan} alt="" />
            </button>
        </div>
        <PelangganModal pelanggan={transaksi?.pelanggan} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
)
}

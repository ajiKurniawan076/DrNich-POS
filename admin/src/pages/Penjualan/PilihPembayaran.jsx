import React, { useContext } from 'react'
import { navContext } from "../../App2"

export const PilihPembayaran = () => {
    const { setNav } = useContext(navContext)

setNav('Pembayaran')   
document.title = 'Pembayaran'
return (
    <div className='flex flex-col px-5 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]'>
        <div className='Grid place-items-start'>
            <p>Total pembayaran</p>
            <p className='font-semibold text-[24px] my-2'>Rp 189.000</p>
            <p>Penerimaan Tunai</p>
        </div>
        <div className='flex items-start border border-[#BDBDBD] rounded-xl w-full px-4 py-2'>
            <p>Rp 189.000</p>
        </div>
        <div className='flex justify-between my-2 w-full text-[#C2A353]'>
            <div className='border border-[#C2A353] rounded-xl p-2 w-[35%]'>
                <p>Kartu Debit</p>
            </div>
            <div className='border border-[#C2A353] rounded-xl p-2 w-[26%]'>
                <p>QRIS</p>
            </div>
            <div className='border border-[#C2A353] rounded-xl p-2 w-[35%]'>
                <p>Transfer</p>
            </div>
        </div>
        <div className='flex justify-end items-end text-[14px] mt-4 w-full h-full'>
            <button className='border border-[#BDBDBD] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white w-full p-4 rounded-xl'>
            Bayar
            </button>
        </div>
    </div>
)
}

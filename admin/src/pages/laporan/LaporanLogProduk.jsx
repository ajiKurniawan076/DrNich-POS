import React, { useContext } from 'react'
import { navContext } from "../../App2"
import iPan from "../../assets/iconproduk/iPan.svg";
import iTgL from "../../assets/iconproduk/iTgl.svg";
import iPanahB from "../../assets/iconmanajement/iPanahB.svg";
import iPanahIjo from "../../assets/iconmanajement/iPanahIjo.svg";
import iPanahMerah from "../../assets/iconmanajement/iPanahMerah.svg";
import iPanahKuning from "../../assets/iconmanajement/iPanahKuning.svg";


export const LaporanLogProduk = () => {
    const { setNav, setLink } = useContext(navContext)


setNav('Log Produk')   
document.title = 'Log Produk'
return (
    <div className='flex flex-col px-5 py-3 gap-1 bg-white w-full h-full pt-8 text-[12px] text-[#454545]'>
        <div className='flex justify-between p-4 border rounded-xl border-[#C2A353]'>
            <div className='grid text-start'>
                <p className='text-[12px]'>PT. BEAUTY</p>
            </div>
            <img src={iPan} alt="Panah" />
        </div>
        <div className='flex justify-between text-[12px] mt-3'>
            <div className='flex gap-3 border rounded-xl border-[#BDBDBD] p-4 w-auto'>
                <img src={iTgL} alt="iTgL" />
                <p>1 Nov 2024 - 30 Nov 2024</p>
            </div>
            <div className='flex gap-16 border rounded-xl border-[#BDBDBD] p-4 w-auto'>
                <p>Semua</p>        
                <img src={iPanahB} alt="iPanahB" />
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahIjo} alt="Panah Ijo" />
                </div>
                <div className='grid text-start'>
                    <p>PT. BEAUTY</p>
                    <p>100 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>1 Nov 2024</p>
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahMerah} alt="Panah Merah" />
                </div>
                <div className='grid text-start'>
                    <p>Diana</p>
                    <p>2 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>1 Nov 2024</p>
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahMerah} alt="Panah Merah" />
                </div>
                <div className='grid text-start'>
                    <p>Ana</p>
                    <p>1 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>1 Nov 2024</p>
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahIjo} alt="Panah Ijo" />
                </div>
                <div className='grid text-start'>
                    <p>PT. BEAUTY</p>
                    <p>100 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>1 Des 2024</p>
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahMerah} alt="Panah Merah" />
                </div>
                <div className='grid text-start'>
                    <p>Dina</p>
                    <p>1 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>1 Des 2024</p>
            </div>
        </div>
        <div className='flex justify-between items-center text-[12px] border rounded-xl border-[#BDBDBD] px-4 py-2 mt-3 w-auto'>
            <div className='flex items-center gap-3'>
                <div>
                    <img src={iPanahKuning} alt="Panah Kuning" />
                </div>
                <div className='grid text-start'>
                    <p>Pengurangan Stok</p>
                    <p>10 pcs</p>
                </div>
            </div>
            <div className='text-[#BDBDBD]'>
                <p>30 Okt 2024</p>
            </div>
        </div>
    </div>
)
}
import React, { useState, useContext, useRef } from 'react';
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";

const PelangganModal = ({ pelanggan, open, onClose, setPelangganTerpilih }) => {
    if (!open) return null;

    const [filterPelanggan, setFilterPelanggan] = useState([]);
    const cariRef = useRef(null);

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = pelanggan.filter(item =>
            item.namaPelanggan.toLowerCase().includes(searchTerm)
        );
        setFilterPelanggan(filtered);
    };

    return (
        <div className='fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='flex mx-auto md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] flex-col px-5 py-8 gap-1 w-[100%] bg-white max-w-[500px] min-h-full h-fit pt-8 text-[#454545] text-[12px] mt-[75px] overflow-auto'>
                <form className="mt-5 flex gap-2 h-[42px] border border-[#BDBDBD] rounded-xl items-center px-2">
                    <img src={iCari} alt="Cari" />
                    <input
                        ref={cariRef}
                        onChange={handleFilter}
                        type="text"
                        className="text-sm w-full h-[30px] focus:outline-none"
                        placeholder="Cari..."
                    />
                </form>

                {(filterPelanggan.length > 0 ? filterPelanggan : pelanggan)?.map((item, i) => (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setPelangganTerpilih(item);
                            onClose();
                        }}
                        key={i}
                        className='flex justify-between text-center items-center border border-[#BDBDBD] p-4 rounded-xl mt-5'
                    >
                        <div className='grid text-start gap-1'>
                            <p className='font-semibold'>{item.namaPelanggan}</p>
                            <p className='text-[#BDBDBD]'>{item.nomorTelepon}</p>
                        </div>
                    </button>
                ))}

                <div className='flex items-end mt-auto'>
                    <button
                        onClick={onClose}
                        className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg'
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PelangganModal;

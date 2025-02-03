import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { navContext } from "../../../App2"
const LatihanAddSuplayer = () => {
    const [datax, setData] = useState([])
    const { setNav } = useContext(navContext)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api.drnich.co.id/api/pos/user/supplier').then(
                (response) => setData(response.data)
            )
        }
        fetchData()

        setNav('Latihan')
    }, [])

    console.log(datax)


    document.title = 'Latihan'
    return (

        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
            <div className="w-full mb-5 h-8 border border-red-700 shadow-lg rounded-lg flex items-center justify-center ">
                <h1 className="text-[12px] font-bold">ini merupakan halaman belajar lihat data suplayer</h1>
            </div>
            {datax.length === 0 ?
                <div className="h-full w-full flex flex-col items-center justify-center font-semibold text-[14px]">Data Belum Ada Bro</div>
                :
                <div className="grid grid-cols-1 gap-2 ">
                    {
                        datax.map((data, i) => (
                            <div className="border border-red-700 shadow-lg rounded-lg p-2 flex flex-col  items-start text-[14px]" key={i}>
                                <span className="w-full h-5 shadow-lg rounded border border-red-700 text-start px-2 bg-red-700 text-white">Detail Perusahaan</span>
                                <p className="font-bold">Nama Perusahaan</p>
                                <p>{data.namaPerusahaan} </p>
                                <p className="font-bold">Alamat</p>
                                <p>{data.alamat}</p>
                                <p className="font-bold">Nama Kontak</p>
                                <p>{data.namaKontak}</p>
                                <p className="font-bold">NomorTelepon</p>
                                <p>{data.nomorTelepon}</p>
                                <span className="w-full h-5 shadow-lg rounded border border-red-700 text-start px-2 bg-red-700 text-white">Data Rekening</span>
                                <p className="font-bold">nama Rekening</p>
                                <p>{data.namaRekening}</p>
                                <p className="font-bold">Nomor Rekening</p>
                                <p>{data.nomorRekening}</p>
                                <p className="font-bold">Bank</p>
                                <p> {data.bank}</p>
                            </div>
                        ))
                    }

                </div>
            }



        </div>

    )
}

export default LatihanAddSuplayer
import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { data, Link } from "react-router-dom"
import { navContext } from "../../../App2"


export const Layanan = () => {

    const { setNav } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const dummyData = [
            { id: 1, name: "Facial Gold Acne", kategori: "Fasial Series", harga: "70.000", durasi: "1 jam 20 menit", deskripsi_detail: "ini merupakan deskrisi detail 1", deskripsi_kartu: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos facere incidunt exercitationem praesentium eligendi quaerat impedit nemo velit nisi quod!" },
            { id: 2, name: "facial brightening", kategori: "Facial Brightening", harga: "100.000", durasi: "5 jam 20 menit", deskripsi_detail: "ini merupakan deskrisi detail 2", deskripsi_kartu: "ini merupakan deskripsi kartu 1" },
        ];
        setdatax(dummyData)
        // fetch("/marketing.json").then(
        //     (response) => response.json()
        // ).then((data) => (setdatax(data)
        // ))
        setNav('Layanan')
    }, [])


    document.title = 'Layanan'
    return (

        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
            <div className="flex flex-col justify-between w-full h-full py-3 px-3">
                {/* Jika data kosong */}
                {datax.length === 0 ? (
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
                        Belum Ada Data Layanan
                    </div>
                ) : (
                    /* Jika data ada */
                    <div className="flex flex-col gap-2 w-full h-full items-center justify-start">
                        {datax.map((data) => (
                            <Link
                                to={{
                                    pathname: `/layanandetail/${data.id}`
                                }}
                                state={data}
                                className="w-full border flex justify-between items-center rounded-xl px-3 py-3"
                                key={data.id}
                            >
                                <ul className="flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">{data.name}</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* Tombol Tambah Layanan */}
                <Link
                    to={{ pathname: "/layananadd" }}
                    className="flex justify-center items-center cursor-pointer gap-2 h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px]">
                    <AiFillPlusCircle size={20} /> Tambah Layanan
                </Link>
            </div>
        </div>
    )
}

export default Layanan
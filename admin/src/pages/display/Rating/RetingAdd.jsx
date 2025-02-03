import { useRef, useState } from "react"
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai"
import { useContext, useEffect } from "react"
import { navContext } from "../../../App2"
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";

import axios from "axios"
import { useNavigate } from "react-router-dom"

export const RetingAdd = () => {
    const { setNav } = useContext(navContext)
    const navigate = useNavigate()
    useEffect(() => {
        setNav('Tambah Reting')
    }, [])



    const handleSubmit = (e) => {

    }

    document.title = 'Tambah Reting'
    const [supstat, setsupstat] = useState(false)
    return (
        <form
            className="flex flex-col px-0 p-3 gap-2 bg-white w-full min-h-screen justify-between"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-1 px-3 flex-grow">
                <div className="flex flex-col">
                    <label className="text-start text-[#454545] text-[12px]">Upload Foto</label>
                    <div className="flex gap-6">
                        <img src={gkategori} alt=" " className="h-[115px] w-[115px] rounded shadow-lg border" />
                        <div className="flex flex-col items-start text-[10px]">
                            <p className="text-[#454545] mb-3">IMG0973-1092-21.jpg</p>
                            <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                                <input
                                    type="File"
                                    className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                                />
                            </div>
                            <p className="text-start text-[10px] text-[#BDBDBD]">
                                *Upload foto dengan format .jpg .png maksimal ukuran 100mb
                            </p>
                        </div>
                    </div>
                </div>
                <label className="text-[#454545] text-start text-[12px]">Nama Ketegori</label>
                <input
                    type="text"
                    placeholder="Contoh: diana"
                    className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
                />
                <label className="text-[#454545] text-start text-[12px]">Review</label>
                <textarea
                    name=""
                    id=""
                    cols="auto"
                    rows="5"
                    className=" border rounded-lg text-[12px] p-2"
                    placeholder="Review"
                ></textarea>
            </div>
            <div className="mt-auto w-full ">
                <button
                    type="submit"
                    className="flex justify-center items-center w-full h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg"
                >
                    Simpan
                </button>
            </div>
        </form>


    )
}

export default RetingAdd
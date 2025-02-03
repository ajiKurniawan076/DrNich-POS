import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { Link } from "react-router-dom"
import { navContext } from "../../../App2"

export const Sertifikat = () => {

    const { setNav } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const dammyData = [
            { id: 1, nama: "sertifikat Sinta.jpg" }
            , { id: 2, nama: "sertifikat Mai Mai.jpg" }
        ];
        setdatax(dammyData)

        // fetch("/marketing.json").then(
        //     (response) => response.json()
        // ).then((data) => (setdatax(data)
        // ))
        setNav('Sertifikat')
    }, [])


    document.title = 'Sertifikat'
    return (

        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">

            <div className="flex flex-col justify-between w-full h-full py-3 px-3">

                {datax.length === 0 ?
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data sertifikat</div>
                    :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data) => (
                            <Link to={{
                                pathname: '/sertifikatDetail'
                            }} className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={data.id}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">{data.nama}</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}

                    </div>

                }

                <Link
                    to={{ pathname: "/displaysertifikat" }}
                    className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "><AiFillPlusCircle size={20} /> Tambah Sertifikat</Link>
            </div>
            <button className="w-10 h-10 bg-black/300 text-white" onClick={() => { setdatax([]) }}>RESET</button>
        </div>
    )
}

export default Sertifikat
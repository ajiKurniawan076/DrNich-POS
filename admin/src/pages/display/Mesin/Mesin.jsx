import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { Link } from "react-router-dom"
import { navContext } from "../../../App2"
import axios from "axios"
const Mesin = () => {
  const { setNav, setLink } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const faching = async() => {
          await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllMesin`).then(
            (response) => setdatax(response.data)
          )
        }
        faching()
        setNav('Mesin')
    }, [])
  document.title = 'Mesin'  
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">

            <div className="flex flex-col justify-between w-full h-full py-3 px-3 overflow-auto">

                {datax.length === 0 ?
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data sertifikat</div>
                    :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data,index) => (
                            <Link to={`/pos/MesinDetail/${data._id}`}
                             className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={index}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]"></li>
                                    <img src={data.foto} alt="" className="h-[100px] object-cover "/>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}

                    </div>

                }   
            </div>
            <Link
                    to={{ pathname: "/pos/MesinTambah" }}
                    className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "><AiFillPlusCircle size={20} /> Tambah Mesin</Link>
        </div>
  )
}

export default Mesin


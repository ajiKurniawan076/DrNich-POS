import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { data, Link } from "react-router-dom"
import { navContext } from "../../../../App2"
import axios from "axios"
const TipeKulit = () => {
    const { setNav, setLink } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const fachingData = async() => {
            await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAlltipeKulit`).then((response) => setdatax(response.data))
        }
        fachingData()

        setNav('Tipe Kulit')
    }, [])
    console.log(datax)

    document.title = 'Tipe Kulit'
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
            <div className="flex flex-col justify-between w-full gap-3 h-full py-3 px-3">
                <form className="mt-5 flex h-[50px] gap-3 border border-black rounded-xl items-center px-2">
                    <AiOutlineSearch size={20} />
                    <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
                </form>
                {datax.length === 0 ?
                    <div className="flex flex-col w-full h-full items-center  justify-center text-black/40">Belum Ada Data Kategori Produk</div>
                    :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data) => (
                            <Link to={{
                                pathname: `/pos/TipeKulitDetail/${data._id}`,
                            }}
                                state={data}
                                className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={data._id}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">{data.name}</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}

                    </div>
                }

                <Link
                    to={{ pathname: '/pos/TipeKulitTambah' }}
                    className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "><AiFillPlusCircle size={20} /> Tambah Tipe Kulit</Link>
            </div>
            <button className="w-10 h-10 bg-black/300 text-white" onClick={() => { setdatax([]) }}>RESET</button>
        </div>
  )
}

export default TipeKulit

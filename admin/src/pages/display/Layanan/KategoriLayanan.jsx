import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { data, Link } from "react-router-dom"
import { navContext } from "../../../App2"

export const KategoriLayanan = () => {

    const { setNav, setLink } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const dummyData = [
            { id: 1, name: "facial Series", deskripsi: "Facial series adalah rangkaian perawatan wajah yang dirancang untuk memberikan solusi komprehensif bagi berbagai kebutuhan kulit. Setiap sesi dalam facial series biasanya bertujuan untuk memperbaiki kesehatan dan penampilan kulit secara bertahap, dengan fokus pada aspek yang berbeda di setiap sesi." },
            { id: 2, name: "laser DPL", deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, labore!" }
        ]
        setdatax(dummyData)

        // fetch("/marketing.json").then(
        //     (response) => response.json()
        // ).then((data) => (setdatax(data)
        // ))
        setNav('Layanan Kategori')
    }, [])


    document.title = 'Layanan Kategori'
    return (

        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">

            <div className="flex flex-col justify-between w-full h-full py-3 px-3">


                {datax.length === 0 ? (
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data Ketegori Layanan</div>
                ) :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data) => (
                            <Link to={{
                                pathname: `/kategoridetail/${data.id}`,
                            }}
                                state={data}
                                className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={data.id}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">{data.name}</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}
                    </div>
                }
                <Link
                    to={{ pathname: '/kategoriAdd' }}
                    className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "><AiFillPlusCircle size={20} /> Tambah Kategori </Link>
            </div>
        </div >
    )
}

export default KategoriLayanan
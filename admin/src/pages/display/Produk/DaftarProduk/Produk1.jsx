import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { Link } from "react-router-dom"
import { navContext } from "../../../../App2"

export const Produk1 = () => {

    const { setNav } = useContext(navContext)
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const dummyData = [
            { id: 1, nama: "Serum Retinol 10%", kategoriproduk: "skincare", tipeproduk: "Serum", tipekulit: "Berminyak", harga: "70.000", carapakai: "cara pakai Lorem ipsum dolor sit amet, consectetur adipiscing elit.", manfaat: "manfaat Lorem ipsum dolor sit amet, consectetur adipiscing elit.", deskripsi: "deskripsi Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { id: 2, nama: "Serum Retino 5%", kategoriproduk: "skincare", tipeproduk: "Serum", tipekulit: "kering", harga: " 100.000", carapakai: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", manfaat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        ]
        setdatax(dummyData)
        // fetch("/marketing.json").then(
        //     (response) => response.json()
        // ).then((data) => (setdatax(data)
        // ))
        setNav('Produk')
    }, [])


    document.title = 'Produk'
    return (

        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">

            <div className="flex flex-col justify-between w-full h-full py-3 px-3">

                {datax.length === 0 ?
                    <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data data Produk</div>
                    :
                    <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
                        {datax.map((data) => (

                            <Link to={{
                                pathname: `/detail2/${data.id}`

                            }}
                                state={data}
                                className="w-full border flex  justify-between items-center rounded-xl px-3 py-3" key={data.id}>
                                <ul className=" flex flex-col place-items-start">
                                    <li className="text-[12px] font-medium text-[#454545]">{data.nama}</li>
                                </ul>
                                <AiOutlineRightCircle size={20} />
                            </Link>
                        ))}
                    </div>
                }
                <Link
                    to={{ pathname: '/tambahproduk' }}
                    href='' className="flex justify-center items-center gap-2 h-[44px]  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "><AiFillPlusCircle size={20} /> Tambah Produk</Link>
            </div>
        </div>
    )
}

export default Produk1
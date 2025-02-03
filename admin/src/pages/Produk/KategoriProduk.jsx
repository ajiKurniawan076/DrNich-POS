import { useContext, useEffect, useState } from "react"
import { AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { navContext } from "../../App2"
import { Link } from "react-router-dom"

export const KategoriProduk = () => {
    const[kategori, setKategori] = useState([])
    const {setNav, setSort} = useContext(navContext)
    useEffect(()=>{
        fetch("/kategoriproduk.json").then(
            (response) => response.json()
          ).then((data)=>(setKategori(data)
          ))
      setNav('Kategori Produk')
      setSort(true)
    },[])
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen  overflow-auto overflow-y-scroll scrollbar-hide px-7">
    <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
      <AiOutlineSearch size={20}/>
      <input type="text" className="text-sm w-full focus:outline-none" placeholder="Cari..."></input>
    </form>
    <div className="flex flex-col justify-between w-full h-full py-3 px-3">
      {kategori=={}? 
      
      
      <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data Supplier!</div>
      :
      <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
      {kategori.map((kat)=>(
        <Link to={{
          pathname: `kategoridet/${kat.Kategori}`
        }} className="w-full text-[#454545] border flex justify-between items-center rounded-xl border-yellow-600/30 px-[20px] py-[15px]"  key={kat.id}>
        <ul className=" flex flex-col place-items-start font-medium">
          <li>{kat.jenis}</li>
          <li>{kat.Kategori}</li>
        </ul>
        <AiOutlineRightCircle size={20}/>
        </Link>
      ))}
      
      </div>
      }
      
      <a href='addsupplier' className="flex justify-center items-center gap-2 h-[30px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl"><AiFillPlusCircle size={20}/> Tambah Supplier</a>
    </div>
  <button className="w-10 h-10 bg-black/300 text-white" onClick={()=>{setKategori([])}}>RESET</button>
  </div>
  )
}

import { useContext, useEffect, useState } from "react"
import { AiFillCalendar, AiFillPlusCircle, AiOutlineRightCircle, AiOutlineSearch } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"
import { navContext } from "../../App2"

export const PelangganTransaksi = () => {

      const {setNav} = useContext(navContext)
      const [datax, setdatax] = useState([])
      const {id} = useParams()
      useEffect(()=>{
        fetch("/transaksipelanggan.json").then(
          (response) => response.json()
        ).then((data)=>{
          const Pelanggan = data.filter((ther)=>ther.iduser ===id)
          setdatax(Pelanggan)
          console.log(Pelanggan)
      })
        setNav('Transaksi Pelanggan')
      },[])
    
    
      document.title = 'Transaksi Pelanggan'
  return (
    
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <button onClick={console.log(datax)}>asd</button>
      <form className="mt-5 flex gap-2 h-[42px] mx-3 border border-black rounded-xl items-center px-2">
        <AiFillCalendar size={20}/>
        <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Tanggal di sini"></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        {datax=={}? 
        
        
        <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data Terapis</div>
        :
        <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
        {datax.map((data)=>{
          <Link to={{
            pathname: `/pelanggandetail/${data.id}`
          }} className="w-full border flex justify-between items-center rounded-xl border-yellow-600/30 px-3 py-3"  key={data.id}>
          <ul className=" flex flex-col place-items-start font-medium">
            <li>{data.id}</li>
            <li className="text-black/30 font-medium">{data.tanggal}</li>
          </ul>
          <AiOutlineRightCircle size={20}/>
          </Link>
})}
        
        </div>
        }
        
        <a href='addpelanggan' className="flex justify-center items-center gap-2 h-[30px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl"><AiFillPlusCircle size={20}/> Tambah Pelanggan</a>
      </div>
    <button className="w-10 h-10 bg-black/300 text-white" onClick={()=>{setdatax([])}}>RESET</button>
    </div>
  )
}

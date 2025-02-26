import { useContext, useEffect, useRef, useState } from "react"
import { navContext } from "../../App2"
import { AiOutlineSearch } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"
import DatePicker from "react-datepicker"
import iTgl from '../../assets/iconproduk/iTgl.svg'
import { toast } from "react-toastify"
import axios from "axios"


export const RiwayatSupplier = () => {
  const {setNav, setLink} = useContext(navContext)
  const [trans, setTrans] = useState([])
  const [button, setButton] = useState(true)
  const [button2, setButton2] = useState(true)
  const {id} = useParams()
  const [startDate, setStartDate] = useState(new Date("2025-01-01T00:00:00Z"));
  const [endDate, setEndDate] = useState(new Date().toISOString().split('.')[0] + 'Z');

  const datePickerRef = useRef(null); // Create a ref for the DatePicker
      
      const handleButtonClick = (e) => {
          e.preventDefault()
          if (datePickerRef.current) {
              datePickerRef.current.setFocus(); // Programmatically focus and open DatePicker
              setButton(false)
              }
      };
      
      const datePickerRef2 = useRef(null); // Create a ref for the DatePicker
      
      const handleButtonClick2 = (e) => {
          e.preventDefault()
          if (datePickerRef2.current) {
              datePickerRef2.current.setFocus(); // Programmatically focus and open DatePicker
              setButton2(false)
              }
      };

    useEffect(()=>{
        const fetch = async () => {
          const data = {dari : startDate, sampai : endDate, id:id}
          await axios.post('https://api.drnich.co.id/api/pos/user/supplier/riwayattransaksi/', data).then(
            response => 
            {
              if (response.status==200)
              {
                toast.success('Berhasil Memperoleh Data')
                setTrans(response.data)
                console.log(response.data)
              }
            }
          ).catch(e => {
            toast.error('Gagal Memperoleh Data')
          })
        }
        fetch()
          setLink('/pos/supplier')
          setNav('Riwayat')
    },[startDate, endDate])
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide p-7">
      <div className='Grid place-items-start mt-4 px-3'>
        <p className="font-semibold">Masa Berlaku</p>
          <div className='flex flex-col gap-2 justify-between w-full mt-1 text-center '>
            <p>Dari :</p>
            <div className="w-full relative flex justify-center items-center border border-gray-300 rounded-xl p-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                ref={datePickerRef} // Attach the ref
                className="w-full outline-0 text-center" // Completely hide the DatePicker input
                popperClassName="custom-datepicker-popper"
              />
                {/* Button to trigger DatePicker */}
                <div className={`absolute h-full px-4 top-2 start-0 w-full ${button?'':'opacity-0'}`}>
                  <button
                    onClick={handleButtonClick}
                    className="flex text-[#BDBDBD] w-full items-center justify-between space-x-2"
                >
                    Tanggal
                    <img src={iTgl} alt="Calendar Icon" className="w-6 h-6" />
                  </button>
                </div>
          </div>
          <p>Sampai :</p>
          <div className="w-full relative flex justify-center items-center border border-gray-300 rounded-xl p-3">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              ref={datePickerRef2} // Attach the ref
              className="w-full outline-0 text-center" // Completely hide the DatePicker input
              popperClassName="custom-datepicker-popper"
            />
              {/* Button to trigger DatePicker */}
            <div className={`absolute h-full px-4 top-2 start-0 w-full ${button2?'':'opacity-0'}`}>
            <button
              onClick={handleButtonClick2}
              className="flex text-[#BDBDBD] w-full items-center justify-between space-x-2"
            >
              Tanggal
              <img src={iTgl} alt="Calendar Icon" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="text-start p-2 font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
      <span className="ms-2">Informasi Rekening</span>
    </div>
    <div className="flex flex-col justify-between w-full h-full py-3 px-3">
      {trans=={}? 
      
      
      <div className="flex flex-col w-full h-full items-center justify-center text-black/40">Belum Ada Data Supplier!</div>
      :
      <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
      {trans.map((pro, i)=>(
        <div className="w-full flex flex-col justify-between items-center gap-[15px]" key={i}>
          {pro.belanjaDetail.map((prox,j) => (
          <Link to={{pathname: `/transdetail/${pro._id}`}}className="w-full text-[#454545] flex justify-between items-center rounded-xl border border-[#C2A353] px-[20px] py-[15px]" key={j}>
            <>
            <ul className=" flex flex-col place-items-start">
              <li className="font-semibold">{prox.produk.namaProduk}</li>
              <li>Rp. {prox.totalHarga}</li>
            </ul>
                <p className="text-sm text-[#C2A353] h-full">+{prox.jumlah} Stok Pcs</p>
          </>  
          </Link>
          ))}
        </div>
      ))}
      
      </div>
      }
      
    </div>
  </div>
  )
}

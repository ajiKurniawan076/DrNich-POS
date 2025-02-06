import { useRef, useState } from "react"
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai"
import { useContext, useEffect } from "react"
import { navContext } from "../../App2"
import ktp from "../../assets/ktp.svg";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";

export const KategoriProdukAdd = () => {

  const { setNav, setLink } = useContext(navContext)
  const [jenis, setJenis] = useState([])
  const [select, setSelected] = useState("")
  useEffect(() => {
    const fetchJenis = async () => {
      await axios.get('https://api.drnich.co.id/api/pos/produk/jenisproduk').then(
        response => {
          setJenis(response.data)
          console.log(response.data)
        }
      )
    }
    fetchJenis()
    setNav('Tambah Kategori Produk')
    setLink('/pos/kategoriproduks')
  }, [])


  const navigate = useNavigate()
  const jenisRef = useRef(null)
  const kategoriRef = useRef(null)
  const [isFilled, setIsFilled] = useState(false)

  const checkFormFilled = () => {
    if (
      jenisRef.current?.value &&
      kategoriRef.current?.value
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      jenis: jenisRef.current.value,
      kategori: kategoriRef.current.value
    }
    try {
      const response = await axios.post(
        'https://api.drnich.co.id/api/pos/produk/kategoriproduk',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
    
      if (response.status === 200) {
        toast.success("Kategori produk berhasil ditambahkan!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = "/pos/kategoriproduks";
        }, 1500);
      } else {
        toast.error("Gagal menambahkan kategori produk");
      }
    } catch (error) {
      console.error("Error saat menambahkan kategori produk:", error);
      toast.error("Terjadi kesalahan saat menambahkan kategori produk");
    }
    

  }
  document.title = 'Tambah Marketing'
  const [supstat, setsupstat] = useState(false)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <div className="flex flex-col px-3 h-full">
        <label className="text-start font-semibold mb-[5px]">Nama Jenis Produk</label>
        <select
          ref={jenisRef}
          name="options"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
          onChange={checkFormFilled}
          id="jenis"
        >
          <option value="" className="text-gray-300" selected disabled>
            Pilih Jenis Produk
          </option>
          {jenis.map((item, i) => (
            <option key={i} value={item._id}>{item.jenis}</option>
          ))}
        </select>
        <label className="text-start font-semibold mb-[5px]">Nama Kategori Produk</label>
        <input ref={kategoriRef} type='text' placeholder='Contoh : Lotion / Sunscreen' className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
          onChange={checkFormFilled}></input>
      </div>
      <div className="flex items-end mt-auto w-full h-full px-3">
        <button
          type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
      <ToastContainer/>
    </form>
  )
}

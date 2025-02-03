import { useRef, useState } from "react"
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai"
import { useContext, useEffect } from "react"
import { navContext } from "../../App2"
import ktp from "../../assets/ktp.svg";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const KategoriProdukAdd = () => {

  const { setNav } = useContext(navContext)
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
    setNav('Tambah Marketing')
  }, [])


  const navigate = useNavigate()
  const jenisRef = useRef(null)
  const kategoriRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      jenis: jenisRef.current.value,
      kategori: kategoriRef.current.value
    }
    axios.post('https://api.drnich.co.id/api/pos/produk/kategoriproduk', data).then(
      response => response.status == 200 && navigate('../kategoriproduks')
    )

  }
  document.title = 'Tambah Marketing'
  const [supstat, setsupstat] = useState(false)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-0 py-3 gap-1 justify-between bg-white w-full h-full">
      <div className="flex flex-col gap-1  px-3">
        <label className="text-start font-semibold text-sm">Nama Jenis Produk</label>
        <select
          ref={jenisRef}
          name="options"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[30px]"
          id="jenis"
        >
          <option value="" className="text-gray-300" selected disabled>
            Pilih Jenis Produk
          </option>
          {jenis.map((item, i) => (
            <option key={i} value={item._id}>{item.jenis}</option>
          ))}
        </select>
        <label className="text-start font-semibold text-sm">Nama Kategori Produk</label>
        <input ref={kategoriRef} type='text' placeholder='Contoh : Lotion / Sunscreen' className="px-2 border text-sm border-black/30 rounded-xl h-[30px]"></input>
      </div>
      <button type="submit" className="bg-gray-800/50 text-white mx-5 rounded-xl">Simpan</button>
    </form>
  )
}

import { useRef, useState } from "react"
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai"
import { useContext, useEffect } from "react"
import { navContext } from "../../App2"
import ktp from "../../assets/ktp.svg";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const PelangganAnd = () => {
  const { setNav, setLink } = useContext(navContext)
  const navigate = useNavigate()
  useEffect(() => {
    setNav('Tambah Pelanggan')
    setLink('/pos/pelanggan')
  }, [])

  const namaPelangganRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const genderRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);

  const checkFormFilled = () => {
    if (
      namaPelangganRef.current?.value &&
      nomorTeleponRef.current?.value &&
      genderRef.current?.value &&
      alamatRef.current?.value &&
      keteranganRef.current?.value
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      namaPelanggan: namaPelangganRef.current.value,
      poin: 0,
      nomorTelepon: nomorTeleponRef.current.value,
      gender: genderRef.current.value,
      alamat: alamatRef.current.value,
      keterangan: keteranganRef.current.value,
    }
    console.log(data)
    axios.post("https://api.drnich.co.id/api/pos/user/pelanggan", data).then(
      response => {
        response.status == 200 && navigate('../pelanggan')
      })
  }

  document.title = 'Tambah Pelanggan'
  const [supstat, setsupstat] = useState(false)
  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-[20px] px-3 h-full">
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Nama Pelanggan</label>
          <input
            ref={namaPelangganRef}
            type="text"
            placeholder="Contoh : Aji"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
            />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Poin</label>
          <input
            type="text"
            placeholder="0"
            disabled
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Nomor Telepon</label>
          <input
            ref={nomorTeleponRef}
            type="text"
            placeholder="Contoh : 0892323232"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Jenis Kelamin</label>
          <select
            ref={genderRef}
            name="options"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px]"
            id="Gender"
            onChange={checkFormFilled}
          >
          <option value="" className="text-gray-300" selected disabled>
            Pilih Jenis Kelamin
          </option>
          <option value="pria">Pria</option>
          <option value="wanita">Wanita</option>
        </select>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Alamat</label>
          <input
            ref={alamatRef}
            type="text"
            placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
          <input
            ref={keteranganRef}
            type="text"
            placeholder="Contoh : Karyawan"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          />
        </div>
      </div>
      <div className="flex justify-end items-end mt-auto w-full h-full px-3">
        <button type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
    </form>
  )
}

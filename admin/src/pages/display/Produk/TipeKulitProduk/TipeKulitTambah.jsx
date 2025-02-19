import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";

import gkt from "../../../../assets/iconDisplay/produk/gkt.svg?url";
// import gkt from "../../../../assets/iconDisplay/produk/gkt.svg?url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TipeKulitTambah = () => {
    const { setNav, setLink } = useContext(navContext);
  const namaKategoriRef = useRef(null);
  const [namax,setnamax] = useState("")

  useEffect(() => {
    setNav("Tambahkan Tipe Kulit");
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!namaKategoriRef.current.value) {
        toast.error("Semua bidang harus diisi!");
        return;
      }
  
      const fdata = new FormData();
      fdata.append("nama", namaKategoriRef.current.value);
  
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/createtipeKulit`,
          fdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          toast.success("Berhasil menambahkan Tipe Kulit");
          setTimeout(() => {
            navigate("/pos/TipeKulit");
          }, 3000);
        }
      } catch (error) {
        console.error(
          error.response?.data?.message ||
            "Gagal menambahkan Tipe Kulit, coba lagi!"
        );
        toast.error(
          error.response?.data?.message ||
            "Gagal menambahkan Tipe Kulit, coba lagi!"
        );
      }
  };

  const handleInput = (e) =>{
    e.preventDefault()
    setnamax(namaKategoriRef.current.value)
  }

  document.title = "Tambahkan Tipe Kulit";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col justify-between px-0 py-3 gap-1 bg-white w-full min-h-screen"
      onSubmit={handleSubmit}>
      {/* Konten Utama */}
      <div className="flex flex-col gap-4 px-3">
        <label className="text-[#454545] text-start text-[12px]">
          Nama Tipe Kulit
        </label>
        <input
        onChange={handleInput}
          ref={namaKategoriRef}
          type="text"
          placeholder="Contoh : Kulit Berminyak"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>
      {/* Tombol Simpan */}
      <button
    disabled={!namax}
        type="submit"
        className={`
            ${!namax?"bg-[#cdcdcd]" : " bg-gradient-to-r from-[#EAC564] to-[#C2A353]"}
            flex justify-center items-center h-[44px] text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  )
}

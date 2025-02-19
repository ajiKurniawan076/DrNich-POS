import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";
import gkt from "../../../../assets/iconDisplay/produk/gkt.svg?url";
// import gkt from "../../../../assets/iconDisplay/produk/gkt.svg?url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export const TipeKulitEdit = () => {
  const {id} = useParams()
  const [datax,setdatax] = useState("")
  const { setNav, setLink } = useContext(navContext);
  const namaKategoriRef = useRef(null);
  const [dataIn,setdataIn] = useState("")

  useEffect(() => {
    const fetchingData = async () => {
          await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/gettipeKulitById/${id}`).then((response) => setdatax(response.data))
        }
    fetchingData();
    setNav("Tambah Tipe Kulit");
  }, [id,setNav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: namaKategoriRef.current.value,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/edittipeKulit/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Tipe Kulit berhasil diupdate!");
        setTimeout(() => {
          navigate(`/pos/TipeKulitDetail/${id}`);
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Gagal mengupdate tipe kulit, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "Gagal mengupdate tipe kulit, coba lagi!"
      );
    }
  };

  const handleInput = () =>{
    setdataIn(namaKategoriRef.current.value)
  }

  document.title = "Tambahkan Tipe Kulit";
  return (
    <form
      className="flex flex-col justify-between px-0 py-3 gap-1 bg-white w-full min-h-screen"
      onSubmit={handleSubmit}>
      {/* Konten Utama */}
      <div className="flex flex-col gap-4 px-3">
        <label className="text-[#454545] text-start text-[12px]">
          Tipe Kulit
        </label>
        <input
          onChange={handleInput}
          ref={namaKategoriRef}
          type="text"
          placeholder={datax.name}
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>
      {/* Tombol Simpan */}
      <button
        disabled={!dataIn}
        type="submit"
        className={`
            ${!dataIn?"bg-[#cdcdcd]" : " bg-gradient-to-r from-[#EAC564] to-[#C2A353]"}
            flex justify-center items-center h-[44px] text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  )
}

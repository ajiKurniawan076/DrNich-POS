import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProdukAddTipe = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const namaTipeRef = useRef(null);
  const [produkx, setProdukx] = useState("");

  const handleInput = () => {
    const namaProduk = namaTipeRef.current.value;
    // console.log(namaProduk);
    setProdukx(namaProduk);
  };
  useEffect(() => {
    setNav("Tambah Tipe Produk");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!namaTipeRef.current.value) {
      toast.error("semua bidang harus di isi!");
      return;
    }
    const fdata = {
      name :  namaTipeRef.current.value
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/tambahproductType`,
        fdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("berhasil menambahkan Tipe produk");
        setTimeout(() => {
          navigate("/pos/produktipe");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "gagal menambahkan Tipe Produk, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "gagal menambahkan Tipe Produk, coba lagi!"
      );
    }
  };

  document.title = "Tambah Tipe Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col justify-between bg-white min-h-screen px-3 py-3 gap-3 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <label className="text-[#454545] text-start text-[12px]">
          Nama Tipe Produk
        </label>
        <input
          onChange={(e) => {
            e.preventDefault();
            handleInput();
          }}
          ref={namaTipeRef}
          type="text"
          placeholder="Serum"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>

      <button
        disabled={!produkx}
        type="submit"
        className={`
        ${
          !produkx
            ? "bg-[#DCDCDC]"
            : "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
        }
        flex justify-center items-center h-[44px]  text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  );
};

export default ProdukAddTipe;

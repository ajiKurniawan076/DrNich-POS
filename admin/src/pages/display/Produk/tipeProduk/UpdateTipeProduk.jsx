import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateTipeProduk = () => {
  const { setNav, setLink } = useContext(navContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const namaTipeRef = useRef(null);
  const [produkx, setProdukx] = useState("");
  const [datax, setDatax] = useState([]);

  //   const namaProduk = namaTipeRef.current.value;

  const handleInput = () => {
    const namaProduk = namaTipeRef.current.value;
    console.log(namaProduk);
    setProdukx(namaProduk);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAllproductType`
      );
      const filterData = response.data.find((item) => item._id === id);
      setDatax(filterData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.append("", namaTipeRef.current.value);

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/editproductType/${id}`,
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
        toast.success("Berhasil Mengubah Tipe produk");
        setTimeout(() => {
          navigate(`/pos/kategorilayanan/produkDetail/${id}`);
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Gagal mengubah Tipe Produk, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "Gagal Mengubah Tipe Produk, coba lagi!"
      );
    }
  };

  document.title = "Ubah Tipe Produk";
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
          defaultValue={datax.name}
          type="text"
          placeholder="Serum"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>
      <button
        type="submit"
        className={`
        flex justify-center items-center h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353]  text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  );
};

export default UpdateTipeProduk;

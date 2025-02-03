import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateJenisProduk = () => {
  const { setNav } = useContext(navContext);
  const { id } = useParams();
  useEffect(() => {
    setNav("Update Jenis Produk");
  }, []);
  document.title = "Update Jenis Produk";
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [datax, setDatax] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    const data = {
      jenis: inputValue,
    };
    axios
      .put(
        `https://api.drnich.co.id/api/pos/produk/updatejenisProdukPos/${id}`,
        data
      ) // Menggunakan method PUT
      .then((response) => {
        if (response.status === 200) {
          navigate("../jenisproduk"); // Navigasi ke halaman lain setelah berhasil
        } else {
          alert("Gagal menyimpan data!");
        }
      })
      .catch((error) => {
        console.error("Error saat menyimpan data:", error);
        alert("Terjadi kesalahan saat menyimpan data!");
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.drnich.co.id/api/pos/produk/jenisproduk/${id}`
        );
        setDatax(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-9"
    >
      <div className="flex flex-col gap-1  px-3">
        <label className="text-start font-semibold">
          Nama Jenis Produk
        </label>
        <input
          ref={inputRef}
          defaultValue={datax.jenis}
          onSubmit={(e) => setDatax({ ...datax, jenis: e.target.value })}
          type="text"
          placeholder="Contoh : Barang / Jasa"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
      </div>
      <div className="flex items-end w-full h-full p-4">
        <button
        type="submit"
        className="bg-[#BDBDBD] text-[14px] text-white w-full rounded-xl p-3"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

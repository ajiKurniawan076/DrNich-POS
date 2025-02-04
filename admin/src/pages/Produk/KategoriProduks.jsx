import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../App2";
import axios from "axios";

export const KategoriProduks = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [search, setSearch] = useState(""); // Untuk pencarian

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.drnich.co.id/api/pos/produk/kategoriproduk"
        );
        setDatax(response.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data: ", error);
      }
    };
    fetchData();
    setNav("Kategori Produk");
    setLink('/pos/produks')
  }, []);

  // Filter data berdasarkan pencarian
  const filteredData = datax.filter(
    (data) =>
      data.jenis?.jenis.toLowerCase().includes(search.toLowerCase()) ||
      data.kategori?.toLowerCase().includes(search.toLowerCase())
  );

  document.title = "Kategori Produk";

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen  overflow-auto overflow-y-scroll scrollbar-hide px-7">
      {/* Pencarian */}
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update state pencarian
        />
      </form>

      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {/* Menampilkan data atau pesan jika data kosong */}
        {filteredData.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Belum Ada Data Jenis Produk
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {/* Menampilkan data yang sudah difilter berdasarkan pencarian */}
            {filteredData.map((data, i) => (
              <Link
                to={{
                  pathname: `/pos/kategoriprodukdetail/${data?._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className="flex flex-col place-items-start font-semibold">
                  <li className="text-[#BDBDBD]">{data?.jenis?.jenis}</li>
                  <li className="text-[#454545]">{data?.kategori}</li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}

        {/* Tombol tambah jenis produk */}
        <Link
          to="/pos/addkategoriproduk"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <AiFillPlusCircle size={20} /> Tambah Jenis
        </Link>
      </div>
    </div>
  );
};

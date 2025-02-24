import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../App2";
import axios from "axios";

export const JenisProduct = () => {
  const { setNav, setSort, setLink, asc } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [cari, setCari] = useState("");
  const [filterDatax, setFilterDatax] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.drnich.co.id/api/pos/produk/jenisproduk",
          { withCredentials: true }
        );
        setDatax(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setNav("Jenis Product");
    setLink("/pos/produks");
    setSort(true);
  }, []);

  // Filter data berdasarkan pencarian
  useEffect(() => {
    const filtered = datax.filter((data) =>
      data.jenis?.toLowerCase().includes(cari.toLowerCase())
    );
    
    // Sorting setelah filter
    if (asc === "asc") {
      setFilterDatax([...filtered].sort((a, b) => a.jenis.localeCompare(b.jenis)));
    } else if (asc === "desc") {
      setFilterDatax([...filtered].sort((a, b) => b.jenis.localeCompare(a.jenis)));
    } else {
      setFilterDatax(filtered);
    }
  }, [cari, datax, asc]); // Jalankan ulang jika pencarian, data, atau urutan berubah

  document.title = "Jenis Product";

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen overflow-auto scrollbar-hide px-7">
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        />
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {filterDatax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Tidak Ada Data
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full h-full items-center justify-start">
            {filterDatax.map((data, i) => (
              <Link
                to={`/pos/jenisprodukdetail/${data._id}`}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className="flex flex-col place-items-start font-semibold">
                  <li className="text-[#454545]/80">{data.jenis}</li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3">
        <a
          href="/pos/addjenisproduk"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <AiFillPlusCircle size={20} /> Tambah Jenis
        </a>
      </div>
    </div>
  );
};

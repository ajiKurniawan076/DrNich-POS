import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const ManajementStok = () => {
  const { setNav, setLink } = useContext(navContext);
  const [produklimit, setProlim] = useState([]);
  const [produk, setProduk] = useState([]);
  const [proCari, setProCari] = useState([]);
  const [cari, setCari] = useState("");

  useEffect(() => {
    if (cari === "") {
      setProCari(produk);
    } else {
      const filtered = produk.filter((item) =>
        item.namaProduk.toLowerCase().includes(cari.toLowerCase())
      );
      setProCari(filtered);
    }
  }, [cari, produk]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://api.drnich.co.id/api/pos/produk/produk"
        );
        const filterproduk = response.data.filter(
          (item) => item.jenis.jenis === "produk"
        );
        setProduk(filterproduk);
        setProCari(filterproduk); // Set default ke semua produk
        const filterlimit = filterproduk.filter(
          (item) => item.stok < item.minStok
        );
        setProlim(filterlimit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
    setNav("Manajemen Stok");
    setLink('/pos/produks')
  }, []);

    document.title = 'Manajemen Stok'
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full min-h-screen h-fit pt-8">
      {/* Form Pencarian */}
      <form className="mb-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          value={cari}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        />
      </form>

      {/* Stok Limit */}
      <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg w-full">
        <p>Daftar Stok Limit</p>
      </div>
      <div className="grid text-start text-[12px] px-5 py-2">
        {produklimit.length > 0 ? <p className="text-[#EB5757]">Stok Melewati Minimum</p>
          :
          <p className="text-[#EB5757]">Tidak Ada Stok Limit</p>}
        {produklimit.length > 0 ? produklimit.map((item, i) => (
          <div key={i}>
            <a
              href={`ManajementDetailStok/${item._id}`}
              className="grid text-start text-[12px] py-2"
            >
              <p className="pb-1">{item.namaProduk}</p>
              <p>Stok: {item.stok}</p>
            </a>
            <div className="border"></div>
          </div>
        ))
          :
          <></>
        }
        <></>
      </div>

      {/* Daftar Produk */}
      <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-2 rounded-lg w-full">
        <p>Daftar Produk</p>
      </div>
      <div className="grid text-start px-5 py-2 text-[12px]">
        {(cari ? proCari : produk).length === 0 ? (
          <div>Data Tidak Ada</div>
        ) : (
          (cari ? proCari : produk).map((item, i) => (
            <div key={i}>
              <a href={`ManajementDetailStok/${item._id}`}
              className="grid text-start text-[12px] py-2">
                <p className="pb-1">{item.namaProduk}</p>
                <p>Stok: {item.stok}</p>
              </a>
              <div className="border"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

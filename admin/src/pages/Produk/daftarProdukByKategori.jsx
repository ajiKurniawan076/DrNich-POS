import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { navContext } from "../../App2";
import iBar from "../../assets/iconproduk/iBarcode.svg";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const DaftarProdukByKategori = () => {
  const [products, setproducts] = useState([]);
  const { Kategori } = useParams();
  const { setNav, setLink } = useContext(navContext);
  const [cari, setCari] = useState("");
  const {kategori} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk")
        .then((response) => {
          const filter = response.data.filter((item) => item.kategori.kategori == kategori)
          setproducts(filter);
        });
    };
    fetchData();
    setNav("Daftar Produk");
    setLink('/pos/kategoriproduks')
  }, []);
  const filterData = products.filter(
    (data) =>
      data.namaProduk?.toLowerCase().includes(cari.toLowerCase()) ||
      data.kategori?.kategori?.toLowerCase().includes(cari.toLowerCase())
  );
  return (
    <div className="flex flex-col px-7 py-3 gap-1 bg-white w-full h-full">
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        />
      </form>
      <div className="flex flex-col justify-between w-full h-full pb-3 px-3">
        {filterData.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Belum Ada Data!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {filterData.map((pro, i) => (
              <Link
                to={{
                  pathname: `/productdetail/${pro._id}`,
                }}
                className="w-full text-[#454545] border flex justify-start items-center rounded-xl border-yellow-600/30 px-[20px] py-[15px]"
                key={i}
              >
                <ul className="w-full flex flex-col place-items-start font-medium">
                  <li className="text-gray-400">
                    {pro.jenis.jenis}
                    {` > `}
                    {pro.kategori.kategori}
                  </li>
                  <li className="w-full flex justify-between">
                    <span>{pro.namaProduk}</span>
                    <span className="text-[#C2A353]">{pro.hargaJual}</span>
                  </li>
                </ul>
              </Link>
            ))}
          </div>
        )}
        <div className="flex w-full gap-2">
          <a
            href="/pos/adddaftarproduk"
            className="w-[30%] flex justify-center items-center gap-2  text-[#C2A353] border border-[#C2A353] bg-white font-bold rounded-xl p-4"
          >
            <img src={iBar} /> Scan
          </a>
          <a
            href="/pos/adddaftarproduk"
            className="w-[70%] flex justify-center items-center gap-2 bg-gradient-to-l from-[#C2A353] to-[#EAC564] text-white font-bold rounded-xl p-4"
          >
            <AiFillPlusCircle size={20} /> Tambah Manual
          </a>
        </div>
      </div>
    </div>
  );
};

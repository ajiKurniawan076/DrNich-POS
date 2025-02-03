import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { navContext } from "../../App2";
import iBar from "../../assets/iconproduk/iBarcode.svg";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const DaftarProduk2 = () => {
  const [products, setproducts] = useState([]);
  const { Kategori } = useParams();
  const { setNav, setSort } = useContext(navContext);
  const [cari, setCari] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk")
        .then((response) => {
          setproducts(response.data);
          console.log(response);
        });
    };
    fetchData();
    setNav("Daftar Produk");
    setSort(true)
  }, []);
  const filterData = products.filter(
    (data) =>
      data.namaProduk?.toLowerCase().includes(cari.toLowerCase()) ||
      data.kategori?.kategori?.toLowerCase().includes(cari.toLowerCase())
  );
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          value={cari}
          type="text"
          className="w-full focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {filterData.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Belum Ada Data!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {filterData.map((pro, i) => (
              <Link
                to={{
                  pathname: `/pos/productdetail/${pro._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className="w-full flex flex-col place-items-start font-semibold">
                  <li className="text-[#BDBDBD]">
                    {pro.jenis.jenis}
                    {` > `}
                    {pro.kategori.kategori}
                  </li>
                  <li className="w-full flex justify-between">
                    <span>{pro.namaProduk}</span>
                  </li>
                </ul>
                <span className="text-[#C2A353]">Rp.{pro.hargaJual}</span>
              </Link>
            ))}
          </div>
        )}
        <div className="flex gap-5 w-full h-full justify-between items-end text-[14px]">
          <a
            href="adddaftarproduk"
            className="flex justify-center items-center border-[#C2A353] text-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px] hover:scale-105 gap-1"
          >
            <img src={iBar} /> Scan
          </a>
          <a
            href="adddaftarproduk"
            className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px] hover:scale-105 gap-1"
          >
            <AiFillPlusCircle size={20} /> Tambah Manual
          </a>
        </div>
      </div>
    </div>
  );
};

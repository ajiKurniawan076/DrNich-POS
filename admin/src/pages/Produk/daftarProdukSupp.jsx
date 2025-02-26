import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { navContext } from "../../App2";
import iBar from "../../assets/iconproduk/iBarcode.svg";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const DaftarProdukSupp = () => {
  const [products, setproducts] = useState([]);
  const { id } = useParams();
  const { setNav, setSort, setLink, asc } = useContext(navContext);
  const [cari, setCari] = useState("");
  const [filterDatax, setFilterDatax] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/supplier/produk/"+id)
        .then((response) => {
          setproducts(response.data);
        });
    };
    fetchData();
    setNav("Daftar Produk");
    setLink('/pos/supplierdet/'+id)
    setSort(true)
  }, []);
  const filterData = products.filter(
    (data) =>
      data.namaProduk?.toLowerCase().includes(cari.toLowerCase()) ||
      data.kategori?.kategori?.toLowerCase().includes(cari.toLowerCase())
  );

  // Filter data berdasarkan pencarian
  useEffect(() => {
    const filtered = filterData
    
    // Sorting setelah filter
    if (asc === "asc") {
      setFilterDatax([...filtered].sort((a, b) => a.namaProduk.localeCompare(b.namaProduk)));
    } else if (asc === "desc") {
      setFilterDatax([...filtered].sort((a, b) => b.namaProduk.localeCompare(a.namaProduk)));
    } else {
      setFilterDatax(filtered);
    }
    console.log(filtered)
  }, [cari, products, asc]);

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          value={cari}
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {filterDatax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Belum Ada Data!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {filterDatax.map((pro, i) => (
              <Link
                to={{
                  pathname: `/pos/productdetail/${pro._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className="w-full flex flex-col place-items-start font-semibold">
                  <li className="w-full flex justify-between">
                    <span>{pro.namaProduk}</span>
                  </li>
                </ul>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

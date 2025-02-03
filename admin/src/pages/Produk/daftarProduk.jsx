import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { navContext } from "../../App2";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";

export const DaftarProduk = () => {
  const [products, setproducts] = useState([]);
  const { Kategori } = useParams();
  const { setNav, setSort } = useContext(navContext);
  useEffect(() => {
    fetch("/produk.json")
      .then((response) => response.json())
      .then((data) => {
        if (Kategori == null) {
          setproducts(data);
        } else {
          const product = data.filter((prod) => prod.Kategori === Kategori);
          setproducts(product);
        }
        console.log(data);
      });

    setNav(Kategori);
    setSort(true)
  }, []);
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 h-[42px] mx-3 border border-black rounded-xl items-center px-2">
        <AiOutlineSearch size={20} />
        <input
          type="text"
          className="text-sm w-full focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        {products == {} ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Belum Ada Data Supplier!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {products.map((pro) => (
              <Link
                to={{
                  pathname: `/productdetail/${pro.id}`,
                }}
                className="w-full text-[#454545] border flex justify-start items-center rounded-xl border-yellow-600/30 px-[20px] py-[15px]"
                key={pro.id}
              >
                <ul className=" flex flex-col place-items-start font-medium">
                  <li>{pro.NamaProduk}</li>
                  <li className="text-sm text-black/50 font-medium">
                    Stok: {pro.Stok}
                  </li>
                </ul>
              </Link>
            ))}
          </div>
        )}

        <a
          href="addsupplier"
          className="flex justify-center items-center gap-2 h-[30px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl"
        >
          <AiFillPlusCircle size={20} /> Tambah Supplier
        </a>
      </div>
    </div>
  );
};

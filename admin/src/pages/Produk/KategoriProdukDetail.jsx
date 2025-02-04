import { useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import { AiOutlineRight, AiOutlineWhatsApp } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import next2 from "../../assets/next2.svg";

export const KategoriProdukDetail = () => {
  const { setNav, setSort } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();
  const navigatee = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/kategoriproduk/" + id)
        .then((response) => {
          setDatax(response.data);
        });
    };
    fetchData();

    setNav("Jenis Product");
    setSort(false)
  }, []);

  useEffect(() => {
    datax._id != null && setFetched(true);
  }, [datax]);

  const deleteModel = async () => {
    await axios
      .delete(
        "https://api.drnich.co.id/api/pos/produk/deletekategoriprodukpos/" + id
      )
      .then(
        (response) => response.status == 200 && navigatee("../kategoriproduks")
      );
  };

  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-9">
      {fetched ? (
        <>
          <div className="flex flex-col gap-1  mx-1 rounded-xl border border-[#C2A353] px-4 py-6">
            <label className="text-start font-normal text-[12px] text-[#BDBDBD]">
              Jenis Produk
            </label>
            <p className="text-start text-[#454545]  font-normal text-[12px] h-[30px]">
              {datax?.jenis.jenis}
            </p>
            <label className="text-start font-normal text-[12px] text-[#BDBDBD]">
              Nama Kategori Produk
            </label>
            <p className="text-start text-[#454545]  font-normal text-[12px]">
              {datax?.kategori}
            </p>
          </div>
          <div className="flex justify-between text-[12px] mx-2 py-1 text-[#BDBDBD]">
            <p>Terakhir Diperbaharui</p>
            <p>Tanggal Disini</p>
          </div>
          <div className="mx-1 flex flex-col gap-3 h-full justify-between">
            <a
              href={`/pos/produkbykategori/${datax.kategori}`}
              className=" w-full h-[50px] border-b-2"
            >
              <span className="w-full  text-[12px] text-[#C2A353] h-full border rounded-xl  border-[#C2A353] flex items-center font-normal px-5 p-3 ">
                Lihat Daftar Produk
                <div className="flex ms-auto">
                  <img src={next2} className="h-[18px] w-[18px]" />
                </div>
              </span>
            </a>
            <div className="flex gap-5 w-full justify-between text-[14px]">
              <button className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px] bg-white text-[#C2A353]">
                Hapus
              </button>
              <Link
                to={{ pathname: `/pos/KategoriProdukUpdate/${id}` }}
                onClick={() => {
                  console.log(datax);
                }}
                className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px]"
              >
                Edit
              </Link>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

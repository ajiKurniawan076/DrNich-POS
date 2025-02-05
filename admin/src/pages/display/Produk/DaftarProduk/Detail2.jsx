import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../../../App2";
import gkategori from "../../../../assets/iconDisplay/Layanan/gkategori.svg";
import { useLocation } from "react-router-dom";

export const Detail2 = () => {
  const lokasi = useLocation();
  const dummData = lokasi.state;
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  useEffect(() => {
    fetch("/marketing.json")
      .then((response) => response.json())
      .then((data) => setdatax(data));
    setNav("Detail");
  }, []);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 gap-5">
        <div className="flex flex-col text-[12px]  w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={gkategori} alt="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Produk</p>
            <p className="text-[#454545]">{dummData.nama}</p>
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Kategori Produk</p>
            <p className="text-[#454545]">{dummData.kategoriproduk}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Tipe Produk</p>
            <p className="text-[#454545]">{dummData.tipeproduk}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Tipe Kulit</p>
            <p className="text-[#454545]">{dummData.tipekulit}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">harga</p>
            <p className="text-[#454545]">{dummData.harga}</p>
          </div>
          <div className="text-start ">
            <p className="text-[#BDBDBD]">Cara Pakai</p>
            <p className="text-[#454545]">{dummData.carapakai}</p>
          </div>
          <div className="text-start ">
            <p className="text-[#BDBDBD]">Manfaat</p>
            <p className="text-[#454545]">{dummData.manfaat}</p>
          </div>
          <div className="text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{dummData.deskripsi}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <a
            href=""
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </a>
          <Link
            to={{ pathname: "/UpdateDaftarProduk" }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
      <button
        className="w-10 h-10 bg-black/300 text-white"
        onClick={() => {
          setdatax([]);
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default Detail2;

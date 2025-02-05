import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link } from "react-router-dom";
import { navContext } from "../../../App2";
import { useLocation } from "react-router-dom";

import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
// import { BiLockAlt } from "react-icons/bi"

export const RatingDetail = () => {
  const lokasi = useLocation();
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const datadummy = lokasi.state;
  useEffect(() => {
    // fetch("/marketing.json").then(
    //     (response) => response.json()
    // ).then((data) => (setdatax(data)
    // ))
    // setNav('Detail')
  }, []);

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col gap-2 text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={gkategori} alt="" className="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Pelanggan</p>
            <p className="text-[#454545]">{datadummy.nama}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{datadummy.deskripsi}</p>
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
            to={{ pathname: "/UpdateRating" }}
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

export default RatingDetail;

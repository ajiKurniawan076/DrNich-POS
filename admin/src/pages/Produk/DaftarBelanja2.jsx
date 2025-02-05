import { useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import iCenKu from "../../assets/iconproduk/iCenKu.svg";
import iMin from "../../assets/iconproduk/iMin.svg";
import iPlus from "../../assets/iconproduk/iPlus.svg";
import iTambah from "../../assets/iconproduk/Itambah.svg";
import { BsCart4 } from "react-icons/bs";

export const DaftarBelanja2 = () => {
  const { setNav, setLink } = useContext(navContext);

  const [angka, setAngka] = useState(0);
  const min = () => {
    setAngka(angka - 1);
  };
  const plus = () => {
    setAngka(angka + 1);
  };

  setNav("Daftar Belanja ");
  document.title = "Daftar Belanja ";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <form className="mt-5 flex gap-2 h-[42px] mx-3 border border-black rounded-xl items-center px-2">
        <AiOutlineSearch size={20} />
        <input
          type="text"
          className="text-sm w-full h-[30px] focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg">
        <p className="">Daftar Stok Limit</p>
      </div>
      <div className="flex flex-col gap-3 w-full h-full justify-start">
        <div className="flex flex-col items-start">
          <div className="ms-14 mt-2 text-[#E2B93B] text-[12px]">
            <p>Stok Hampir Habis (26)</p>
          </div>
          <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
            <div className="">
              <img src={iCenKu} alt="kocen" />
            </div>
            <div className="text-start">
              <p>Sunscrenn SPF 30+ 100ml</p>
              <p>Rp 42.000</p>
            </div>
            <div className="flex gap-4 ms-auto">
              <button onClick={() => min()}>
                <img src={iMin} alt="minus" />
              </button>
              <p>{angka}</p>
              <button onClick={() => plus()}>
                <img src={iPlus} alt="plus" />
              </button>
            </div>
          </div>
          <div className="ms-14 mt-2 text-[#EB5757] text-[12px]">
            <p>Stok Melewati Minimum (7)</p>
          </div>
          <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
            <div className="">
              <img src={iCenKu} alt="kocen" />
            </div>
            <div className="text-start">
              <p>Sunscrenn SPF 30+ 100ml</p>
              <p>Rp 42.000</p>
            </div>
            <div className="flex gap-4 ms-auto">
              <button onClick={() => min()}>
                <img src={iMin} alt="minus" />
              </button>
              <p>{angka}</p>
              <button onClick={() => plus()}>
                <img src={iPlus} alt="plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 rounded-lg">
          <p className="">Semua Daftar</p>
        </div>
        <div className="flex flex-col items-start">
          <div className="ms-14 mt-2 text-[#E2B93B] text-[12px]">
            <p>Stok Hampir Habis (26)</p>
          </div>
          <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
            <div className="">
              <img src={iCenKu} alt="kocen" />
            </div>
            <div className="text-start">
              <p>Sunscrenn SPF 30+ 100ml</p>
              <p>Rp 42.000</p>
            </div>
            <div className="flex gap-4 ms-auto">
              <button onClick={() => min()}>
                <img src={iMin} alt="minus" />
              </button>
              <p>{angka}</p>
              <button onClick={() => plus()}>
                <img src={iPlus} alt="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 w-full pt-4 py-3">
        <a
          href="DetailDaftarBelanja"
          className="flex justify-center items-center w-[170px] gap-2 h-[40px] bg-white text-yellow-500 border border-yellow-500 font-bold rounded-xl"
        >
          <img src={iTambah} alt="" /> Tambah
        </a>
        <a
          href="DetailDaftarBelanja"
          className="flex justify-center items-center w-full gap-2 h-[40px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl"
        >
          <BsCart4 /> Beli Sekarang
        </a>
      </div>
    </div>
  );
};

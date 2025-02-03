import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const JenisProductAdd = () => {
  const { setNav } = useContext(navContext);
  useEffect(() => {
    setNav("Tambah Jenis Produk");
  }, []);
  document.title = "Tambah Jenis Produk";
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    const data = {
      jenis: inputValue,
    };
    axios
      .post("https://api.drnich.co.id/api/pos/produk/jenisproduk", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials : true})
      .then((response) => {
        response.status == 200 && navigate("../jenisproduk");
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-5 py-3  gap-1 justify-between bg-white w-full h-full "
    >
      <div className="flex flex-col gap-1 ">
        <label className="text-start font-semibold text-sm">
          Nama Jenis Produk
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Contoh : Barang / Jasa"
          className="px-2 border text-sm border-black/30 rounded-lg h-[46px]"
        ></input>
      </div>
      <button
        type="submit"
        className="bg-gray-800/50 h-[50px] text-white mx-5 rounded-xl"
      >
        Simpan
      </button>
    </form>
  );
};

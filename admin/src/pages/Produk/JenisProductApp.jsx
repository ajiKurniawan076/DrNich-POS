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
  const [isFilled, setIsFilled] = useState(false);

  const checkFormFilled = () => {
    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }
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
      className="flex flex-col py-3 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-7"
    >
      <div className="flex flex-col px-3 h-full">
        <label className="text-start font-semibold mb-[5px]">
          Nama Jenis Produk
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Contoh : Barang / Jasa"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
          onChange={checkFormFilled}
        ></input>
      </div>
      <div className="flex items-end mt-auto w-full h-full px-3">
        <button
          type="submit"
          className={`justify-end items-end mt-auto w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UpdateTipeProduk = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const namaTipeRef = useRef(null);
  const [produkx, setProdukx] = useState("");

  //   const namaProduk = namaTipeRef.current.value;

  const handleInput = () => {
    const namaProduk = namaTipeRef.current.value;
    console.log(namaProduk);
    setProdukx(namaProduk);
  };

  useEffect(() => {
    setNav("Ubah Tipe Produk");
  }, []);

  const handleSubmit = (e) => {};

  document.title = "Ubah Tipe Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col justify-between bg-white min-h-screen px-3 py-3 gap-3 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <label className="text-[#454545] text-start text-[12px]">
          Nama Tipe Produk
        </label>
        <input
          onChange={(e) => {
            e.preventDefault();
            handleInput();
          }}
          ref={namaTipeRef}
          type="text"
          placeholder="Serum"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>

      <button
        disabled={!produkx}
        type="submit"
        className={`
        ${
          !produkx
            ? "bg-[#DCDCDC]"
            : "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
        }
        flex justify-center items-center h-[44px]  text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  );
};

export default UpdateTipeProduk;

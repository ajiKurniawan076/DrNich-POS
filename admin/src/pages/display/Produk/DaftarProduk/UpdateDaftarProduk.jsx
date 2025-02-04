import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";
import gkategori from "../../../../assets/iconDisplay/Layanan/gkategori.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

export const UpdateDaftarProduk = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const [dataDummyx, setDataDummyx] = useState([]);
  const [dataDummiy, setDataDummiy] = useState([]);
  const [data1, setdata1] = useState("pilih");
  useEffect(() => {
    const dataDummyProduk = [
      { id: 1, namaProduk: "sunscream" },
      { id: 2, namaProduk: "fecial" },
    ];
    setDataDummyx(dataDummyProduk);
    const dataDummyTipeKuliat = [
      { id: 1, tipe: "berminya" },
      { id: 1, tipe: "kering" },
    ];
    setDataDummiy(dataDummyTipeKuliat);

    setNav("Ubah Daftar Produk");
  }, []);

  // handle select
  const handleSelect = () => {};

  const handleSubmit = (e) => {};

  document.title = "Ubah Daftar Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col px-0 p-3 gap-1 bg-white w-full h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1 px-3">
        <div className="flex flex-col">
          <label className="text-start text-[454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={gkategori}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {/* belum ada gambar = belum ada gambar */}
              <p className="text-[#454545] mb-3">IMG0973-1092-21.jpg</p>
              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                {/* belum ada gambar = pilih gambar */}
                <input
                  type="File"
                  className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                />
              </div>
              <p className="text-start text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal ukuran 100mb{" "}
              </p>
            </div>
          </div>
        </div>

        <label className="text-start text-[#454545]  text-[12px]">
          Kategori Produk
        </label>
        <select
          onChange={(e) => {
            e.preventDefault();
            handleSelect();
          }}
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
          defaultValue=""
        >
          <option value="" className="text-[#cdcdcd]" disabled>
            pilih kategori produk
          </option>
          {dataDummyx ? (
            dataDummyx.map((data, i) => (
              <option value={data.namaProduk} key={i}>
                {data.namaProduk}
              </option>
            ))
          ) : (
            <option value="" className="text-white-300">
              tidak ada pilihan
            </option>
          )}
        </select>
        <label className="text-start text-[#454545]  text-[12px]">
          Tipe Produk
        </label>
        <select
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
          defaultValue=""
        >
          <option value="" className="text-white-300" disabled>
            Pilih Tipe Produk
          </option>

          <option value="Facial_series">Serum</option>
        </select>
        <label className="text-start text-[#454545]  text-[12px]">
          Tipe Kulit
        </label>
        <select
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
          defaultValue=""
        >
          <option value="" className="text-white-300" disabled>
            Pilih Tipe Kulit
          </option>
          {dataDummiy.map((data, i) => (
            <option value={data.tipe} key={i}>
              {data.tipe}
            </option>
          ))}
        </select>
        <label className="text-[#454545] text-start  text-[12px]">
          Nama Layanan
        </label>
        <input
          type="text"
          placeholder="Contoh : Serum Retinol 100%"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">Harga</label>
        <input
          type="text"
          placeholder="Contoh : 70.000"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          cara pakai
        </label>
        <input
          type="text"
          placeholder="Masukan Cara pakai"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          Mamfaat
        </label>
        <input
          type="text"
          placeholder="Masukan Manfaat"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          Deskripsi Detail
        </label>
        <textarea
          name=""
          id=""
          cols="auto"
          rows="2"
          className="border rounded-lg px-2 text-[12px] p-1"
          placeholder="Contoh : Masukan deskripsi"
        ></textarea>
        <label className="text-[#454545] text-start  text-[12px]">
          Deskripsi Detail
        </label>
        <textarea
          name=""
          id=""
          cols="auto"
          rows="2"
          className="border rounded-lg text-[12px] p-1 px-2"
          placeholder="Contoh : Masukan deskripsi"
        ></textarea>

        <button
          type="submit"
          className="flex justify-center items-center h-[44px] mt-4  bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg "
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default UpdateDaftarProduk;

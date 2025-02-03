import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import axios from "axios";

export const Addsupplier = () => {
  const navigate = useNavigate();
  const namaPerusahaanRef = useRef(null);
  const namaKontakRef = useRef(null);
  const emailRef = useRef(null);
  const noTeleponRef = useRef(null);
  const AlamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const namaRekeningRef = useRef(null);
  const bankRef = useRef(null);
  const nomorRekeningRef = useRef(null);
  const keteranganRekRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      namaPerusahaan: namaPerusahaanRef.current.value,
      namaKontak: namaKontakRef.current.value,
      email: emailRef.current.value,
      nomorTelepon: noTeleponRef.current.value,
      alamat: AlamatRef.current.value,
      keterangan: keteranganRef.current.value,
      namaRekening: namaRekeningRef.current.value,
      bank: bankRef.current.value,
      nomorRekening: nomorRekeningRef.current.value,
      keteranganRek: keteranganRekRef.current.value,
    };
    console.log(data);
    axios
      .post("https://api.drnich.co.id/api/pos/user/supplier", data)
      .then((response) => {
        response.status == 200 && navigate("../supplier");
      });
  };

  const { setNav } = useContext(navContext);
  useEffect(() => {
    setNav("Tambah Supplier");
  }, []);
  document.title = "Tambah Supplier";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
    >
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">
          Nama Perusahaan
        </label>
        <input
          ref={namaPerusahaanRef}
          type="text"
          placeholder="Contoh : PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">Nama Kontak</label>
        <input
          ref={namaKontakRef}
          type="text"
          placeholder="Contoh : Agus"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold">Email</label>
        <input
          ref={emailRef}
          type="text"
          placeholder="Contoh : agus@gmail.com"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">
          Nomor Telepon
        </label>
        <input
          ref={noTeleponRef}
          type="text"
          placeholder="Contoh : 081000000000"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">Alamat</label>
        <input
          ref={AlamatRef}
          type="text"
          placeholder="Contoh : Jl.Merak No.10, Sidorejo, Kota Salatiga, Jawa Tengah, Indonesia"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">Keterangan</label>
        <input
          ref={keteranganRef}
          type="text"
          placeholder="Contoh : Supplier Sunscreen"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
      </div>
      <div className="text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold ">
          Nama Pemilik Rekening
        </label>
        <input
          ref={namaRekeningRef}
          type="text"
          placeholder="Contoh : Hana"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold">Bank</label>
        <input
          ref={bankRef}
          type="text"
          placeholder="Contoh : BCA"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">
          Nomor Rekening
        </label>
        <input
          ref={nomorRekeningRef}
          type="text"
          placeholder="Contoh : 5670019288493"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
        <label className="text-start font-semibold ">Keterangan</label>
        <input
          ref={keteranganRekRef}
          type="text"
          placeholder="Contoh : Admin PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
      </div>
      <div className="mt-4 w-full h-full px-3">
        <button
          type="submit"
          className="bg-[#BDBDBD] text-[14px] text-white w-full rounded-xl p-3"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

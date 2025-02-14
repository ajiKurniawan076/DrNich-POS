import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  const [isFilled, setIsFilled] = useState(false);

  const checkFormFilled = () => {
    if (
      namaPerusahaanRef.current?.value &&
      namaKontakRef.current?.value &&
      noTeleponRef.current?.value &&
      namaRekeningRef.current?.value &&
      AlamatRef.current?.value &&
      bankRef.current?.value &&
      nomorRekeningRef.current?.value

    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const handleSubmit = async (e) => {
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
    try {
      const response = await axios.post(
      "https://api.drnich.co.id/api/pos/user/supplier",
      data
    );

    if (response.status === 200) {
      toast.success("Berhasil Menambahkan Supplier");
      setTimeout(() => {
        toast.success("Redirecting...");
        window.location.href = "/pos/supplier";
      }, 1500); // Redirect ke halaman supplier
    } else {
      toast.error(response.data.message || "Gagal menambahkan supplier");
    }
    } catch (error) {
    console.error("Error:", error);
    toast.error("Terjadi kesalahan saat menambahkan supplier");
    }
  };

  const { setNav, setLink } = useContext(navContext);
  useEffect(() => {
    setNav("Tambah Supplier");
    setLink('/pos/supplier')
  }, []);
  document.title = "Tambah Supplier";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
    >
      <div className="flex flex-col gap-[20px] px-3">
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Nama Perusahaan</label>
          <input
            ref={namaPerusahaanRef}
            type="text"
            placeholder="Contoh : Aji"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
            />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Nama Kontak</label>
          <input
            ref={namaKontakRef}
            type="text"
            placeholder="Contoh : Agus"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Email</label>
          <input
            ref={emailRef}
            type="text"
            placeholder="Contoh : agus@gmail.com"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">
            Nomor Telepon
          </label>
          <input
            ref={noTeleponRef}
            type="number"
            placeholder="Contoh : 081000000000"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Alamat</label>
          <input
            ref={AlamatRef}
            type="text"
            placeholder="Contoh : Jl.Merak No.10, Sidorejo, Kota Salatiga, Jawa Tengah, Indonesia"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
          <input
            ref={keteranganRef}
            type="text"
            placeholder="Contoh : Supplier Sunscreen"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
          ></input>
        </div>
      </div>
      <div className="text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>
      <div className="flex flex-col gap-[20px] px-3">
        <div className="flex flex-col"> 
          <label className="text-start font-semibold mb-[5px]">
            Nama Pemilik Rekening
          </label>
          <input
            ref={namaRekeningRef}
            type="text"
            placeholder="Contoh : Hana"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Bank</label>
          <input
            ref={bankRef}
            type="text"
            placeholder="Contoh : BCA"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">
            Nomor Rekening
          </label>
          <input
            ref={nomorRekeningRef}
            type="number"
            placeholder="Contoh : 5670019288493"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
            onChange={checkFormFilled}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="text-start font-semibold mb-[5px]">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
          <input
            ref={keteranganRekRef}
            type="text"
            placeholder="Contoh : Admin PT.BEAUTY"
            className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px]"
          ></input>
        </div>
      </div>
      <div className="mt-4 w-full h-full px-3">
        <button
          type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
};

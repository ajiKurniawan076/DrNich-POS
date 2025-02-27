import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const RetingAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const fotoRef = useRef(null);
  const namaRef = useRef(null);
  const ulasanRef = useRef(null);
  const [gambar, setGambar] = useState();
  const [namaGambar, setNamaGambar] = useState("");
  useEffect(() => {
    setNav("Tambah Reting");
  }, []);

  const handleGambar = (e) => {
    e.preventDefault();
    const file = fotoRef.current.files[0];
    if (file) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(file.type)) {
        alert("bukan gambar");
        setGambar(null);
        return;
      }
      setGambar(URL.createObjectURL(file));
      setNamaGambar(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaRef.current.value || !ulasanRef.current.value) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("nama", namaRef.current.value);
    if (fotoRef.current.files.length > 0) {
      fdata.append("foto", fotoRef.current.files[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }
    // fdata.append("ulasan", ulasanRef.current.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/tambahulasan`,
        fdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Berhasil menambahkan Rating");
        setTimeout(() => {
          navigate("/pos/rating");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Gagal menambahkan Rating, coba lagi!"
      );
      toast.error(
        error.response?.data?.message || "Gagal menambahkan Rating, coba lagi!"
      );
    }
  };

  document.title = "Tambah Reting";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col px-0 p-3 gap-2 bg-white w-full min-h-screen justify-between"
      onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="flex flex-col gap-1 px-3 flex-grow">
        <div className="flex flex-col">
          <label className="text-start text-[#454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={gambar}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {!namaGambar ? (
                <p className="text-[#454545] mb-3">Belum Ada Gambar</p>
              ) : (
                <p className="text-[#454545] mb-3">{namaGambar}</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  accept="image/*"
                  onChange={handleGambar}
                  ref={fotoRef}
                  type="File"
                  className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                />
              </div>
              <p className="text-start text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal ukuran 100mb
              </p>
            </div>
          </div>
        </div>
        <label className="text-[#454545] text-start text-[12px]">
          Nama Ketegori
        </label>
        <input
          ref={namaRef}
          type="text"
          placeholder="Contoh: diana"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start text-[12px]">Review</label>
        <textarea
          ref={ulasanRef}
          name=""
          id=""
          cols="auto"
          rows="5"
          className=" border rounded-lg text-[12px] p-2"
          placeholder="Review"></textarea>
      </div>
      <div className="mt-auto w-full ">
        <button
          type="submit"
          className="flex justify-center items-center w-full h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default RetingAdd;

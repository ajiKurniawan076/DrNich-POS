import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { set } from "date-fns";
import { toast } from "react-toastify";

export const LayananAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [selectet, setselectet] = useState(""); // mengambil nilai yang di pilih
  const navigate = useNavigate();
  // useRef
  const kateforiRef = useRef(null);
  const namaLayananRef = useRef(null);
  const hargaRef = useRef(null);
  const durasiRef = useRef(null);
  const deskripsiDetailRef = useRef(null);
  const deskripsikartuRef = useRef(null);
  const fileGambarRef = useRef(null);
  // useState
  const [gambarx, setGambarx] = useState(null);
  const [namaGambarx, setNamaGambarx] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/getAllJenisLayanan`
      );
      const data = response.data;
      setdatax(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
      toast.error("Ada masalah. Silahkan coba lagi!");
    }
  };

  useEffect(() => {
    fetchCategory();
    setNav("Tambah Layanan");
    setLink(-1);
  }, []);

  const handleFile = (e) => {
    e.preventDefault();
    const fileGambar = fileGambarRef.current.files[0];

    if (fileGambar) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(fileGambar.type)) {
        alert("ini bukan gambar bro!!");
        setGambarx(null);
        return;
      }
      setGambarx(URL.createObjectURL(fileGambar));
      setNamaGambarx(fileGambar.name);
    }

    // console.log(fileGambar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kategoriProduk: kateforiRef.current.value,
      nama: namaLayananRef.current.value,
      harga: hargaRef.current.value.trim(),
      durasi: durasiRef.current.value,
      deskripsi: deskripsiDetailRef.current.value,
      cardDeskripsi: deskripsikartuRef.current.value,
      image: fileGambarRef.current.files[0],
    };
    if (!data.nama || !data.harga) {
      alert("tidak boleh kosong");
    } else {
      console.log(data);
    }
    const postData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/tambahLayanan`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success("Berhasil menambahkan Layanan");
          setTimeout(() => navigate("/pos/Layanan"), 2000);
        }
      } catch (error) {
        console.log(error.response?.data?.message || "An error occurred");
        toast.error("Ada masalah. Silahkan coba lagi!");
      }
    };
    postData();
  };

  document.title = "Tambah Layanan";
  return (
    <form
      className="flex flex-col px-0 p-3 gap-1 bg-white w-full h-full"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 px-3">
        <div className="flex flex-col">
          <label className="text-start text-[454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={gambarx}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {/* belum ada gambar = belum ada gambar */}
              {gambarx ? (
                <p className="text-[#454545] mb-3">{namaGambarx}</p>
              ) : (
                <p className="text-[#454545] mb-3">belum ada Gambar</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                {/* belum ada gambar = pilih gambar */}
                <input
                  ref={fileGambarRef}
                  onChange={handleFile}
                  accept="image/*"
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
          Kategori Layanan
        </label>
        <select
          ref={kateforiRef}
          name="options"
          className="px-4 border text-black text-[12px] border-[#DCDCDC] rounded-lg h-[48px]"
          id="">
          {datax.length === 0 ? (
            <option value="" className="text-white-300 " disabled>
              Pilih kategori
            </option>
          ) : (
            datax.map((data, i) => (
              <option className="text-black" key={i} value={data._id}>
                {data.nama}
              </option>
            ))
          )}
        </select>
        <label className="text-[#454545] text-start  text-[12px]">
          Nama Layanan
        </label>
        <input
          ref={namaLayananRef}
          type="text"
          placeholder="Contoh : Facial Gold acne"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">Harga</label>
        <input
          ref={hargaRef}
          type="number"
          placeholder="Contoh : 70.000"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">Durasi</label>
        <input
          ref={durasiRef}
          type="text"
          placeholder="Contoh : 1 jam 20 menit"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          Deskripsi Detail
        </label>
        <textarea
          ref={deskripsiDetailRef}
          name=""
          id=""
          cols="auto"
          rows="2"
          className="border rounded-lg text-[12px] p-2"
          placeholder="Contoh : Masukan deskripsi"></textarea>
        <label className="text-[#454545] text-start  text-[12px]">
          Deskripsi Kartu
        </label>
        <textarea
          ref={deskripsikartuRef}
          name=""
          id=""
          cols="auto"
          rows="2"
          className="border rounded-lg text-[12px] p-2"
          placeholder="Contoh : Masukan deskripsi kartu"></textarea>
        <button
          disabled={!gambarx}
          type="submit"
          className={`
          ${
            !gambarx
              ? "bg-[#DCDCDC]"
              : "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
          }
          flex justify-center items-center h-[44px] mt-4   text-white font-medium rounded-lg `}>
          Simpan
        </button>
      </div>
    </form>
  );
};

export default LayananAdd;

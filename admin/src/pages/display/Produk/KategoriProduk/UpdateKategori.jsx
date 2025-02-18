import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";

import gkt from "../../../../assets/iconDisplay/produk/gkt.svg";
// import gkt from "../../../../assets/iconDisplay/produk/gkt.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateKategori = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const gambarRef = useRef(null);
  const namaKategoriRef = useRef(null);
  const [gambarx, setGambarx] = useState(null);
  const [gambarname, setGambarName] = useState("");
  const [nama, setNama] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getCategoryById/${id}`
        );
        console.log(response);
        setGambarx(response.data.image);
        setNama(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();

    setNav("Ubah Kategori Produk");
  }, []);

  //handle gambar
  const handleGambar = (e) => {
    e.preventDefault();
    const file = gambarRef.current.files[0];
    if (file) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(file.type)) {
        alert("ituBukan gambar");
        setGambarx(null);
        return;
      }
      //   jika valid
      setGambarx(URL.createObjectURL(file));
      setGambarName(file.name);
    }
  };
  // end handle gambar

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaKategoriRef.current.value) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("name", namaKategoriRef.current.value);
    if (gambarRef.current.files.length > 0) {
      fdata.append("image", gambarRef.current.files[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/tambahkategoriProduk`,
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
        toast.success("Berhasil menambahkan kategori treatment");
        setTimeout(() => {
          navigate("/pos/kategoriproduk2");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Gagal menambahkan kategori Produk, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "Gagal menambahkan kategori Produk, coba lagi!"
      );
    }
  };

  document.title = "Ubah Kategori Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col justify-between px-0 py-3 gap-1 bg-white w-full min-h-screen"
      onSubmit={handleSubmit}
    >
      {/* Konten Utama */}
      <div className="flex flex-col gap-4 px-3">
        <div className="flex flex-col">
          <label className="text-start text-[#454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={gambarx}
              alt=" "
              className="h-[140px] w-[140px] object-cover rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {!gambarx ? (
                <p className="text-[#454545] mb-3">Belum ada gambar</p>
              ) : (
                <p className="text-[#454545] mb-3">{gambarname}</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  onChange={handleGambar}
                  ref={gambarRef}
                  accept="image/*"
                  type="file"
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
          Nama Kategori
        </label>
        <input
          value={nama}
          ref={namaKategoriRef}
          type="text"
          placeholder="Contoh : Facial fals"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
      </div>
      <button
        disabled={!gambarx}
        type="submit"
        className={`
        ${
          gambarx
            ? " bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
            : "bg-[#DCDCDC]"
        }
        flex justify-center items-center h-[44px] text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  );
};

export default UpdateKategori;

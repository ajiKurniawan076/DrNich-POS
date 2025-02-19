import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../../App2";
import gkategori from "../../../../assets/iconDisplay/Layanan/gkategori.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

export const TambahProduk = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const kategoriRef = useRef(null);
  const tipeProdukRef = useRef(null);
  const tipeKulitRef = useRef(null);
  const namaRef = useRef(null);
  const deskripsiRef = useRef(null);
  const fotoRef = useRef(null);
  const manfaatRef = useRef(null);
  const cara_pakaiRef = useRef(null);
  const hargaRef = useRef(null);
  const [kategori, setKategori] = useState([]);
  const [tipeProduk, setTipeProduk] = useState([]);
  const [tipeKulit, setTipeKulit] = useState([]);
  const [gambarx, setGambarx] = useState();
  const [gambarNama, setGambarNama] = useState();

  const handleGambar = (e) => {
    e.preventDefault();
    const file = fotoRef.current.files[0];
    if (file) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(file.type)) {
        alert("itu Bukan gambar");
        setGambarx(null);
        return;
      }
      //   jika valid
      setGambarx(URL.createObjectURL(file));
      setGambarNama(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !namaRef.current.validImage ||
      !fotoRef.current.file ||
      !deskripsiRef.current.value
    ) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("nama", namaRef.current.value);
    fdata.append("deskripsi", deskripsiRef.current.value);
    if (fotoRef.current.file.length > 0) {
      fdata.append("foto", fotoRef.current.file[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }
    fdata.append("manfaat", manfaatRef.current.validImage);
    fdata.append("cara_pakai", cara_pakaiRef.current.value);
    fdata.append("harga", hargaRef.current.value);
    fdata.append("kategori", kategoriRef.current.value);
    fdata.append("tipeProduk", tipeProduk.current.value);
    fdata.append("tipeProduk", tipeProdukRef.current.value);
    fdata.append("tipeKulit", tipeKulitRef.current.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/tambahproduk`,
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
        toast.success("Berhasil menambahkan produk");
        setTimeout(() => {
          navigate("/pos/produk1");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Gagal menambahkan produk, coba lagi!"
      );
      toast.error(
        error.response?.data?.message || "Gagal menambahkan produk, coba lagi!"
      );
    }
  };

  const fetchDataKategori = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/getAllkategoriProduk`
      );
      setKategori(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTipeProduk = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAllproductType`
      );
      setTipeProduk(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTipeKulit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAlltipeKulit`
      );
      setTipeKulit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataKategori();
    fetchTipeKulit();
    fetchTipeProduk();
    setNav("Tambah Produk");
  }, []);

  document.title = "Tambah Produk";
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
              src={gambarx}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {!gambarNama ? (
                <p className="text-[#454545] mb-3">belum ada gambar</p>
              ) : (
                <p className="text-[#454545] mb-3">{gambarNama}</p>
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
                *Upload foto dengan format .jpg .png maksimal ukuran 100mb{" "}
              </p>
            </div>
          </div>
        </div>

        <label className="text-start text-[#454545]  text-[12px]">
          Kategori Produk
        </label>
        <select
          ref={kategoriRef}
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
          defaultValue=""
        >
          <option value="" className="text-[#cdcdcd]" disabled>
            pilih kategori produk
          </option>
          {kategori ? (
            kategori.map((data, i) => (
              <option value={data.name} key={i}>
                {data.name}
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
          ref={tipeProdukRef}
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
          defaultValue=""
        >
          <option value="" className="text-white-300" disabled>
            Pilih Tipe Produk
          </option>
          {tipeProduk.map((data, i) => (
            <option key={i} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        <label className="text-start text-[#454545]  text-[12px]">
          Tipe Kulit
        </label>
        <select
          ref={tipeKulitRef}
          name="options"
          className="px-4 border text-[#454545] text-[12px] border-[#454545] rounded-lg h-[48px]"
          id=""
        >
          <option value="" className="text-white-300" disabled>
            Pilih Tipe Kulit
          </option>
          {tipeKulit.map((data, i) => (
            <option value={data.name} key={i}>
              {data.name}
            </option>
          ))}
        </select>
        <label className="text-[#454545] text-start  text-[12px]">
          Nama Layanan
        </label>
        <input
          ref={namaRef}
          type="text"
          placeholder="Contoh : Serum Retinol 100%"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">Harga</label>
        <input
          ref={hargaRef}
          type="text"
          placeholder="Contoh : 70.000"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          cara pakai
        </label>
        <input
          ref={cara_pakaiRef}
          type="text"
          placeholder="Masukan Cara pakai"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          Mamfaat
        </label>
        <input
          ref={manfaatRef}
          type="text"
          placeholder="Masukan Manfaat"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start  text-[12px]">
          Deskripsi Detail
        </label>
        <textarea
          ref={deskripsiRef}
          name=""
          id=""
          cols="auto"
          rows="2"
          className="border rounded-lg px-2 text-[12px] p-1"
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

export default TambahProduk;

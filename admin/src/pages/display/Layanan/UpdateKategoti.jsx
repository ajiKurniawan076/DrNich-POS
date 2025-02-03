import { useContext, useEffect, useState, useRef } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateKategoti = () => {
  const { setNav } = useContext(navContext);
  const navigate = useNavigate();
  const [gambar, setGambar] = useState(null);
  const namaKategoriRef = useRef(null);
  const deskripsiRef = useRef(null);
  const gambarRef = useRef(null);
  const [namaGambar, setNamaGambar] = useState("");

  // handleGambar
  const handleGambar = (e) => {
    e.preventDefault();
    const gambarData = gambarRef.current.files[0];
    console.log(gambarData);
    if (gambarData) {
      const validImage = ["image/jpeg", "image/png", "image/gif"];
      if (!validImage.includes(gambarData.type)) {
        alert("bukan gambar");
        setGambar(null);
        return;
      }
      setGambar(URL.createObjectURL(gambarData));
      setNamaGambar(gambarData.name);
    }
    // console.log(GambarData); //melihat detail file
  };

  useEffect(() => {
    setNav("Ubah Kategori");
  }, []);

  const handleSubmit = () => {
    const datadata = {
      namaKategori: namaKategoriRef.current.value,
      deskripsi: deskripsiRef.current.value,
      gambar: gambar,
    };
    // memasukan kedalam database
    // axios
    //   .post("", datadata)
    //   .then(
    //     (response) => response.status == 200 && navigate("../kategorilayanan")
    //   );

    const handlenavigasi = window.confirm(
      `nama kategori : ${datadata.namaKategori} anda yakin ?`
    );
    if (handlenavigasi) {
      //   navigate("../kategorilayanan");
    }

    // console.log(datadata);
  };

  document.title = "Ubah Ketegori";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col justify-between bg-white min-h-screen px-3 py-3 gap-3 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-1 px-3">
        <div className="flex flex-col">
          <label className="text-start text-[454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={gambar}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {/* belum ada gambar = belum ada gambar */}
              {!gambar ? (
                <p className="text-[#454545] mb-3">belum ada gambar</p>
              ) : (
                <p className="text-[#454545] mb-3">{namaGambar}</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                {/* belum ada gambar = pilih gambar */}
                <input
                  accept="image/*"
                  onChange={handleGambar}
                  ref={gambarRef}
                  type="File"
                  className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                />
              </div>
              <p className="text-start text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal ukuran 100mb{" "}
              </p>
            </div>
          </div>
          <label className="text-[#454545] text-start  text-[12px] mt-2">
            Nama Kategori
          </label>
          <input
            ref={namaKategoriRef}
            type="text"
            placeholder="Contoh : Facial Series"
            className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
          />
          <label className="text-[#454545] text-start  text-[12px] mt-2">
            Deskripsi
          </label>
          <textarea
            ref={deskripsiRef}
            name=""
            id=""
            cols="auto"
            rows="5"
            className="border rounded-lg text-[12px] p-2"
            placeholder="Masukan Deskripsi"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={!gambar}
        className={`
        ${
          !gambar
            ? "bg-[#DCDCDC] border-2 "
            : "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
        }
        flex justify-center items-center h-[44px] text-white font-medium rounded-lg`}
      >
        Simpan
      </button>
    </form>
  );
};

export default UpdateKategoti;

import { useContext, useEffect, useState, useRef } from "react";
import { navContext } from "../../../App2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const KategoriAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();

  const [namaGambar, setNamaGambar] = useState("");
  const [previewURL, setPreviewURL] = useState(null);

  const namaKategoriRef = useRef(null);
  const deskripsiRef = useRef(null);
  const gambarRef = useRef(null);

  useEffect(() => {
    setNav("Tambah Kategori");
    setLink("/pos/layananKategori");
  }, []);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const handleGambar = () => {
    const gambarData = gambarRef.current.files[0];

    if (gambarData) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(gambarData.type)) {
        toast.error("File bukan gambar yang valid!");
        setNamaGambar("");
        setPreviewURL(null);
        return;
      }
      setNamaGambar(gambarData.name);
      setPreviewURL(URL.createObjectURL(gambarData)); // Generate preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaKategoriRef.current.value || !deskripsiRef.current.value) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("nama", namaKategoriRef.current.value);
    fdata.append("deskripsi", deskripsiRef.current.value);
    if (gambarRef.current.files.length > 0) {
      fdata.append("foto", gambarRef.current.files[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/tambahJenisLayanan`,
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
          navigate("/pos/kategorilayanan");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Gagal menambahkan kategori treatment, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "Gagal menambahkan kategori treatment, coba lagi!"
      );
    }
  };

  document.title = "Tambah Kategori";

  return (
    <form
      className="flex flex-col justify-between bg-white min-h-screen px-3 py-3 gap-3 w-full"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 px-3">
        <ToastContainer />
        <div className="flex flex-col">
          <label className="text-start text-[12px] text-[#454545]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={previewURL || "https://via.placeholder.com/115"} // Default placeholder
              alt="Preview"
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              <p className="text-[#454545] mb-3">
                {namaGambar || "Belum ada gambar"}
              </p>
              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  accept="image/*"
                  onChange={handleGambar}
                  ref={gambarRef}
                  type="file"
                  className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                />
              </div>
              <p className="text-start text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal ukuran 100MB
              </p>
            </div>
          </div>
          <label className="text-[#454545] text-start text-[12px] mt-2">
            Nama Kategori
          </label>
          <input
            ref={namaKategoriRef}
            type="text"
            placeholder="Contoh: Facial Series"
            className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
          />
          <label className="text-[#454545] text-start text-[12px] mt-2">
            Deskripsi
          </label>
          <textarea
            ref={deskripsiRef}
            rows="5"
            className="border rounded-lg text-[12px] p-2"
            placeholder="Masukkan deskripsi"></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#EAC564] to-[#C2A353] hover:opacity-90 flex justify-center items-center h-[44px] text-white font-medium rounded-lg">
        Simpan
      </button>
    </form>
  );
};

export default KategoriAdd;

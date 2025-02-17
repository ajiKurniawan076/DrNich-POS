import { useContext, useEffect, useState, useRef } from "react";
import { navContext } from "../../../App2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const UpdateKategoti = () => {
  const { id } = useParams();
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();

  const [namaGambar, setNamaGambar] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const namaKategoriRef = useRef(null);
  const deskripsiRef = useRef(null);
  const gambarRef = useRef(null);

  // ✅ Fetch Data
  const fetchJenisLayanan = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/getJenisLayananById/${id}`
      );

      if (namaKategoriRef.current) namaKategoriRef.current.value = data.nama;
      if (deskripsiRef.current) deskripsiRef.current.value = data.deskripsi;

      // ✅ Correct Image Handling
      if (data.foto) {
        setPreviewURL(`${import.meta.env.VITE_BASE_URL_BACKEND}/${data.foto}`);
        setNamaGambar(data.foto);
      } else {
        setPreviewURL(null);
        setNamaGambar("Belum ada gambar");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memuat data!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Load Data on Mount
  useEffect(() => {
    setNav("Ubah Kategori");
    setLink(`/pos/kategoridetail/${id}`);
    fetchJenisLayanan();
  }, [id]);

  // ✅ Cleanup Preview URL
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  // ✅ Handle Image Upload
  const handleGambar = () => {
    const file = gambarRef.current.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Format gambar harus .jpg, .png, atau .gif!");
        setNamaGambar("");
        setPreviewURL(null);
        return;
      }

      setNamaGambar(file.name);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaKategoriRef.current.value || !deskripsiRef.current.value) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("nama", namaKategoriRef.current.value);
    formData.append("deskripsi", deskripsiRef.current.value);

    if (gambarRef.current.files.length > 0) {
      formData.append("foto", gambarRef.current.files[0]);
    }

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/layanan/updateJenisLayanan/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Berhasil mengedit kategori!");
        setTimeout(() => navigate("/pos/kategorilayanan"), 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui kategori!"
      );
    }
  };

  document.title = "Ubah Kategori";

  return (
    <form
      className="flex flex-col justify-between bg-white min-h-screen px-3 py-3 gap-3 w-full"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 px-3">
        <ToastContainer />
        <div className="flex flex-col">
          {/* ✅ Upload Foto */}
          <label className="text-start text-[12px] text-[#454545]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            <img
              src={previewURL || "https://via.placeholder.com/115"}
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

          {/* ✅ Nama Kategori */}
          <label className="text-[#454545] text-start text-[12px] mt-2">
            Nama Kategori
          </label>
          <input
            ref={namaKategoriRef}
            type="text"
            placeholder="Contoh: Facial Series"
            className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
          />

          {/* ✅ Deskripsi */}
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

      {/* ✅ Submit Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-[#EAC564] to-[#C2A353] hover:opacity-90 flex justify-center items-center h-[44px] text-white font-medium rounded-lg">
        Simpan
      </button>
    </form>
  );
};

export default UpdateKategoti;

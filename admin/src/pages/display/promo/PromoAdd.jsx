import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { navContext } from "../../../App2";

const PromoAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();

  // State untuk menyimpan data
  const [name, setName] = useState("");
  const [syarat, setSyarat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [namaGambar1, setNamaGambar1] = useState("");
  const [namaGambar2, setNamaGambar2] = useState("");
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);

  // Refs untuk input file
  const imageDesktopRef = useRef(null);
  const imageMobileRef = useRef(null);
  const namaRef = useRef(null);
  const syaratRef = useRef(null);
  const DeskripsiRef = useRef(null);

  useEffect(() => {
    setNav("Tambah Promo");
    setLink("/pos/displayPromo");
    document.title = "Tambah Promo";
  }, []);

  // Handle pemilihan gambar
  const handleGambar = (event, setPreview, setNamaGambar) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (!validImageTypes.includes(file.type)) {
        toast.error("File harus berupa gambar (JPG, PNG, GIF)");
        return;
      }
      setPreview(URL.createObjectURL(file));
      setNamaGambar(file.name);
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !syarat ||
      !deskripsi ||
      !imageDesktopRef.current.files[0] ||
      !imageMobileRef.current.files[0]
    ) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("nama", name);
    fdata.append("syarat", syarat);
    fdata.append("detail", deskripsi);
    fdata.append("fotoDesktop", imageDesktopRef.current.files[0]);
    fdata.append("fotoMobile", imageMobileRef.current.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/tambahpromo`,
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
        toast.success("Berhasil menambahkan Promo");
        setTimeout(() => {
          navigate("/pos/promo");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menambahkan Promo, coba lagi!"
      );
    }
  };

  return (
    <form
      className="flex flex-col px-3 py-4 gap-4 bg-white w-full min-h-screen"
      onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="flex flex-col gap-3">
        {/* Upload Foto Desktop */}
        <div>
          <label className="text-[#454545] text-[14px]">
            Upload Foto Desktop
          </label>
          <div className="flex items-center gap-4">
            <img
              src={imagePreview1}
              alt=""
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div>
              <p className="text-[#454545] text-[12px]">
                {namaGambar1 || "Belum Ada Gambar"}
              </p>
              <input
                type="file"
                accept="image/*"
                ref={imageDesktopRef}
                className="border border-[#C2A353] h-[30px] w-[100px] rounded shadow-sm text-[12px]"
                onChange={(e) =>
                  handleGambar(e, setImagePreview1, setNamaGambar1)
                }
              />
              <p className="text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal 100MB
              </p>
            </div>
          </div>
        </div>

        {/* Upload Foto Mobile */}
        <div>
          <label className="text-[#454545] text-[14px]">
            Upload Foto Mobile
          </label>
          <div className="flex items-center gap-4">
            <img
              src={imagePreview2}
              alt=""
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div>
              <p className="text-[#454545] text-[12px]">
                {namaGambar2 || "Belum Ada Gambar"}
              </p>
              <input
                type="file"
                accept="image/*"
                ref={imageMobileRef}
                className="border border-[#C2A353] h-[30px] w-[100px] rounded shadow-sm text-[12px]"
                onChange={(e) =>
                  handleGambar(e, setImagePreview2, setNamaGambar2)
                }
              />
              <p className="text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal 100MB
              </p>
            </div>
          </div>
        </div>

        {/* Input Nama Kategori */}
        <label className="text-[#454545] text-[14px]">Judul Promo</label>
        <input
          ref={namaRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Promo Akhir Tahun"
          className="px-3 py-2 border text-[14px] border-black/30 rounded-lg"
        />

        {/* Input Review */}
        <label className="text-[#454545] text-[14px]">Syarat</label>
        <textarea
          ref={syaratRef}
          value={syarat}
          onChange={(e) => setSyarat(e.target.value)}
          className="border rounded-lg text-[14px] p-2"
          placeholder="Tulis review di sini..."
          rows="4"></textarea>

        <label className="text-[#454545] text-[14px]">Deskripsi</label>
        <textarea
          ref={DeskripsiRef}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded-lg text-[14px] p-2"
          placeholder="Tulis review di sini..."
          rows="4"></textarea>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="mt-4 w-full h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg">
        Simpan
      </button>
    </form>
  );
};

export { PromoAdd };

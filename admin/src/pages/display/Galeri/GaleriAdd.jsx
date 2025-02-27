import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { navContext } from "../../../App2";

import { ToastContainer, toast } from "react-toastify";

export const GaleriAdd = () => {
  const { setNav } = useContext(navContext);
  const navigate = useNavigate();
  const gambarRef = useRef(null)

  const [formData, setFormData] = useState({
    prev: '',
    judul: "",
    thumbnail: "", // Ensure consistency in naming
    link: "",
    channel: "",
    sosmed: "",
    deskripsi: "",
  });

  const [nameFile, setNameFile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setNav("Tambah Galeri");
  }, []);

  const handleAddContent = async (e) => {
    e.preventDefault();
    console.log("token", localStorage.getItem("token"));
    console.log(formData)
    const fdata = new FormData()
    fdata.append( 'judul', formData.judul )
    fdata.append( 'thumbnail', formData.thumbnail )// Ensure consistency in naming
    fdata.append( 'link', formData.link )
    fdata.append( 'channel', formData.channel )
    fdata.append( 'sosmed', formData.sosmed )
    fdata.append( 'deskripsi', formData.deskripsi )

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/gallery/createGaleri`,
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
        toast.success("Galeri added successfully!");
        setTimeout(() => {
          toast.success("Redirecting...");
          navigate("/pos/galeri");
        }, 3000);
      } else {
        setError("Failed to add promo. Please try again later.");
        toast.error("Failed to add galeri. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding promo:", err.message);
      setError("Failed to add promo. Please try again later.");
      toast.error("Failed to add galeri. Please try again later.");
    }
  };

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No image selected");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG and PNG files are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB size limit
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      setFormData({ ...formData, prev: reader.result, thumbnail: gambarRef.current.files[0] })
      setNameFile(file.name); // Set the file name
    };
  };

  document.title = "Tambah Galeri";

  return (
    <form
      className="flex flex-col px-0 p-3 gap-2 bg-white w-full h-fit"
      onSubmit={handleAddContent}>
      <ToastContainer />
      <div className="flex flex-col gap-1 px-3">
        <div className="flex flex-col">
          <label className="text-start text-[#454545] text-[12px]">
            Upload Foto
          </label>
          <div className="flex gap-6">
            {formData.prev ? (
              <img
                src={formData.prev}
                alt={formData.judul}
                className="h-[115px] w-[115px] rounded shadow-lg border"
              />
            ) : (
              <div className="h-[115px] w-[115px] bg-white rounded shadow-lg border flex items-center justify-center">
                <h1 className="w-full text-center">Masukan gambar</h1>
              </div>
            )}

            <div className="flex flex-col items-start text-[10px]">
              <p className="text-[#454545] mb-3">{nameFile || "File name"}</p>
              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  type="file"
                  ref={gambarRef}
                  className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                  onChange={convertBase64} // Fix: Add this event handler
                />
              </div>
              <p className="text-start text-[10px] text-[#BDBDBD]">
                *Upload foto dengan format .jpg .png maksimal ukuran 5MB{" "}
              </p>
            </div>
          </div>
        </div>

        <label className="text-[#454545] text-start text-[12px]">Judul</label>
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
          placeholder="Masukan Judul Youtube"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />

        <label className="text-[#454545] text-start text-[12px]">
          Link Youtube
        </label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="Masukan Link Youtube"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />

        <label className="text-[#454545] text-start text-[12px]">
          Nama Channel
        </label>
        <input
          type="text"
          name="channel"
          value={formData.channel}
          onChange={(e) =>
            setFormData({ ...formData, channel: e.target.value })
          }
          placeholder="contoh: dr. nich beauty aesthetic"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />

        <label className="text-[#454545] text-start text-[12px]">
          Sosial Media
        </label>
        <input
          type="text"
          name="sosmed"
          value={formData.sosmed}
          onChange={(e) => setFormData({ ...formData, sosmed: e.target.value })}
          placeholder="contoh: youtube"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />

        <label className="text-[#454545] text-start text-[12px]">
          Deskripsi Detail
        </label>
        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={(e) =>
            setFormData({ ...formData, deskripsi: e.target.value })
          }
          className="border rounded-lg text-[12px] p-2"
          placeholder="Masukan deskripsi"
        />

        <button
          type="submit"
          className="h-[44px] mt-4 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default GaleriAdd;

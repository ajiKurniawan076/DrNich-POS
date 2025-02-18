import { useRef, useState } from "react";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const MesinEdit = () => {
    const {id} = useParams()
    const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [gambarname, setGambarName] = useState("");
  const [gambar, setgambar] = useState(null);

  useEffect(() => {
    const fachingData = async() => {
        await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getmesinbyid/${id}`).then(
          (response)=>setgambar(response.data.foto)
        )
      }
      fachingData()
    setNav("Ubah Mesin");
  }, []);

  const handleImg = (e) => {
    e.preventDefault();
    const fileImage = imageRef.current.files[0];
    console.log(fileImage);
    if (fileImage) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(fileImage.type)) {
        alert("bukan gambar");
        setgambar(null);
        return;
      }
      setgambar(URL.createObjectURL(fileImage));
    }
    setGambarName(fileImage.name);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const fdata = new FormData();
    if (imageRef.current.files.length > 0) {
      fdata.append("foto", imageRef.current.files[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/foto//editSertif/:id`,
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
        toast.success("Berhasil Memperbarui Mesin");
        setTimeout(() => {
          navigate("/pos/Mesin");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Gagal menambahkan Mesin, coba lagi!"
      );
      toast.error(
        error.response?.data?.message ||
          "Gagal menambahkan Mesin, coba lagi!"
      );
    }
  };

  document.title = "Ubah Mesin";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col px-0 p-3 gap-2 bg-white w-full min-h-screen justify-between"
      onSubmit={handleSubmit}
    >
      <ToastContainer/>
      <div className="flex flex-col gap-1 px-3 flex-grow">
        <div className="flex flex-col gap-2">
          <label className="text-start text-[#454545] text-[12px]">
            Upload foto Mesin
          </label>
          <div className="flex gap-6">
            <img
              src={gambar}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {gambar ? (
                <p className="text-[#454545] mb-3">{gambarname}</p>
              ) : (
                <p className="text-[#454545] mb-3">Belum ada gambar</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImg}
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
      </div>
      <div className="mt-auto w-full ">
        <button
          disabled={!gambar}
          type="submit"
          className={`flex justify-center items-center w-full h-[44px] text-white font-medium rounded-lg ${
            gambar
              ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
              : " bg-[#DCDCDC] border-2 "
          }`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
}


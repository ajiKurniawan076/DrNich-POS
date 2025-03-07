import { useContext, useEffect, useState } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export const GaleriDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lokasi = useLocation();
  const dummyData = lokasi.state;
  const { setNav, setLink } = useContext(navContext);
  const [judul, setJudul] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [linkSosmed, setLinkSosmed] = useState("");
  const [channel, setChannel] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sosmed, setSosmed] = useState("");

  const fetchData = async () => {
    try {
      const response = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/gallery/getGaleriById/${id}`
        )
      ).data;
      setJudul(response.judul);
      setThumbnail(response.thumbnail);
      setLinkSosmed(response.link);
      setChannel(response.channel);
      setDeskripsi(response.deskripsi);
      setSosmed(response.sosmed);
      console.log("data: ", response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data. Please try again later.");
    }
  };

  const deleteGallery = async () => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/gallery/deleteGaleri/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Galeri deleted successfully!");
      setTimeout(() => {
        toast.success("Redirecting...");
        navigate("/pos/galeri");
      }, 3000);
      navigate(`/pos/galeridetail/${id}`);
    } catch (error) {
      toast.error("Failed to delete gallery. Please try again later.");
      console.error("Error deleting promo:", error.message);
    }
    console.log("Delete promo with id:", id);
  };

  useEffect(() => {
    fetchData();
    setNav("Detail");
    setLink("/pos/galeri");
  }, []);

const handleHapus = () => {
    try{
    axios.delete(`${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/gallery/deletegaleri/${id}`).then(
      response =>{
        response.status==200 && toast.success("Berhasil Menghapus Galeri")
        setTimeout(()=>{
          toast.success('Kembali ke halaman Galeri')
          navigate('/pos/galeri')
        },1000)
      }
    )
  }
    catch{
      toast.error("Gagal menghapus Sertifikat")
    }
  }


  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <ToastContainer />
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 gap-5">
        <div className="flex flex-col text-[12px] w-full gap-2 border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={thumbnail} alt="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Judul</p>
            <p className="text-[#454545]">{judul}</p>
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">link</p>
            <p className="text-[#454545]">{linkSosmed}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Nama channel</p>
            <p className="text-[#454545]">{channel}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Sosial Media</p>
            <p className="text-[#454545]">{sosmed}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{deskripsi}</p>
          </div>
        </div>
        <div className="flex gap-1">
        <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </button>
          <Link
            to={{ pathname: `/pos/UpdateGaleri/${id}` }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] ">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GaleriDetail;

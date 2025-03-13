import { useRef, useState, useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";


export const MarketingAdd = () => {
  const navigate = useNavigate();
  const { setNav, setLink } = useContext(navContext);

  const namaMarketingRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const namaRekeningRef = useRef(null);
  const bankRef = useRef(null);
  const nomorRekeningRef = useRef(null);
  const imageRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const [norek, setNorek] = useState('')
  const [norekR, setNorekR] = useState('')
  const [notel, setNotel] = useState('')
  const [notelR, setNotelR] = useState('')

  const checkFormFilled = () => {
    if (
      namaMarketingRef.current?.value &&
      nomorTeleponRef.current?.value &&
      alamatRef.current?.value &&
      namaRekeningRef.current?.value &&
      nomorRekeningRef.current?.value &&
      bankRef.current?.value
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);  // State to hold the image preview URL

  // Function to trigger file input click
  const choseFile = (e) => {
    e.preventDefault();
    imageRef.current.click();  // Trigger file input click
  };

  // Function to handle file selection and update the preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fdata = new FormData();

    fdata.append('namaMarketing', namaMarketingRef.current.value);
    fdata.append('nomorTelepon', notelR);
    fdata.append('alamat', alamatRef.current.value);
    fdata.append('keterangan', keteranganRef.current.value);
    fdata.append('namaRekening', namaRekeningRef.current.value);
    fdata.append('nomorRekening', norekR);
    fdata.append('bank', bankRef.current.value);
    fdata.append('image', imageRef.current.files[0]);

    // axios
    //   .post("https://api.drnich.co.id/api/pos/user/marketing", fdata)
    //   .then((response) => {
    //     response.status == 200 && navigate("../marketing");
    //   });
    try {
      const response = await axios.post("https://api.drnich.co.id/api/pos/user/marketing", fdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        toast.success("Marketing berhasil ditambahkan!");
      setTimeout(() => {
        toast.success("Redirecting...");
        window.location.href = "/pos/marketing";
      }, 1500);
      } else {
        toast.error("Gagal menambahkan Marketing");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menambahkan Marketing");
    }
  };

  useEffect(() => {
    setNav("Tambah Marketing");
    setLink('/pos/marketing')
  }, []);

  const NoTel = () => {
    const a = nomorTeleponRef.current.value.replace(/\D/g, "")
    setNotelR(a)
    setNotel((a))
  }
  const Norek = () => {
    const a = nomorRekeningRef.current.value.replace(/\D/g, "")
    setNorekR(a)
    setNorek((a))
  }

  document.title = "Tambah Marketing";

  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col px-3 h-full">
        <label className="text-start font-semibold mb-[5px]">Nama Lengkap *</label>
        <input
          ref={namaMarketingRef}
          type="text"
          placeholder="Contoh : Nikita"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Nomor Telepon * ( Diawali Dengan 62***** )</label>
        <input
          ref={nomorTeleponRef}
          value={notel}
          onChange={NoTel}
          type="text"
          placeholder="Contoh : 6281*********"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Alamat *</label>
        <input
          ref={alamatRef}
          type="text"
          placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Upload Foto KTP *</label>
        <input
          ref={imageRef}
          hidden
          type="file"
          className="min-h-[335-px]"
          onChange={handleFileChange}  // Handle file change event
        />
        <button onClick={choseFile}>
          <img src={ktp} alt="Upload KTP" className="w-full md:w-[50%]" />
        </button>
        
        {imagePreview && (
          <div className="mt-4">
            <h3>Preview:</h3>
            <img src={imagePreview} alt="KTP Preview" className="w-full md:w-[50%] mt-2" />
          </div>
        )}
      </div>

      <div className="text-start font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>

      <div className="flex flex-col px-3">
        <label className="text-start font-semibold mb-[5px]">Nama Pemilik Rekening *</label>
        <input
          ref={namaRekeningRef}
          type="text"
          placeholder="Contoh : Hana"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Bank *</label>
        <input
          ref={bankRef}
          type="text"
          placeholder="Contoh : BCA"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Nomor Rekening *</label>
        <input
          ref={nomorRekeningRef}
          value={norek}
          onChange={Norek}
          type="text"
          placeholder="Contoh : 5670019288493"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        
        <label className="text-start font-semibold mb-[5px]">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
        <input
          ref={keteranganRef}
          type="text"
          placeholder="Contoh : Admin PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
      </div>

      <div className="mt-4 w-full h-full px-3">
        <button
          type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
    <ToastContainer/>
    </form>
  );
};

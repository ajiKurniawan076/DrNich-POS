import { useRef, useState, useEffect, useContext } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export const UpdateMarketing = () => {
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
  const { id } = useParams();
  const [datax, setDatax] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [isFilled, setIsFilled] = useState(false)
  const [norek, setNorek] = useState('')
  const [norekR, setNorekR] = useState('')
  const [notel, setNotel] = useState('')
  const [notelR, setNotelR] = useState('')

  const checkFormFilled = () => {
    if (
      namaMarketingRef.current.value &&
      nomorTeleponRef.current.value &&
      alamatRef.current.value &&
      namaRekeningRef.current.value &&
      bankRef.current.value &&
      nomorRekeningRef.current.value
    ) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  } 

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fdata = new FormData();
    fdata.append('namaMarketing', namaMarketingRef.current.value);
    fdata.append('nomorTelepon', notelR);
    fdata.append('alamat', alamatRef.current.value);
    fdata.append('keterangan', keteranganRef.current.value);
    fdata.append('namaRekening', namaRekeningRef.current.value);
    fdata.append('bank', bankRef.current.value);
    fdata.append('nomorRekening', norekR);
    if (imageFile) {
      fdata.append('image', imageFile); // Append the image if there's a selected file
    }

    axios
      .put(`https://api.drnich.co.id/api/pos/user/updatemarketing/${id}`, fdata, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          navigate("../marketing"); // Redirect after successful update
        } else {
          alert("Gagal menyimpan data!");
        }
      })
      .catch((error) => {
        console.error("Error saat menyimpan data:", error);
      });
    try {
            const response = await axios.put(`https://api.drnich.co.id/api/pos/user/updatemarketing/${id}`, 
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
          toast.success("Berhasil Edit Pelanggan");
          setNotelR(fdata.nomorTelepon);
          setNorekR(fdata.nomorRekening);
          setNotel(fdata.nomorTelepon);
          setNorek(fdata.nomorRekening);
        setTimeout(() => {
            toast.success("Redirecting...");
            window.location.href = "/pos/marketing";
        }, 1500); // Redirect ke halaman supplier
        } else {
        toast.error(response.data.message || "Gagal Edit Pelanggan");
        }
        } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat Edit Pelanggan");
        }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.drnich.co.id/api/pos/user/marketing/${id}`
        );
        setDatax(response.data);
        setNotel(response.data.nomorTelepon || "");
        setNorek(response.data.nomorRekening || "");
        setNotelR(response.data.nomorTelepon || "");
        setNorekR(response.data.nomorRekening || "");
        if (response.data.image) {
          setImagePreview(response.data.image); // Set the current image from the server if available
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setLink('/pos/marketing')
    setNav("Edit Marketing");
    document.title = "Edit Marketing";
  }, [id]);


  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Lengkap *</label>
        <input
          ref={namaMarketingRef}
          defaultValue={datax.namaMarketing}
          type="text"
          placeholder="Contoh : Nikita"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Nomor Telepon * ( Diawali Dengan 62***** )</label>
          <input
          ref={nomorTeleponRef}
          value={notel}
            onChange={NoTel}
            type="text"
            placeholder="Contoh : 62892323232"
            className="border border-[#BDBDBD] rounded-xl py-2 px-3"
          />
        <label className="text-start font-semibold">Alamat *</label>
        <input
          ref={alamatRef}
          defaultValue={datax.alamat}
          type="text"
          placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Upload Foto KTP *</label>
        <input
          ref={imageRef}
          hidden
          type="file"
          onChange={handleFileChange} // Handle file change
        />
        <button
          type="button"
          onClick={(e) => imageRef.current.click()} // Trigger file input click
          className="min-h-[335-px]"
        >
          <img src={ktp} alt="Upload KTP" className="w-full md:w-[50%]" />
        </button>

        {/* Show image preview only if there is one */}
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

      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Pemilik Rekening *</label>
        <input
          ref={namaRekeningRef}
          defaultValue={datax.namaRekening}
          type="text"
          placeholder="Contoh : Hana"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Bank *</label>
        <input
          ref={bankRef}
          defaultValue={datax.bank}
          type="text"
          placeholder="Contoh : BCA"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Nomor Rekening *</label>
        <input
          ref={nomorRekeningRef}
          onChange={Norek}
          value={norek}
          type="text"
          placeholder="Contoh : 5670019288493"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
        <input
          ref={keteranganRef}
          defaultValue={datax.keterangan}
          type="text"
          placeholder="Contoh : Admin PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
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

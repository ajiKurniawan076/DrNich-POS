import { useRef, useState, useEffect, useContext } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg"; // Default KTP image
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const TerapisUpdate = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null); // Store image preview
  const [imageFile, setImageFile] = useState(null); // Store the selected image file

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/user/terapis/${id}`)
        .then((response) => setDatax(response.data));
    };
    fetchData();

    setNav("Ubah Terapis");
    setLink('/pos/terapis')
  }, [id]);

  const navigate = useNavigate();
  const namaTerapisRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const namaRekeningRef = useRef(null);
  const nomorRekeningRef = useRef(null);
  const bankRef = useRef(null);
  const imageRef = useRef(null); // Ref for the image input
  const [isFilled, setIsFilled] = useState(false)

  const checkFormFilled = () => {
    if (
      namaTerapisRef.current?.value &&
      nomorTeleponRef.current?.value &&
      alamatRef.current?.value &&
      namaRekeningRef.current?.value &&
      nomorRekeningRef.current?.value &&
      bankRef.current?.value
    ) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview of the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.append('namaTerapis', namaTerapisRef.current.value);
    fdata.append('nomorTelepon', nomorTeleponRef.current.value);
    fdata.append('alamat', alamatRef.current.value);
    fdata.append('keterangan', keteranganRef.current.value);
    fdata.append('namaRekening', namaRekeningRef.current.value);
    fdata.append('nomorRekening', nomorRekeningRef.current.value);
    fdata.append('bank', bankRef.current.value);
    if (imageFile) {
      fdata.append('image', imageFile); // Append the selected image if available
    }

    axios
      .put(`https://api.drnich.co.id/api/pos/user/updateterapis/${id}`, fdata, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      })
      .then((response) => {
        response.status === 200 && navigate(`../terapis`); // Redirect after successful update
      });
  };

  document.title = "Ubah Terapis";

  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Lengkap</label>
        <input
          ref={namaTerapisRef}
          defaultValue={datax.namaTerapis}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Nomor Telepon</label>
        <input
          defaultValue={datax.nomorTelepon}
          ref={nomorTeleponRef}
          type="number"
          placeholder="Contoh : 0892323232"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Alamat</label>
        <input
          defaultValue={datax.alamat}
          ref={alamatRef}
          type="text"
          placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />

        <label className="text-start font-semibold">Upload Foto KTP</label>
        <input
          ref={imageRef}
          type="file"
          hidden
          onChange={handleFileChange} // Handle file selection
        />
        <button
          type="button"
          onClick={() => imageRef.current.click()} // Trigger file input on click
          className="min-h-[335-px]"
        >
          <img
            src={ktp} // Show image preview if available, otherwise default to ktp.svg
            alt="KTP"
            className="w-full md:w-[50%]"
          />
        </button>

        {/* Optional: Show image preview if available */}
        {imagePreview && (
          <div className="mt-4">
            <h3>Preview:</h3>
            <img src={imagePreview} alt="Preview KTP" className="w-full md:w-[50%]" />
          </div>
        )}
      </div>

      <div className="text-start font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
        <span className="ms-2">Informasi Rekening</span>
      </div>

      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Pemilik Rekening</label>
        <input
          defaultValue={datax.namaRekening}
          ref={namaRekeningRef}
          type="text"
          placeholder="Contoh : Hana"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />

        <label className="text-start font-semibold">Bank</label>
        <input
          defaultValue={datax.bank}
          ref={bankRef}
          type="text"
          placeholder="Contoh : BCA"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />

        <label className="text-start font-semibold">Nomor Rekening</label>
        <input
          defaultValue={datax.nomorRekening}
          ref={nomorRekeningRef}
          type="number"
          placeholder="Contoh : 5670019288493"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />

        <label className="text-start font-semibold">Keterangan</label>
        <input
          defaultValue={datax.keterangan}
          ref={keteranganRef}
          type="text"
          placeholder="Contoh : Admin PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
      </div>

      <div className="w-full h-full px-3 mt-auto">
        <button
          type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

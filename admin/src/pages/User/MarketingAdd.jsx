import { useRef, useState, useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MarketingAdd = () => {
  const navigate = useNavigate();
  const { setNav } = useContext(navContext);

  const namaMarketingRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const namaRekeningRef = useRef(null);
  const bankRef = useRef(null);
  const nomorRekeningRef = useRef(null);
  const imageRef = useRef(null);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const fdata = new FormData();

    fdata.append('namaMarketing', namaMarketingRef.current.value);
    fdata.append('nomorTelepon', nomorTeleponRef.current.value);
    fdata.append('alamat', alamatRef.current.value);
    fdata.append('keterangan', keteranganRef.current.value);
    fdata.append('namaRekening', namaRekeningRef.current.value);
    fdata.append('nomorRekening', nomorRekeningRef.current.value);
    fdata.append('bank', bankRef.current.value);
    fdata.append('image', imageRef.current.files[0]);

    axios
      .post("https://api.drnich.co.id/api/pos/user/marketing", fdata)
      .then((response) => {
        response.status == 200 && navigate("../marketing");
      });
  };

  useEffect(() => {
    setNav("Tambah Marketing");
  }, [setNav]);

  document.title = "Tambah Marketing";

  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Lengkap</label>
        <input
          ref={namaMarketingRef}
          type="text"
          placeholder="Contoh : Nikita"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Nomor Telepon</label>
        <input
          ref={nomorTeleponRef}
          type="text"
          placeholder="Contoh : 0892323232"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Alamat</label>
        <input
          ref={alamatRef}
          type="text"
          placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Upload Foto KTP</label>
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

      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">Nama Pemilik Rekening</label>
        <input
          ref={namaRekeningRef}
          type="text"
          placeholder="Contoh : Hana"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Bank</label>
        <input
          ref={bankRef}
          type="text"
          placeholder="Contoh : BCA"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Nomor Rekening</label>
        <input
          ref={nomorRekeningRef}
          type="text"
          placeholder="Contoh : 5670019288493"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        
        <label className="text-start font-semibold">Keterangan</label>
        <input
          ref={keteranganRef}
          type="text"
          placeholder="Contoh : Admin PT.BEAUTY"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
      </div>

      <div className="mt-4 w-full h-full px-3">
        <button
          type="submit"
          className="bg-[#BDBDBD] text-[14px] text-white w-full rounded-xl p-3"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

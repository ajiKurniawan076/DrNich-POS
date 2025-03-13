import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import axios from "axios";
import { set } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Editsupplier = () => {
    const navigate = useNavigate();
    const namaPerusahaanRef = useRef(null);
    const namaKontakRef = useRef(null);
    const emailRef = useRef(null);
    const noTeleponRef = useRef(null);
    const AlamatRef = useRef(null);
    const keteranganRef = useRef(null);
    const namaRekeningRef = useRef(null);
    const bankRef = useRef(null);
    const nomorRekeningRef = useRef(null);
    const keteranganRekRef = useRef(null);
    const [datax, setDatax] = useState([]);
    const { id } = useParams();
    const { setNav, setLink } = useContext(navContext);
    const [isFilled, setIsFilled] = useState(false)
    const [notel, setNotel] = useState('');
    const [notelR, setNotelR] = useState('')
    const [norek, setNorek] = useState('')
    const [norekR, setNorekR] = useState('')

    const checkFormFilled = () => {
        if (
            namaPerusahaanRef.current?.value &&
            namaKontakRef.current?.value &&
            noTeleponRef.current?.value &&
            namaRekeningRef.current?.value &&
            AlamatRef.current?.value &&
            bankRef.current?.value &&
            nomorRekeningRef.current?.value
        ) {
            setIsFilled(true)
        } else {
            setIsFilled(false)
        }

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
        namaPerusahaan: namaPerusahaanRef.current.value,
        namaKontak: namaKontakRef.current.value,
        email: emailRef.current.value,
        nomorTelepon: notelR,
        alamat: AlamatRef.current.value,
        keterangan: keteranganRef.current.value,
        namaRekening: namaRekeningRef.current.value,
        bank: bankRef.current.value,
        nomorRekening: norekR,
        keteranganRek: keteranganRekRef.current.value,
        };
        console.log(data);
        try {
            const response = await axios.put(
            `https://api.drnich.co.id/api/pos/user/updatesupplier/${id}`,
                data,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
            }
        );

        if (response.status === 200) {
        toast.success("Berhasil Edit Supplier");
        setTimeout(() => {
            toast.success("Redirecting...");
            window.location.href = "/pos/supplier";
        }, 1500); // Redirect ke halaman supplier
        } else {
        toast.error(response.data.message || "Gagal Edit Supplier");
        }
        } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat Edit Supplier");
        }
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.drnich.co.id/api/pos/user/supplier/${id}`);
                setDatax(response.data);
                setNotel(response.data.nomorTelepon || "");
                setNorek(response.data.nomorRekening || "");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        console.log(datax);
        setNav("Edit Supplier");
        document.title = "Edit Supplier";
        setLink('/pos/supplier')
    }, [id]);
    
    const NoTel = () => {
        const a = nomorTeleponRef.current.value.replace(/\D/g, "")
        setNotelR(a)
        setNotel(Number(a))
      }
      const Norek = () => {
        const a = nomorRekeningRef.current.value.replace(/\D/g, "")
        setNorekR(a)
        setNorek(Number(a))
      }

    return (
        <form
            onChange={checkFormFilled}
            onSubmit={handleSubmit}
            className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
        >
            <div className="flex flex-col gap-1 px-3">
                <label className="text-start font-semibold">
                    Nama Perusahaan *
                </label>
                <input
                    ref={namaPerusahaanRef}
                    defaultValue={datax.namaPerusahaan}
                    onSubmit={(e) => setDatax({...datax, namaPerusahaan: e.target.value})}
                    type="text"
                    placeholder="Contoh : PT.BEAUTY"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Nama Kontak *</label>
                <input
                    ref={namaKontakRef}
                    defaultValue={datax.namaKontak}
                    onSubmit={(e) => setDatax({...datax, namaKontak: e.target.value})}
                    type="text"
                    placeholder="Contoh : Agus"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Email *</label>
                <input
                    ref={emailRef}
                    defaultValue={datax.email}
                    onSubmit={(e) => setDatax({...datax, email: e.target.value})}
                    type="text"
                    placeholder="Contoh : agus@gmail.com"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">
                Nomor Telepon * ( Diawali Dengan 62***** )
                </label>
                <input
                    ref={noTeleponRef}
                    onSubmit={(e) => setDatax({ ...datax, nomorTelepon: e.target.value })}
                    onChange={NoTel}
                    value={notel}
                    type="text"
                    placeholder="Contoh : 6281000000000"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Alamat *</label>
                <input
                    ref={AlamatRef}
                    defaultValue={datax.alamat}
                    onSubmit={(e) => setDatax({...datax, alamat: e.target.value})}
                    type="text"
                    placeholder="Contoh : Jl.Merak No.10, Sidorejo, Kota Salatiga, Jawa Tengah, Indonesia"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
                <input
                    ref={keteranganRef}
                    defaultValue={datax.keterangan}
                    onSubmit={(e) => setDatax({...datax, keterangan: e.target.value})}
                    type="text"
                    placeholder="Contoh : Supplier Sunscreen"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
            </div>
            <div className="text-start  font-medium bg-[#F6F6F6] text-[#BDBDBD] my-3 py-2">
                <span className="ms-2">Informasi Rekening</span>
            </div>
            <div className="flex flex-col gap-1 px-3">
                <label className="text-start font-semibold">
                Nama Pemilik Rekening *
                </label>
                <input
                    ref={namaRekeningRef}
                    defaultValue={datax.namaRekening}
                    onSubmit={(e) => setDatax({...datax, namaRekening: e.target.value})}
                    type="text"
                    placeholder="Contoh : Hana"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Bank *</label>
                <input
                    ref={bankRef}
                    defaultValue={datax.bank}
                    onSubmit={(e) => setDatax({...datax, bank: e.target.value})}
                    type="text"
                    placeholder="Contoh : BCA"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">
                Nomor Rekening *
                </label>
                <input
                    ref={nomorRekeningRef}
                    onSubmit={(e) => setDatax({ ...datax, nomorRekening: e.target.value })}
                    value={norek}
                    onChange={Norek}
                    type="text"
                    placeholder="Contoh : 5670019288493"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Keterangan <span className="text-[#BDBDBD]">( Optional )</span></label>
                <input
                    ref={keteranganRekRef}
                    defaultValue={datax.keteranganRek}
                    onSubmit={(e) => setDatax({...datax, keteranganRek: e.target.value})}
                    type="text"
                    placeholder="Contoh : Admin PT.BEAUTY"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
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

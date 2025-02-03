import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import axios from "axios";
import { set } from "date-fns";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
        namaPerusahaan: namaPerusahaanRef.current.value,
        namaKontak: namaKontakRef.current.value,
        email: emailRef.current.value,
        nomorTelepon: noTeleponRef.current.value,
        alamat: AlamatRef.current.value,
        keterangan: keteranganRef.current.value,
        namaRekening: namaRekeningRef.current.value,
        bank: bankRef.current.value,
        nomorRekening: nomorRekeningRef.current.value,
        keteranganRek: keteranganRekRef.current.value,
        };
        console.log(data);
        axios
        .put(`https://api.drnich.co.id/api/pos/user/updatesupplier/${id}`, data) // Menggunakan method PUT
        .then((response) => {
            if (response.status === 200) {
                navigate("../supplier"); // Navigasi ke halaman lain setelah berhasil
            } else {
                alert("Gagal menyimpan data!");
            }
        })
        .catch((error) => {
            console.error("Error saat menyimpan data:", error);
            alert("Terjadi kesalahan saat menyimpan data!");
        });
    };

    const { setNav } = useContext(navContext);
    
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.drnich.co.id/api/pos/user/supplier/${id}`);
            setDatax(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, [id]);
    
    console.log(datax);
    setNav("Edit Supplier");
    document.title = "Edit Supplier";
    const [supstat, setsupstat] = useState(false);
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
        >
            <div className="flex flex-col gap-1 px-3">
                <label className="text-start font-semibold">
                    Nama Perusahaan
                </label>
                <input
                    ref={namaPerusahaanRef}
                    defaultValue={datax.namaPerusahaan}
                    onSubmit={(e) => setDatax({...datax, namaPerusahaan: e.target.value})}
                    type="text"
                    placeholder="Contoh : PT.BEAUTY"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Nama Kontak</label>
                <input
                    ref={namaKontakRef}
                    defaultValue={datax.namaKontak}
                    onSubmit={(e) => setDatax({...datax, namaKontak: e.target.value})}
                    type="text"
                    placeholder="Contoh : Agus"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Email</label>
                <input
                    ref={emailRef}
                    defaultValue={datax.email}
                    onSubmit={(e) => setDatax({...datax, email: e.target.value})}
                    type="text"
                    placeholder="Contoh : agus@gmail.com"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">
                Nomor Telepon
                </label>
                <input
                    ref={noTeleponRef}
                    defaultValue={datax.nomorTelepon}
                    onSubmit={(e) => setDatax({...datax, nomorTelepon: e.target.value})}
                    type="text"
                    placeholder="Contoh : 081000000000"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Alamat</label>
                <input
                    ref={AlamatRef}
                    defaultValue={datax.alamat}
                    onSubmit={(e) => setDatax({...datax, alamat: e.target.value})}
                    type="text"
                    placeholder="Contoh : Jl.Merak No.10, Sidorejo, Kota Salatiga, Jawa Tengah, Indonesia"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Keterangan</label>
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
                Nama Pemilik Rekening
                </label>
                <input
                    ref={namaRekeningRef}
                    defaultValue={datax.namaRekening}
                    onSubmit={(e) => setDatax({...datax, namaRekening: e.target.value})}
                    type="text"
                    placeholder="Contoh : Hana"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Bank</label>
                <input
                    ref={bankRef}
                    defaultValue={datax.bank}
                    onSubmit={(e) => setDatax({...datax, bank: e.target.value})}
                    type="text"
                    placeholder="Contoh : BCA"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">
                Nomor Rekening
                </label>
                <input
                    ref={nomorRekeningRef}
                    defaultValue={datax.nomorRekening}
                    onSubmit={(e) => setDatax({...datax, nomorRekening: e.target.value})}
                    type="text"
                    placeholder="Contoh : 5670019288493"
                    className="border border-[#BDBDBD] rounded-xl py-2 px-3"
                ></input>
                <label className="text-start font-semibold">Keterangan</label>
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
                    className="bg-[#BDBDBD] text-[14px] text-white w-full rounded-xl p-3"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

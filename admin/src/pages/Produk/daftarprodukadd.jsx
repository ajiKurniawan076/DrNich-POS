import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const DaftarProdukAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const [jenis, setJenis] = useState([]);
  const [availableKategori, setAvail] = useState([]);
  const [selectedJenis, setSelected] = useState("");
  const [selectedNamaJenis, setSelectedJenis] = useState("");
  const [kategori, setKategori] = useState([]);
  const [supplier, setSupplier] = useState([])
  const [profitrp, setProfitrp] = useState(0)
  const [profitprs, setProfitprs] = useState(0)
  const [hargaB, setHargaB] = useState('')
  const [hargaJ, setHargaj] = useState('')
  const [bonusT, setBonusT] = useState('')
  const [hargaBR, setHargaBR] = useState(0)
  const [hargaJR, setHargajR] = useState(0)
  const [bonusTR, setBonusTR] = useState(0)
  const supplierRef = useRef(null)
  const namaProdukRef = useRef(null);
  const SKURef = useRef(null)
  const HPPRef = useRef(null)
  const hargaJualRef = useRef(null);
  const hargaBeliRef = useRef(null);
  const kategoriRef = useRef(null);
  const bonusTerapisRef = useRef(null);
  const stokRef = useRef(null);
  const minStokRef = useRef(null);
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(false);

  const checkFormFilled = () => {
    if (
      namaProdukRef.current?.value &&
      SKURef.current?.value &&
      HPPRef.current?.value &&
      hargaJualRef.current?.value &&
      hargaBeliRef.current?.value &&
      kategoriRef.current?.value &&
      minStokRef.current?.value
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    console.log(isFilled);
  };


  useEffect(() => {
    const fetchall = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk")
        .then((response) => {
          const jenislist = response.data.map((item) => item.jenis);
          setJenis(jenislist);
        });

      await axios
        .get("https://api.drnich.co.id/api/pos/produk/kategoriproduk")
        .then((response) => {
          const kategorilist = response.data.map((item) => ({
            idjenis: item.jenis._id,
            jenis: item.jenis.jenis,
            kategori: item.kategori,
            idkategori: item._id,
          }));
          setKategori(kategorilist);
        });

      await axios
        .get('https://api.drnich.co.id/api/pos/user/supplier').then(
          response => response.status == 200 && setSupplier(response.data)
        )
    };
    fetchall();
    setNav("Tambah Produk");
    setLink('/pos/daftarProduk')
  }, []);
  // console.log(jenis);
  const CharB = () => {
    const a = hargaBeliRef.current.value.replace(/\D/g, "")
    setHargaBR(a)
    setHargaB(Number(a).toLocaleString("id-ID"))

  }
  const CharJ = () => {
    const b = hargaJualRef.current.value.replace(/\D/g, "")
    setHargajR(b)
    setHargaj(Number(b).toLocaleString("id-ID"))

  }
  const CbonT = () => {
    const c = bonusTerapisRef.current.value.replace(/\D/g, "")
    setBonusTR(c)
    setBonusT(Number(c).toLocaleString("id-ID"))

  }

  const jenisRef = useRef(null);
  const changeJenis = (e) => {
    e.preventDefault();
    const jeniss = jenisRef.current.value;
    // console.log(jenis);
    setSelected(jeniss);
  };
  const kategoriChange = (e) => {
    e.preventDefault();
    const kat = kategoriRef.current.value;
    const terpilih = kategori.find((item) => item.idkategori == kat);
    console.log(kat);
    setSelectedJenis(terpilih.idjenis);
  };

  useEffect(() => {
    const filterKategori = kategori.filter(
      (item) => item.jenis == selectedJenis
    );
    console.log(filterKategori);
    setAvail(filterKategori);
  }, [selectedJenis]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      jenis: selectedNamaJenis,
      namaProduk: namaProdukRef.current.value,
      sku: SKURef.current.value,
      hpp: HPPRef.current.value,
      hargaJual: hargaJR,
      hargaBeli: hargaBR,
      kategori: kategoriRef.current.value,
      bonusTerapis: bonusTR,
      stok: stokRef?.current?.value,
      minStok: minStokRef?.current?.value,
      supplier: supplierRef.current.value
    };
    console.log(data);
    try {
      const response = await axios.post(
        "https://api.drnich.co.id/api/pos/produk/produk",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        toast.success("Produk berhasil ditambahkan!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = "/pos/daftarproduk";
        }, 1500);
      } else {
        toast.error("Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("Error saat menambahkan produk:", error);
      toast.error("Terjadi kesalahan saat menambahkan produk");
    }

  };

  document.title = "Tambah Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col px-3 h-full">
        <label className="text-start font-semibold mb-[5px]">Jenis Produk</label>
        <select
          ref={jenisRef}
          onChange={changeJenis}
          name="options"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
          id="jenis"
        >
          <option value="" className="text-[#BDBDBD]" selected disabled>
            Pilih Jenis Produk
          </option>
          {jenis.map((item, i) => (
            <option key={i} value={item.jenis}>
              {item}
            </option>
          ))}
        </select>
        <label className="text-start font-semibold mb-[5px]">
          Kategori Produk
        </label>
        <select
          ref={kategoriRef}
          onChange={kategoriChange}
          name="options"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
          id="Gender"
        >
          <option value="" className="text-gray-300" selected disabled>
            Pilih Kategori Produk
          </option>
          {availableKategori.map((item, i) => (
            <option key={i} value={item.idkategori}>
              {item.kategori}
            </option>
          ))}
        </select>
        <label className="text-start font-semibold mb-[5px]">
          Pilih Suplier
        </label>
        <select
          ref={supplierRef}
          name="options"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
          id="Gender"
        >
          <option value="" className="text-gray-300" selected disabled>
            Pilih Supplier
          </option>
          {supplier.map((item, i) => (
            <option key={i} value={item._id}>
              {item.namaPerusahaan}
            </option>
          ))}
        </select>
        <label className="text-start font-semibold mb-[5px]">Nama Produk</label>
        <input
          ref={namaProdukRef}
          type="text"
          placeholder="Contoh : Viva Milk Cleanser"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">SKU</label>
        <input
          ref={SKURef}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">HPP</label>
        <input
          ref={HPPRef}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Harga Beli</label>
        <input
          ref={hargaBeliRef}
          onChange={CharB}
          value={hargaB}
          type="text"
          placeholder="0"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Harga Jual</label>
        <input
          ref={hargaJualRef}
          onChange={CharJ}
          value={hargaJ}
          type="text"
          placeholder="0"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"

        />
        <label className="text-start font-semibold mb-[5px]">
          Bonus Terapis
        </label>
        <input
          ref={bonusTerapisRef}
          onChange={CbonT}
          value={bonusT}
          type="text"
          placeholder="Contoh : Rp. 20000"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">
          Presentase Keuntungan
        </label>
        <input
          type="text"
          disabled
          value={`${((hargaJR - hargaBR) / hargaBR * 100).toFixed(2)}%`}
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">
          Nominal Keuntungan
        </label>
        <input
          type="text"
          disabled
          value={`Rp ${hargaJR - hargaBR}`}
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Stok</label>
        <input
          ref={stokRef}
          defaultValue={1}
          type="number"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Min Stok</label>
        <input
          ref={minStokRef}
          defaultValue={1}
          type="number"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
      </div>
      <div className="flex items-end mt-auto w-full h-full px-3">
        <button
          type="submit"
          className={`w-full h-[44px] rounded-xl p-3 text-[14px] text-white transition-all duration-300 ${isFilled ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]" : "bg-[#BDBDBD]"}`}
        >
          Simpan
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

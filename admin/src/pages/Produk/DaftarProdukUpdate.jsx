import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Produk from "../display/Produk";

export const DaftarProdukUpdate = () => {
  const { setNav, setLink } = useContext(navContext);
  const [jenis, setJenis] = useState([]);
  const [availableKategori, setAvail] = useState([]);
  const [selectedJenis, setSelected] = useState("");
  const [selectedNamaJenis, setSelectedJenis] = useState("");
  const [kategori, setKategori] = useState([]);
  const [product, setproduct] = useState([]);
  const [jenisx, setjenisx] = useState([]);
  const [ketegorix, setKategorix] = useState([]);
  const [isFilled, setIsFilled] = useState(false)
  const [hargaB, setHargaB] = useState('')
  const [hargaJ, setHargaj] = useState('')
  const [bonusT, setBonusT] = useState('')
  const [hargaBR, setHargaBR] = useState(0)
  const [hargaJR, setHargajR] = useState(0)
  const [bonusTR, setBonusTR] = useState(0)

  const checkFormFilled = () => {
    if (
      namaProdukRef.current?.value &&
      hargaBeliRef.current?.value &&
      hargaJualRef.current?.value &&
      kategoriRef.current?.value &&
      bonusTerapisRef.current?.value &&
      minStokRef.current?.value
    ) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchall = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/produk/${id}`)
        .then((response) => {
          setproduct(response.data);
          setHargaBR(response.data.hargaBeli)
          setHargaB(response.data.hargaBeli.toLocaleString("id-ID"))
          setHargajR(response.data.hargaJual)
          setHargaj(response.data.hargaJual.toLocaleString("id-ID"))
          setBonusTR(response.data.bonusTerapis)
          setBonusT(response.data.bonusTerapis.toLocaleString("id-ID"))
          setKategorix(response.data.kategori);
          setjenisx(response.data.jenis);
        });

      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk")
        .then((response) => {
          const jenislist = response.data
          setJenis(jenislist);
          console.log(response);
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
    };
    fetchall();
    setNav("Ubah Daftar Produk");
    setLink('/pos/daftarproduk')
  }, []);
  // console.log(jenis);

  const CharB = () => {
    const a = hargaBeliRef.current.value.replace(/\D/g, "")
    setHargaBR(a)
    setHargaB(parseFloat(a).toLocaleString("id-ID"))

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

  const namaProdukRef = useRef(null);
  const hargaJualRef = useRef(null);
  const hargaBeliRef = useRef(null);
  const kategoriRef = useRef(null);
  const bonusTerapisRef = useRef(null);
  const stokRef = useRef(null);
  const hppRef = useRef(null);
  const skuRef = useRef(null);
  const minStokRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      jenis: jenisRef.current.value,
      namaProduk: namaProdukRef.current.value,
      hargaJual: hargaJR,
      hargaBeli: hargaBR,
      kategori: kategoriRef.current.value,
      bonusTerapis: bonusTR,
      stok: stokRef?.current?.value,
      hpp: hppRef?.current?.value,
      sku: skuRef?.current?.value,
      minStok: minStokRef?.current?.value,
    };
    console.log(data);
    try {
      const response = await axios.put(
        `https://api.drnich.co.id/api/pos/produk/updateproduk/${id}`,
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
        toast.success("Produk berhasil diperbarui!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = "/pos/daftarproduk";
        }, 1500);
      } else {
        toast.error("Gagal memperbarui produk");
      }
    } catch (error) {
      console.error("Error saat memperbarui produk:", error);
      toast.error("Terjadi kesalahan saat memperbarui produk");
    }

  };

  document.title = "Ubah Daftar Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col gap-3 px-3">
        <label className="text-start font-semibold">Jenis Produk</label>
        <select
          ref={jenisRef}
          onChange={changeJenis}
          name="options"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
          id="jenis"
        >
          <option
            // value={jenisx.jenis}
            className="text-[#BDBDBD]"
            selected
            disabled
            value={product?.jenis?._id}
          >
            {product?.jenis?.jenis}
          </option>
          {jenis.map((item, i) => (
            <option key={i} value={item._id}>
              {item.jenis}
            </option>
          ))}
        </select>
        <label className="text-start font-semibold">
          Kategori Produk
        </label>
        <select
          ref={kategoriRef}
          onChange={kategoriChange}
          name="options"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
          id="Gender"
        >
          <option
            value={ketegorix._id}
            className="text-gray-300"
            selected
            disabled
          >
            {ketegorix.kategori}
          </option>
          {availableKategori.map((item, i) => (
            <option key={i} value={item.idkategori}>
              {item.kategori}
            </option>
          ))}
        </select>
        <label className="text-start font-semibold">Nama Produk</label>
        <input
          defaultValue={product.namaProduk}
          ref={namaProdukRef}
          type="text"
          placeholder="Contoh : Viva Milk Cleanser"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold mb-[5px]">SKU</label>
        <input
          ref={skuRef}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">HPP</label>
        <input
          ref={hppRef}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold">Harga Beli</label>
        <input
          defaultValue={product.hargaBeli}
          ref={hargaBeliRef}
          value={hargaB}
          onChange={CharB}
          type="text"
          placeholder="0"
          className="px-2 bg-gray-400/10 border border-black/30 rounded-xl h-[30px]"
        />
        <label className="text-start font-semibold">Harga Jual</label>
        <input
          defaultValue={product.hargaJual}
          ref={hargaJualRef}
          value={hargaJ}
          onChange={CharJ}
          type="text"
          placeholder="0"
          className="px-2 bg-gray-400/10 border border-black/30 rounded-xl h-[30px]"
        />
        <label className="text-start font-semibold">
          Bonus Terapis
        </label>
        <input
          defaultValue={product.bonusTerapis}
          ref={bonusTerapisRef}
          value={bonusT}
          onChange={CbonT}
          type="text"
          placeholder="Contoh : Rp. 20000"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Presentase Keuntungan
        </label>
        <input
          value={`${((hargaJR - hargaBR) / hargaBR * 100).toFixed(2)}%`}
          type="text"
          disabled
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Nominal Keuntngan
        </label>
        <input
          disabled
          value={`Rp ${hargaJR - hargaBR}`}
          type="text"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Stok</label>
        <input
          defaultValue={product.stok}
          ref={stokRef}
          type="number"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Min Stok</label>
        <input
          defaultValue={product.minStok}
          ref={minStokRef}
          type="number"
          placeholder=""
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
      <ToastContainer />
    </form>
  );
};

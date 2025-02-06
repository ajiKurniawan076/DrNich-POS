import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    console.log(kategorix)
  }

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchall = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/produk/${id}`)
        .then((response) => {
          setproduct(response.data);
          setKategorix(response.data.kategori);
          setjenisx(response.data.jenis);
        });

      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk")
        .then((response) => {
          const jenislist = response.data.map((item) => item.jenis);
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
  const minStokRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      jenis: selectedNamaJenis,
      namaProduk: namaProdukRef.current.value,
      hargaJual: hargaJualRef.current.value,
      hargaBeli: hargaBeliRef.current.value,
      kategori: kategoriRef.current.value,
      bonusTerapis: bonusTerapisRef.current.value,
      stok: stokRef?.current?.value,
      minStok: minStokRef?.current?.value,
    };
    console.log(data);
    axios
      .put(`https://api.drnich.co.id/api/pos/produk/updateproduk/${id}`, data)
      .then((response) => {
        response.status == 200 && navigate("../daftarproduk");
      });
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
          >
            pilih
          </option>
          {jenis.map((item, i) => (
            <option key={i} value={item.jenis}>
              {item}
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
            value={ketegorix.idkategori}
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
        <label className="text-start font-semibold">Harga Beli</label>
        <input
          defaultValue={product.hargaBeli}
          ref={hargaBeliRef}
          type="number"
          placeholder="0"
          className="px-2 bg-gray-400/10 border border-black/30 rounded-xl h-[30px]"
        />
        <label className="text-start font-semibold">Harga Jual</label>
        <input
          defaultValue={product.hargaJual}
          ref={hargaJualRef}
          type="number"
          placeholder="0"
          className="px-2 bg-gray-400/10 border border-black/30 rounded-xl h-[30px]"
        />
        <label className="text-start font-semibold">
          Bonus Terapis
        </label>
        <input
          defaultValue={product.bonusTerapis}
          ref={bonusTerapisRef}
          type="number"
          placeholder="Contoh : Rp. 20000"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Presentase Keuntungan
        </label>
        <input
          Value={
            ((product.hargaJual - product.hargaBeli) / product.hargaBeli) * 100
          }
          type="number"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Nominal Keuntngan
        </label>
        <input
          value={product.hargaJual - product.hargaBeli}
          type="number"
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
    </form>
  );
};

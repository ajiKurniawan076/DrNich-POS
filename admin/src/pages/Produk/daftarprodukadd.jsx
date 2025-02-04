import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const supplierRef = useRef(null)
  const namaProdukRef = useRef(null);
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
      hargaJualRef.current?.value &&
      hargaBeliRef.current?.value &&
      kategoriRef.current?.value
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
          response => response.status==200 && setSupplier(response.data)
        )
    };
    fetchall();
    setNav("Tambah Produk");
    setLink('/pos/daftarProduk')
  }, []);
  // console.log(jenis);
  const hitung =()=>{
    const  profitpersen= (hargaJualRef.current.value- hargaBeliRef.current.value) / hargaBeliRef.current.value * 100
    const profitrupiah = hargaJualRef.current.value- hargaBeliRef.current.value
    setProfitrp(profitrupiah)
    setProfitprs(profitpersen)
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
      supplier: supplierRef.current.value
    };
    console.log(data);
    axios
      .post("https://api.drnich.co.id/api/pos/produk/produk", data)
      .then((response) => {
        response.status == 200 && navigate("../daftarproduk");
      });
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
        <label className="text-start font-semibold mb-[5px]">Harga Beli</label>
        <input
          ref={hargaBeliRef}
          onChange={hitung}
          type="number"
          placeholder="0"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Harga Jual</label>
        <input
          ref={hargaJualRef}
          onChange={hitung}
          type="number"
          placeholder="0"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[14px] px-[20px] mb-[20px]"
          
        />
        <label className="text-start font-semibold mb-[5px]">
          Bonus Terapis
        </label>
        <input
          ref={bonusTerapisRef}
          type="number"
          placeholder="Contoh : Rp. 20000"
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">
          Presentase Keuntungan
        </label>
        <input
          type="text"
          disabled
          value = {`${profitprs}%`}
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">
          Nominal Keuntngan
        </label>
        <input
          type="text"
          disabled
          value ={`Rp ${profitrp}`}
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Stok</label>
        <input
          ref={stokRef}
          type="number"
          placeholder=""
          className="border border-[#BDBDBD] rounded-xl w-full h-[45px] py-[15px] px-[20px] mb-[20px]"
        />
        <label className="text-start font-semibold mb-[5px]">Min Stok</label>
        <input
          ref={minStokRef}
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
    </form>
  );
};

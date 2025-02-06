import { createContext, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import iCen from "../../assets/iconproduk/iCen.svg";
import iMin from "../../assets/iconproduk/iMin.svg";
import iPlus from "../../assets/iconproduk/iPlus.svg";
import iTambahP from "../../assets/iconproduk/iTambahP.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { PembelianStok } from "../Produk/PembelianStok";
import { modalStokContext } from "./ManajementDetailStok";
import { toast, ToastContainer } from "react-toastify";

export const modalsContext = createContext();
export const DaftarBelanjaModals = (props) => {
  const { setNav, setLink } = useContext(navContext);
  const [angka, setAngka] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [bin, setBin] = useState([]);
  const [produk, setProduk] = useState([]);
  const [items, setItems] = useState([]);
  const [modals, setModals] = useState(false);
  const { modalStok, setModalStok } = useContext(modalStokContext);
  const [produkKategori, setProdukKategori] = useState([]);
  const [pilihKategori, setPilihKategori] = useState([]);
  const navigate = useNavigate(0);
  const min = (isi) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === isi
          ? { ...item, jumlah: Math.max(0, item.jumlah - 1) } // Ensure jumlah doesn't go below 0
          : item
      )
    );
  };

  const plus = (isi) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === isi
          ? { ...item, jumlah: Math.abs(Number(item.jumlah) + 1) } // Ensure jumlah doesn't go below 0 : { ...item, jumlah: item.jumlah + 1 } // Ensure jumlah doesn't go below 0
          : item
      )
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      total: total,
      belanjaDetail: cart,
    };

    try {
      const response = await axios.post(
        "https://api.drnich.co.id/api/pos/produk/belanjapos",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    
      if (response.status === 200) {
        toast.error("Terjadi kesalahan dalam transaksi");
      } else {
        toast.success("Transaksi berhasil!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = `/pos/pembayaranProduk/${response.data.belanja._id}`;
        }, 1500);
      }
    } catch (error) {
      console.error("Error dalam transaksi:", error);
      toast.error("Terjadi kesalahan saat memproses transaksi");
    }
    
  };
  const tambahKeranjang = (isi) => {
    if (cart.some((item) => item._id == isi._id)) {
    } else {
      const newisi = { ...isi, jumlah: 0 };
      setCart((prev) => [...prev, newisi]);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk")
        .then((response) => {
          if (response.status == 200) {
            const filterProduk = response.data.filter(
              (item) => item.jenis.jenis == "produk"
            );
            console.log(filterProduk);
            setProduk(filterProduk);
            setProdukKategori(filterProduk);
            const filterlimit = response.data.filter(
              (item) => {item.stok < item.minStok
                 item.jenis.jenis == "produk"}
            );
            console.log(filterlimit);
            setItems(filterlimit);
          }
        });
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/kategoriproduk")
        .then((response) => {
          const filterPilihKategori = response.data.filter(
            (item) => item.jenis.jenis == "produk"
          );
          setPilihKategori(filterPilihKategori);
        });
    };
    fetch();
  }, []);
  useEffect(() => {
    setTotal(0);
    cart.map((item) => setTotal((prev) => prev + item.jumlah * item.hargaBeli));
  }, [cart]);
  useEffect(() => {
    const newisi = { ...props.data, jumlah: 0 };
    setCart([newisi]);
  }, [props.data]);

  setNav("Daftar Belanja ");
  document.title = "Daftar Belanja ";
  return (
    <modalsContext.Provider
      value={{
        modals,
        setModals,
        produk,
        produkKategori,
        setProdukKategori,
        pilihKategori,
        cart,
        setCart,
      }}
    >
      <div
        className={`fixed z-40 top-0 start-0 w-full h-full bg-black/20 flex justify-center overflow-auto ${
          modalStok ? "" : "hidden"
        }`}
      >
        <form className="flex flex-col px-7 py-3 gap-1 bg-white md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] w-[100%] max-w-[500px] h-full mt-[75px]">
        <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            className="text-sm w-full h-[30px] focus:outline-none"
            placeholder="Cari..."
          ></input>
        </form>
          <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg">
            <p className="">Daftar Stok Limit</p>
          </div>
          <div className="flex flex-col gap-3 w-full h-full justify-start">
            {items.map((item, i) => (
              <div className="flex flex-col items-start w-full">
                <Link className="text-start w-full" key={i}>
                  <div className="ms-14 mt-2 text-[#EB5757] text-[12px]">
                    <p>Stok Melewati Minimum ({item.stok})</p>
                  </div>
                  <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        tambahKeranjang(item);
                      }}
                      className=""
                    >
                      <img src={iPlus} alt="kocen" />
                    </button>
                    <div className="text-start">
                      <p>{item.namaProduk}</p>
                      <p>{item.hargaBeli}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg">
            <p className="">Daftar Keranjang</p>
          </div>
          <div className="flex flex-col gap-3 w-full h-full justify-start">
            {cart.map((item, i) => (
              <div className="flex flex-col items-start w-full">
                <Link className="text-start w-full" key={i}>
                  <div className="ms-14 mt-2 text-[#EB5757] text-[12px]">
                    <p>({item.stok})</p>
                  </div>
                  <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
                    <div className="">
                      <img src={iCen} alt="kocen" />
                    </div>
                    <div className="text-start">
                      <p>{item.namaProduk}</p>
                      <p>{item.hargaBeli}</p>
                    </div>
                    <div className="flex gap-4 ms-auto">
                      <button onClick={() => min(item._id)}>
                        <img src={iMin} alt="minus" />
                      </button>
                      <p>{item.jumlah}</p>
                      <button onClick={() => plus(item._id)}>
                        <img src={iPlus} alt="plus" />
                      </button>
                      <button onClick={
                                (e) => {
                                    e.preventDefault()
                                    setCart((prev) => prev.filter(itemx => itemx._id !== item._id))
                                }
                            } className='text-red-600 font-bold'>X</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex w-full ">
            <div className="flex flex-col justify-end w-[50%]">
              <button
                onClick={handleSubmit}
                className="flex justify-center items-center border border-[#C2A353] bg-white text-[#C2A353] font-semibold rounded-l-xl px-3 h-[50px] w-full text-[14px]"
              >
                <div className="grid">
                  <p>Beli Sekarang</p>
                  <p>Rp.{total}</p>
                </div>
              </button>
            </div>
            <div className="flex justify-end w-[50%]">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModals(true);
                }}
              className="flex justify-center items-center text-center gap-2 border border-[#C2A353] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-semibold rounded-r-xl px-3 h-[50px] w-full text-[14px]"
              >
                <img src={iTambahP} alt="" className="pl-4" /> Tambah Daftar
                Belanja
              </button>
            </div>
          </div>
          <div>
            <button
              className="flex justify-center items-center text-center gap-2 border border-[#C2A353] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-semibold rounded-xl px-3 h-[50px] w-full text-[14px]"
              onClick={(e) => {
                e.preventDefault();
                setModalStok(false);
              }}
            >
              BATAL
            </button>
          </div>
        </form>
         <PembelianStok source={"PembelianStok"} />
      </div>
      <ToastContainer/> 
    </modalsContext.Provider>
  );
};

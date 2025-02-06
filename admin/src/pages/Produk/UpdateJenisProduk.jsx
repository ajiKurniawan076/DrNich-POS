import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const UpdateJenisProduk = () => {
  const { setNav, setLink } = useContext(navContext);
  const { id } = useParams();
  useEffect(() => {
    setNav("Update Jenis Produk");
    setLink('/pos/jenisproduk')
  }, []);
  document.title = "Update Jenis Produk";
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [datax, setDatax] = useState([]);
  const [isFilled, setIsFilled] = useState(false)

  const checkFormFilled = () => {
    if (
      inputRef.current.value
    ) {
      setIsFilled (true)
    } else {
      setIsFilled (false)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    const data = {
      jenis: inputValue,
    };
    axios
      .put(
        `https://api.drnich.co.id/api/pos/produk/updatejenisProdukPos/${id}`,
        data
      ) // Menggunakan method PUT
      .then((response) => {
        if (response.status === 200) {
          toast.success('Sukses Menambahkan Jenis')
          setTimeout(() => {
            toast.success("Redirecting...");
            window.location.href = "/pos/jenisproduk";
          }, 1500);
        } else {
          alert("Gagal menyimpan data!");
        }
      })
      .catch((error) => {
        console.error("Error saat menyimpan data:", error);
        toast.error("Terjadi kesalahan saat menyimpan data!");
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.drnich.co.id/api/pos/produk/jenisproduk/${id}`
        );
        setDatax(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <form
      onChange={checkFormFilled}
      onSubmit={handleSubmit}
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-9"
    >
      <ToastContainer/>
      <div className="flex flex-col gap-1  px-3">
        <label className="text-start font-semibold">
          Nama Jenis Produk
        </label>
        <input
          ref={inputRef}
          defaultValue={datax.jenis}
          onSubmit={(e) => setDatax({ ...datax, jenis: e.target.value })}
          type="text"
          placeholder="Contoh : Barang / Jasa"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        ></input>
      </div>
      <div className="flex w-full py-4 px-3">
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

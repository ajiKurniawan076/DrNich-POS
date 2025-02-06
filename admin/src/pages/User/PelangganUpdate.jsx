import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { data, useNavigate, useParams } from "react-router-dom";

export const PelangganUpdate = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [datax, setDatax] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/user/pelanggan/${id}`)
        .then((response) => setDatax(response.data));
    };
    fetchData();
    setNav("Edit Pelanggan");
    setLink('/pos/pelanggan')
  }, []);
  // console.log(datax);
  const namaPelangganRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const genderRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false)

  const checkFormFilled = () => {
    if (
      namaPelangganRef.current.value &&
      nomorTeleponRef.current.value &&
      genderRef.current.value &&
      alamatRef.current.value
    ) {
      setIsFilled (true)
    } else {
      setIsFilled(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      namaPelanggan: namaPelangganRef.current.value,
      poin: 0,
      nomorTelepon: nomorTeleponRef.current.value,
      gender: genderRef.current.value,
      alamat: alamatRef.current.value,
      keterangan: keteranganRef.current.value,
    };
    // console.log(data);
    axios
      .put(`https://api.drnich.co.id/api/pos/user/updatepelanggan/${id}`, data)
      .then((response) => {
        response.status == 200 && navigate(`../pelanggan`);
      });
  };

  document.title = "Edit Marketing";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7"
      onSubmit={handleSubmit}
      onChange={checkFormFilled}
    >
      <div className="flex flex-col gap-1 px-3">
        <label className="text-start font-semibold">
          Nama Pelanggan
        </label>
        <input
          defaultValue={datax.namaPelanggan}
          ref={namaPelangganRef}
          type="text"
          placeholder="Contoh : Aji"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Poin</label>
        <input
          defaultValue={datax.poin}
          type="number"
          placeholder="0"
          disabled
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Nomor Telepon
        </label>
        <input
          defaultValue={datax.nomorTelepon}
          ref={nomorTeleponRef}
          type="number"
          placeholder="Contoh : 0892323232"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">
          Jenis Kelamin
        </label>
        <select
          defaultValue={datax.gender}
          ref={genderRef}
          name="options"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
          id="Gender"
        >
          <option value={datax.gender} selected disabled>
            {datax.gender}
          </option>
          <option value="Wanita">Wanita</option>
          <option value="Pria">Pria</option>
          {/* {datax.gender == "pria" ? (
            <>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </>
          ) : (
            <>
              <option value="Wanita">Wanita</option>
              <option value="Pria">Pria</option>
            </>
          )} */}
        </select>
        <label className="text-start font-semibold">Alamat</label>
        <input
          defaultValue={datax.alamat}
          ref={alamatRef}
          type="text"
          placeholder="Contoh : Jalan Kalitaman 22 Salatiga"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
        <label className="text-start font-semibold">Keterangan</label>
        <input
          defaultValue={datax.keterangan}
          ref={keteranganRef}
          type="text"
          placeholder="Contoh : Karyawan"
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

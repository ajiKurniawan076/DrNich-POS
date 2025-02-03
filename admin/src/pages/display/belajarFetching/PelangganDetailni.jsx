import axios from "axios";
import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PelangganDetailni = () => {
  const [datax, setDatax] = useState([]);
  const { id } = useParams();
  const navigasi = useNavigate();

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/user/pelanggan/${id}`)
        .then((response) => setDatax(response.data));
    };
    data();
  }, []);
  console.log(datax);

  const handleHapus = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `https://api.drnich.co.id/api/pos/user/deletepelanggan/${id}`
    );
    if (response.status === 200) {
      navigasi("/pelanggandata");
      console.log("berhasil di hapus");
    } else {
      console.log(response.status);
    }
  };

  return (
    <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full relative">
      <div className="flex flex-col justify-center border-2 w-full rounded-md shadow-lg p-4 gap-6 hover:scale-90 translate duration-500  hover:border-yellow-500">
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">Nama lengkap</p>
          <p>{datax.namaPelanggan}</p>
        </div>
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">Poin</p>
          <p>{datax.poin}</p>
        </div>
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">Alamat</p>
          <p>{datax.alamat}</p>
        </div>
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">No Telepon</p>
          <p>{datax.nomorTelepon}</p>
        </div>
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">Jenis kelamin</p>
          <p>{datax.gender}</p>
        </div>
        <div className="flex flex-col  items-start font-thin w-full">
          <p className="font-semibold">Keterangan</p>
          <p>{datax.keterangan}</p>
        </div>
      </div>
      <div className="flex absolute bottom-0 justify-center items-center w-full gap-2">
        <button
          onClick={handleHapus}
          className="w-full h-10 bg-yellow-500 rounded-md hover:scale-110 duration-200"
        >
          Hapus
        </button>
        <Link
          to={{ pathname: `/PelangganEdit/${id}` }}
          className="w-full h-10 bg-blue-500 rounded-md hover:scale-110 duration-200"
        >
          Ubah
        </Link>
      </div>
    </div>
  );
};

export default PelangganDetailni;

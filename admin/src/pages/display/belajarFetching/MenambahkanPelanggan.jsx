import axios from "axios";
import Button from "./partikel/Button";
import Input from "./partikel/input";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";
const MenambahkanPelanggan = () => {
  const navigasi = useNavigate();
  const namarRef = useRef(null);
  const poinRef = useRef(null);
  const nomorTeleponRef = useRef(null);
  const jenisKelaminRef = useRef(null);
  const alamatRef = useRef(null);
  const keteranganRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const nama = namarRef.current.value;
    const data = {
      namaPelanggan: namarRef.current.value,
      nomorTelepon: nomorTeleponRef.current.value,
      gender: jenisKelaminRef.current.value,
      alamat: alamatRef.current.value,
      poin: poinRef.current.value,
      keterangan: keteranganRef.current.value,
    };
    console.log(data);
    axios
      .post("https://api.drnich.co.id/api/pos/user/pelanggan", data)
      .then((response) => response.status == 200 && navigasi("/pelanggandata"));
  };

  return (
    <div className="flex flex-col px-0 py-3 gap-1 bg-white w-full h-full relative">
      <form
        className="flex flex-col gap-4 relative h-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">Nama pelanggan</p>
          <Input
            placeholder="contah: bileam Mangalla"
            type="text"
            ref={namarRef}
          />
        </div>
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">Poin</p>
          <input
            type="number"
            disabled
            placeholder="0"
            ref={poinRef}
            className="h-10 w-full px-3 py-2 border rounded-md border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />
        </div>
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">Nomor telpon</p>
          <Input
            placeholder="contoh: 081242922597"
            type="number"
            ref={nomorTeleponRef}
          />
        </div>
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">Jenis kelamin</p>
          <select
            ref={jenisKelaminRef}
            className="h-10 w-full px-3 py-2 border rounded-md border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          >
            <option value="pria">Pria</option>
            <option value="wanita">wanita</option>
          </select>
        </div>
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">Alamat</p>
          <Input
            placeholder="contoh: margosari 2"
            type="text"
            ref={alamatRef}
          />
        </div>
        <div className="flex flex-col justify-start gap-1 font-mono">
          <p className="text-start">keterangan</p>
          <Input placeholder="contoh: Magang" type="text" ref={keteranganRef} />
        </div>
        <div className="flex justify-center">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default MenambahkanPelanggan;

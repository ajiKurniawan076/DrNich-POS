import { useState, useRef, useEffect } from "react";
import { Form } from "react-router-dom";

const Select = () => {
  const [datax, setDatax] = useState([]);
  const [dataSelect, setDataSelect] = useState();
  const [dataan, setDataan] = useState();
  const selectetRef = useRef(null);
  const NamaRef = useRef(null);
  useEffect(() => {
    const dataDummy = () => [
      { id: 1, Nama_produk: "fecial-wols" },
      { id: 2, Nama_produk: "fecial-serias" },
    ];
    setDatax(dataDummy);
  }, []);
  //   console.log(datax);

  //   handleSelect
  const handleSelect = (e) => {
    e.preventDefault();
    setDataSelect(selectetRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataan(NamaRef.current.value);
  };

  //   console.log(dataSelect);

  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <form className="flex flex-col gap-3 px-3" onSubmit={handleSubmit}>
        <input
          ref={NamaRef}
          type="text"
          placeholder="masukan nama kamu"
          className="border border-yellow-400 rounded-lg p-2"
        />
        <select
          onChange={handleSelect}
          ref={selectetRef}
          className="
         border-2 rounded-lg 
         h-10 w-full flex
          text-start p-2"
        >
          <option disabled>Pilih layanan</option>
          {datax.length == 0 ? (
            <option disabled>Tidak ada data</option>
          ) : (
            datax.map((data, i) => (
              <option value={data.Nama_produk} key={i}>
                {data.Nama_produk}
              </option>
            ))
          )}
        </select>

        <p className="shadow-lg text-start border w-[200px] rounded-lg p-3 border-[#C2A353]">
          {dataSelect}
        </p>

        <button
          type="submit"
          className="w-full h-10 shadow bg-blue-400 rounded mt-7"
        >
          simpan
        </button>

        <p>{dataan}</p>
        <p>{dataSelect}</p>
      </form>
    </div>
  );
};

export default Select;

import { useContext, useState, useEffect } from "react"; // Impor useContext, useState, useEffect dari React
import { navContext } from "../../App2";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const DiskonDetail = () => {
  const lokasi = useLocation();
  const { setNav, setLink } = useContext(navContext); // Mengambil setNav dari context
  const [datax, setDatax] = useState([]); // State untuk data
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetchin data APi
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.drnich.co.id/api/pos/promo/promo/${id}`
        );
        setDatax(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    FetchData();
    setLink('/pos/tambahdiskon4')
    setNav("Detail Diskon");
  }, [setNav]);
  // console.log(datax);

  const handleDelele = async () => {
    // e.preventdefault();
    await axios
      .delete(`https://api.drnich.co.id/api/pos/promo/deletepromoPos/${id}`)
      .then((response) => response.status == 200 && navigate("/pos/Tambahdiskon4"));
  };

  document.title = "Detail Diskon";

  return (
    <div className="flex flex-col px-7 py-3 gap-1 bg-white w-full min-h-screen h-fit">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 gap-5">
        <div className="w-full border flex flex-col p-5 border-[#EAC564] rounded-lg shadow-lg">
          {/* kategori diskon */}

          {datax.length === 0 ? (
            <div className="flex justify-center items-start min-h-screen">
              belum ada data
            </div>
          ) : (
            <>
              <div>
                <p className="text-start text-[#454545] text-[14px] font-bold">
                  Nama Promo
                </p>
                <p className="text-start text-[14px] text-[#454545]">
                  {datax.namaPromo}
                </p>
              </div>

              {/* nama diskon */}
              <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
                Jenis Promo
              </p>
              <p className="text-start text-[14px] text-[#454545]">
                {datax.jenis}
              </p>
              {/* jumlah diskon */}
              <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
                Potongan
              </p>
              <p className="text-start text-[14px] text-[#454545]">
                {datax.potongan}
              </p>
              {/* kusus produk */}
              <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
                Keterangan
              </p>
              <p className="text-start text-[14px] text-[#454545]">
                {datax.keterangan}
              </p>
              {/* masa berlaku */}
              <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
                Mulai Berlaku
              </p>
              <p className="text-start text-[14px] text-[#454545]">
                {new Date(datax.berlakuDari).toLocaleDateString("id-ID")}
              </p>

              <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
                Berlaku hingga
              </p>
              <p className="text-start text-[14px] text-[#454545]">
                {new Date(datax.berlakuSampai).toLocaleDateString("id-ID")}
              </p>
            </>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelele();
            }}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus
          </button>
          <Link
            to={`/pos/EditDiskon/${id}`}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiskonDetail;

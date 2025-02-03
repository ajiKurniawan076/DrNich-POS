import { useContext, useState, useEffect } from "react"; // Impor useContext, useState, useEffect dari React
import { navContext } from "../../App2";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const CashbackDetail = () => {
  const lokasi = useLocation();
  const { setNav } = useContext(navContext); // Mengambil setNav dari context
  const [datax, setDatax] = useState({}); // State untuk data, ubah default ke objek kosong
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // fetching data API
    const FetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/promo/promo/${id}`)
        .then((response) => {
          setDatax(response.data);
        });
    };
    FetchData();

    setNav("Detail CashBack");
  }, [id, setNav]);

  const handleDelele = async () => {
    // e.preventdefault();
    await axios
      .delete(`https://api.drnich.co.id/api/pos/promo/deletepromoPos/${id}`)
      .then((respone) => respone.status == 200 && navigate("../CashBack4"));
  };
  console.log(datax);

  document.title = "Detail Diskon";

  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full min-h-screen h-fit">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 gap-5">
        <div className="w-full border flex flex-col p-5 border-[#EAC564] rounded-lg shadow-lg">
          <div className="w-full">
            <p className="text-center text-[#454545] text-[16px] font-bold">
              CASHBACK
            </p>
            <hr className="my-2" />
            {/* handle produk terkait */}
          </div>

          {/* kategori diskon */}
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
          <p className="text-start text-[14px] text-[#454545]">{datax.jenis}</p>

          {/* jumlah diskon */}
          <p className="text-start text-[#454545] text-[14px] font-bold mt-2">
            Potongan
          </p>
          <p className="text-start text-[14px] text-[#454545]">
            {datax.cashback}
          </p>

          {/* keterangan */}
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
        </div>
        <div className="w-full border flex flex-col p-5 border-[#EAC564] overflow-auto rounded-lg shadow-lg">
          <div className="w-full">
            <p className="text-center text-[#454545] text-[14px] font-bold">
              PRODUK
            </p>
            <hr className="my-2" /> {/* handle produk terkait */}
          </div>
          <div className="  flex flex-col p-5 rounded-lg shadow-lg gap-2">
            {datax.promoDetail && datax.promoDetail.length > 0 ? (
              datax.promoDetail.map((detail) => (
                <div
                  className="flex flex-col item-center  border rounded-lg shadow-sm p-2 gap-2"
                  key={detail._id}
                >
                  <div className="flex gap-2 ">
                    <p className="text-start text-[#454545] text-[12px] font-bold ">
                      Nama Produk :
                    </p>
                    <p className="text-start text-[12px] text-[#454545] font-bold">
                      {detail?.produk?.namaProduk}
                    </p>
                  </div>
                  <hr className=" border-black" />
                  <div className="flex justify-start text-[12px] gap-3">
                    <p>harga Jual</p>
                    <p> : {detail.produk ? detail?.produk?.hargaJual : "-"}</p>
                  </div>
                  <div className="flex justify-start text-[12px] gap-3">
                    <p>harga Beli</p>
                    <p> : {detail.produk ? detail?.produk?.hargaBeli : "-"}</p>
                  </div>
                  <div className="flex justify-start text-[12px] gap-3">
                    <p>Bonus Terapi</p>
                    <p> : {detail.produk ? detail?.produk?.bonusTerapis : "-"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#454545]">Tidak ada produk terkait</p>
            )}
          </div>
        </div>
        {/* Menampilkan produk terkait */}

        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelele();
            }}
            href="#"
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </button>
          <button
            href="#"
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashbackDetail;

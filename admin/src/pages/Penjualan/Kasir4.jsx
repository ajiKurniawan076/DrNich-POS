import React, { createContext, useContext, useEffect, useState } from "react";
import { navContext } from "../../App2";
import iPanah from "../../assets/iconkasir/iPanah.svg";
import iTamKu from "../../assets/iconkasir/iTamKu.svg";
import iPan from "../../assets/iconkasir/iPan.svg";
import { kasirContext } from "./Kasir";
import axios from "axios";
import { PilihPelanggan } from "./PilihPelanggan";
import { PilihPromo } from "./PilihPromo";
import { useNavigate } from "react-router-dom";

export const modaltransaksi = createContext();
export const Kasir4 = () => {
  const { setNav, setLink } = useContext(navContext);
  const {
    totalAkhir,
    handleDraft,
    potongan,
    cashback,
    modal,
    setModal,
    cart,
    setCart,
    invoice,
    total,
    pelanggan,
    promo,
    terapis,
    marketing,
    setPelangganTerpilih,
    pelangganTerpilih,
    promoTerpilih,
    setPromoTerpilih,
  } = useContext(kasirContext);
  const [modalPel, setModalPel] = useState(false);
  const [modalPro, setModalPro] = useState(false);
  const [modalTer, setModalTer] = useState(false);
  const [modalMar, setModalMar] = useState(false);
  const navigate = useNavigate();
  const handleTransaksi = (e) => {
    e.preventDefault();
    const data = {
      pelanggan: pelangganTerpilih._id,
      promo: promoTerpilih._id,
      total: total,
      invoice: invoice,
      poin: cashback,
      totalAkhir: totalAkhir,
      transaksiDetail: cart,
      potongan: potongan,
      status: "Done",
    };
    console.log(data);
    axios
      .post("https://api.drnich.co.id/api/pos/kasir/transaksi", data, {
        withCredentials: true,
      })
      .then((response) => {
        response.status == 200 ? navigate(0) : console.log(response);
      });
  };

  return (
    <modaltransaksi.Provider
      value={{
        modalPel,
        setModalPel,
        pelanggan,
        pelangganTerpilih,
        setPelangganTerpilih,
        modalPro,
        promoTerpilih,
        setPromoTerpilih,
        setModalPro,
        promo,
      }}
    >
      <div
        className={`fixed z-40 top-0 start-0 w-full overflow-auto inset-0 ${
          modal ? "" : "hidden"
        }`}
      >
        <div className="flex mx-auto md:max-w-[700px] md:w-[80%] lg:max-w-[900px] lg:w-[60%] flex-col px-5 py-8 gap-1 w-[100%] bg-white max-w-[500px] min-h-full h-fit pt-8 text-[#454545] text-[12px] mt-[75px]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalPel(true);
            }}
            className="flex justify-between items-center text-center border border-[#EAC564] rounded-xl p-4 mb-1"
          >
            {pelangganTerpilih.namaPelanggan ? (
              <p>{pelangganTerpilih.namaPelanggan}</p>
            ) : (
              <p>Pilih Pelanggan</p>
            )}
            <img src={iPanah} alt="" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalPro(true);
            }}
            className="flex justify-between items-center text-center border border-[#EAC564] rounded-xl p-4"
          >
            {promoTerpilih.namaPromo ? (
              <p>{promoTerpilih.namaPromo}</p>
            ) : (
              <p>Pilih Promo</p>
            )}
            <img src={iPanah} alt="" />
          </button>
          <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] py-0.5 text-start mt-4 w-full">
            <p>Rincian Pembelian</p>
          </div>
          <div className="flex justify-between text-[#BDBDBD] w-full mt-4">
            <p>ID Transaksi</p>
            <p>#{invoice ? invoice : ""}</p>
          </div>
          {cart.map((item, i) => (
            <>
              <div key={i} className="flex justify-between w-full mt-2">
                <div className="flex justify-between w-[80%] text-[#EAC564]">
                  <p>{item.namaProduk}</p>
                  <p>x {item.jumlah}</p>
                </div>
                <p className="font-semibold">
                  Rp {item.hargaJual * item.jumlah}
                </p>
              </div>
            </>
          ))}
          <div className="border border-dashed border-[#BDBDBD] my-5"></div>
          <div className="flex justify-between w-full">
            <p>Total </p>
            <p className="font-semibold">Rp {total}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Potongan</p>
            <p className="font-semibold">Rp {potongan}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Total Akhir</p>
            <p className="font-semibold">Rp {totalAkhir}</p>
          </div>
          <div className="flex justify-between w-full">
            <p>Pendapatan Poin</p>
            <p className="text-[#27AE60]">+100</p>
          </div>
          <div className="flex justify-between items-end text-[14px] mt-4 w-full h-full">
            <button
              onClick={handleDraft}
              className="flex gap-2 justify-center border border-[#C2A353] text-[#C2A353] w-[39%] p-4 rounded-xl"
            >
              <img src={iTamKu} alt="Tambah" />
              <p>Tambah</p>
            </button>
            {total == 0 ? (
              <button
                disabled
                onClick={""}
                className="flex justify-between items-center text-center border rounded-xl bg-[#DCDCDC] font-bold text-white w-[59%] p-4"
              >
                <p>Bayar</p>
                <img src={iPan} alt="panah putih" />
              </button>
            ) : (
              <button
                onClick={handleTransaksi}
                className="flex justify-between items-center text-center border rounded-xl bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-white w-[59%] p-4"
              >
                <p>Bayar</p>
                <img src={iPan} alt="panah putih" />
              </button>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setModal(false);
            }}
            className="flex justify-center items-center text-center border rounded-xl bg-[#DCDCDC] font-bold text-[14px] text-white p-4 w-full"
          >
            Batal
          </button>
        </div>
      </div>
      <PilihPelanggan />
      <PilihPromo />
    </modaltransaksi.Provider>
  );
};

import React, { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../App2";
import iPemSu from "../../assets/iconproduk/iPemSu.svg";
import iDown from "../../assets/iconproduk/iDown.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaWhatsapp } from "react-icons/fa";

export const PembayaranBerhasil = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [dataDalam, setDataDalam] = useState([]);
  const navigasi = useNavigate();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const invoiceRef = useRef(); // Pindahkan useRef ke luar
  const formData = new FormData()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.drnich.co.id/api/pos/kasir/transaksi/${id}`,
          { withCredentials: true }
        );
        console.log(response.data)
        setDataDalam(response.data.transaksiDetail);
        setDatax(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setFetched(true)
    fetchData();
    setNav("Pembayaran");
    setLink(-2);
    setTimeout(() => {
      setFetched(true);
    }, 500);
    document.title = "Pembayaran ";
  }, [id, setNav, setLink]);

  // ✅ Fungsi downloadPDF sekarang ada di sini
  const downloadPDF = async() => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // 🔹 Kurangi dari 210 agar ada padding kiri-kanan
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const marginLeft = (210 - imgWidth) / 2; // 🔹 Posisi tengah dengan padding kiri-kanan
    let heightLeft = imgHeight;
    let position = 20; // 🔹 Padding atas 20mm

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${datax.invoice}.pdf`); // Simpan file PDF
    });
  };

  const sendWhatsApp = () => {
  const phoneNumber = datax.pelanggan.nomorTelepon; // Ganti dengan nomor pelanggan
  const message = encodeURIComponent(
    `*Pembayaran Berhasil!*\n\n` +
    `Invoice: ${datax.invoice}\n` +
    `Tanggal: ${new Date().toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}\n` +
    `Total: IDR ${datax.totalAkhir?.toLocaleString("id-ID")}\n\n` +
    `*Detail Pembelian:*\n` +
    dataDalam.map(item => `- ${item.produk.namaProduk} (${item.jumlah} x Rp. ${item.produk.hargaJual?.toLocaleString("id-ID")})\n`).join("") +
    `\nTerima kasih telah berbelanja!`
  );

  // Buat URL WhatsApp
  const waURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // Redirect ke WhatsApp
  window.open(waURL, "_blank");
};



  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full min-h-screen h-fit pt-8">
    <div ref={invoiceRef} className={''}>
      <div className="grid place-items-center">
        <img src={iPemSu} alt="Pembayaran Berhasil" className={`${fetched ? 'scale-125' : 'scale-50'} duration-500`} />
        <p className="text-[14px] text-[#27AE60] pt-8">Pembayaran Berhasil</p>
        <p className="text-[12px] text-[#bdbdbd] mt-4">{datax.invoice}</p>
        <p className="text-[12px] text-[#bdbdbd]">
          {new Date()
            .toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
              hour12: false,
            })
            .replace("pukul ", ",")}
          </p>
          <p className="text-[12px] text-[#bdbdbd] font-bold">VIA {datax.metode}</p>
        <p className="text-[24px] text-[#454545] font-bold mt-3">
          IDR {datax.totalAkhir?.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Area Invoice yang akan dikonversi ke PDF */}
      <div className="mt-8 text-[12px] bg-white p-5 rounded-lg">
        {dataDalam.map((item, i) => (
          <div key={i} className="pb-2">
            <div className="flex justify-between text-start">
              <p>{item.produk.namaProduk}</p>
              <p>Rp. {(item.jumlah * item.produk.hargaJual)?.toLocaleString("id-ID")}</p>
            </div>
            <div className="flex items-start text-[#BDBDBD] my-1">
              <p>
                {item.jumlah} x Rp. {item.produk.hargaJual}
              </p>
            </div>
          </div>
        ))}
        <div className="border border-dashed border-[#BDBDBD] my-3"></div>
          <div className="flex justify-between w-full text-[14px]">
            <div className="flex flex-col">
              <p>Total</p>
              <p>Potongan</p>
              <p>Total Pembayaran</p>
              <p>Uang Pembayaran</p>
              <div className="w-full my-[10px]"></div>
              <p className="font-semibold">Uang Kembalian</p>
            </div>
            <div className="flex flex-col">
              <p>Rp. {datax.total?.toLocaleString("id-ID")}</p>
              <p>Rp. {datax.potongan?.toLocaleString("id-ID")}</p>
              <p>Rp. {datax.totalAkhir?.toLocaleString("id-ID")}</p>
              <p >Rp. {datax.pembayaran?.toLocaleString("id-ID")}</p>
              <div className="w-full border border-[#bdbdbd]/60 my-[10px]"></div>
              <p className="font-semibold">Rp. {datax.kembalian?.toLocaleString("id-ID")}</p>
            </div>
          </div>
      </div>
    </div>

      <div className="flex h-full items-end px-3">
        <div className="flex justify-end w-full gap-[10px]">
          {/* ✅ Panggil downloadPDF saat tombol ditekan */}
          <button
            onClick={downloadPDF}
            className="bg-gradient-to-l from-[#C2A353] to-[#EAC564] w-[90px] p-3 rounded-xl flex justify-center"
          >
            <img src={iDown} alt="iDownload" />
          </button>
          <button
            onClick={sendWhatsApp}
            className="bg-[#25D366] hover:bg-[#1ebe5d] w-[90px] p-3 rounded-xl flex justify-center items-center text-white font-semibold gap-2 transition-all"
          >
            <FaWhatsapp size={24} />
          </button>
          <button
            onClick={() => navigasi("/pos/Kasir")}
            className="border border-[#C2A353] w-full rounded-xl flex justify-center items-center text-[#C2A353]"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useRef, useState } from "react";
import { navContext } from "../../App2";
import iPemSu from "../../assets/iconproduk/iPemSu.svg";
import iDown from "../../assets/iconproduk/iDown.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const PembayaranProduk = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [fetched, setFetched] = useState(false)
  const navigasi = useNavigate();
  const { id } = useParams();
  const invoiceRef = useRef();
  
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/belanjaPos/${id}`)
        .then((response) => setDatax(response.data));
    };

    fetchData();
    setLink(-2)
    
    setTimeout(()=>{setFetched(true)},500)
  }, []);
  console.log(datax);

  const downloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // 🔹 Kurangi dari 210 agar ada padding kiri-kanan
    const marginSide = 10;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const marginLeft = (210 - imgWidth) / 2; // 🔹 Posisi tengah dengan padding kiri-kanan
    let heightLeft = imgHeight;
    let position = 20; // 🔹 Padding atas 20mm

      pdf.addImage(imgData, "PNG", marginSide, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", marginSide, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf"); // Simpan file PDF
    });
  };

  setNav("Pembayaran Produk");
  document.title = "Pembayaran Produk";
  return (
    <div className="flex flex-col px-9 py-3 gap-1 bg-white w-full h-fit min-h-full pt-8">
      <div ref={invoiceRef} className="flex pb-2 flex-col w-full place-items-center">
        <div className="flex pb-2 flex-col w-full place-items-center">
          <img src={iPemSu} alt="Pembayaran Berhasil" className={`${fetched? 'scale-125' : 'scale-50'} duration-500`}/>
          <p className="text-[14px] text-[#27AE60] pt-8">
            Pembayaran Berhasil
          </p>
          <p className="text-[12px] text-[#bdbdbd] mt-4">#DN0928013</p>
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
          <p className="text-[24px] text-[#454545] font-bold mt-3">
            IDR {datax?.total?.toLocaleString("id-ID")}
          </p>
            {datax?.belanjaDetail?.map((item, i) => (
              <div key={i} className="mt-7 text-[12px] w-full">
                <div className="flex justify-between text-start">
                  <p>{item.produk.namaProduk}</p>
                  <p>Rp {item?.totalHarga?.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-start text-[#BDBDBD] my-1">
                  <p>
                    {item.jumlah} x {item.produk.hargaBeli.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
            <div className="w-full border border-dashed border-[#BDBDBD] my-3 mb-[20px]"></div>
              <div className="w-full flex justify-between text-[12px] font-semibold">
                <p>Total</p>
                <p>Rp {datax?.total?.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>
          <div className="flex w-full h-full mt-10 justify-end items-end">
            <div className="flex justify-end w-full">
              <button onClick={downloadPDF} className="bg-gradient-to-r from-[#C2A353] to-[#EAC564] w-[90px] p-3 rounded-xl flex justify-center">
                <img src={iDown} alt="iDownload" />
              </button>
              <button
                onClick={() => navigasi(-2)}
                className="border ml-2 border-[#C2A353] w-full rounded-xl flex justify-center items-center text-[#C2A353]"
              >
                Kembali
              </button>
            </div>
          </div>
    </div>
  );
};

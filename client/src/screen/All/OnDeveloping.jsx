import React from "react";
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import ArrowRightDisable from "../../components/ArrowRight-Disable";
import LayananPopuler from "../../components/layananPopuler";
import ProdukTerbaru from "../../components/ProdukTerbaru";
import { useNavigate } from "react-router-dom";

function OnDeveloping() {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center ">
      <div className="fixed w-full z-30">
        <Navbar selected={"Beranda"} />
      </div>
      <div className="flex items-center w-[90%] lg:w-4/5  justify-start space-x-2 mt-4 pt-20 ">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Beranda
        </a>
        <ArrowRightDisable />
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
          Under Developing
        </a>
      </div>
      <main className="w-[90%] lg:w-[80%] flex flex-col mt-6 space-y-6">
        {/* Page Title with Subtle Animation */}
        <section className="w-full">
          <h1 className="text-lg lg:text-2xl font-semibold text-secondary font-SFPro leading-tight tracking-tight animate-fadeIn">
            🚀 Under Developing
          </h1>
          <p className="text-sm lg:text-base text-gray-500 mt-1">
            Stay tuned! We're working on something amazing. ✨
          </p>
        </section>

        {/* Horizontal Divider */}
        <div className="border-t border-gray-300" />

        {/* Layanan Populer Section */}
        <section className="lg:w-full w-full">
          <LayananPopuler />
        </section>
        <section className="lg:w-full w-full">
          <ProdukTerbaru />
        </section>
      </main>

      <Footer />
    </section>
  );
}

export default OnDeveloping;

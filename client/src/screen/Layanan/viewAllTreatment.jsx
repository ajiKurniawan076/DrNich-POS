import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Navbar and Footer
import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";

// Other Components
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import CardLayanan from "../../components/CardLayanan.jsx";
import CloseIcon from "../../assets/close-circle.svg";
import ConfirmPopUp from "../../components/confirmPopUp.jsx";
import FilterIcon from "../../components/FILTERICON.svg";

function ViewAllTreatment() {
  const navigate = useNavigate();

  const [productType, setProductType] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all"); // Filter for product type

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous error

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/layanan/getAllLayanan`
      );

      const productType = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getAllJenisLayanan`
        )
      ).data;

      setProductType(productType);
      console.log("jenis layanan : " + productType);
      const sorted = response.data.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setContent(sorted);
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Derived state for filtered products
  const filteredContent = content.filter((item) => {
    // Filtering logic for products
    const matchesCategory =
      filterCategory === "all" || item.idJenis.nama === filterCategory;
    console.log(`Filtering: ${item.nama}, Type Match: ${matchesCategory}`);
    return matchesCategory;
  });

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full fixed z-30">
        <Navbar selected="Layanan" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex items-center w-[90%] lg:w-[85%] justify-start space-x-2 mt-4 pt-20 ">
            <a
              onClick={() => navigate("/")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Beranda
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate("/layanan")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              layanan
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate(`/layanan/viewAllTreatment`)}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Semua Treatment
            </a>
          </div>
          <ConfirmPopUp
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}>
            <div className="flex flex-col items-start w-[95vw] h-screen">
              <div className="flex flex-col items-start w-screen h-screen lg:w-[30vw] bg-white px-4">
                {/* Close Button */}
                <div className="w-full flex justify-end items-center mt-10">
                  <button onClick={() => setIsFilterOpen(false)}>
                    <img
                      src={CloseIcon}
                      alt="Close"
                      className="w-7 lg:w-10 lg:h-10 h-7"
                    />
                  </button>
                </div>

                <div className="flex flex-col items-start space-y-2 w-[85%]">
                  <h1 className="text-base lg:text-lg font-medium font-SFPro text-secondary">
                    Kategori
                  </h1>

                  <div className="grid grid-cols-2 w-[90%]">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="filterSkin"
                        value="all"
                        checked={filterCategory === "all"}
                        onChange={() => setFilterCategory("all")}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all 
              ${
                filterCategory === "all"
                  ? "border-[#B2955B]"
                  : "border-gray-400"
              }`}>
                        {filterCategory === "all" && (
                          <div className="w-4 h-4 rounded-full bg-[#B2955B]"></div>
                        )}
                      </div>
                      <span className="text-sm lg:text-base font-normal font-SFPro text-text">
                        Semua
                      </span>
                    </label>

                    {productType ? (
                      productType.map((item) => (
                        <label
                          className="flex items-center space-x-2 cursor-pointer"
                          key={item._id}>
                          <input
                            type="radio"
                            name="productType"
                            value={item.nama}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            checked={filterCategory === item.nama}
                            className="hidden"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all 
                  ${
                    filterCategory === item.nama
                      ? "border-[#B2955B]"
                      : "border-gray-400"
                  }`}>
                            {filterCategory === item.nama && (
                              <div className="w-4 h-4 rounded-full bg-[#B2955B]"></div>
                            )}
                          </div>
                          <span className="text-sm lg:text-base font-normal font-SFPro text-text">
                            {item.nama}
                          </span>
                        </label>
                      ))
                    ) : (
                      <div className="text-center">Loading...</div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="mt-2 w-[80%] lg:w-fit bg-secondary text-white rounded-md p-2">
                  Terapkan
                </button>
              </div>
            </div>
          </ConfirmPopUp>

          <div className="flex justify-between items-center w-[90%] lg:w-[85%] mt-4">
            <h1 className="font-SFPro w-full text-start lg:text-2xl text-secondary font-medium text-base">
              Semua Treatment
            </h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition">
              <img src={FilterIcon} alt="Filter" className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-[90%] lg:w-[85%] gap-4 mt-[18px]">
            {loading ? (
              <div className="col-span-full text-center">
                Loading products...
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <div key={item._id}>
                  <CardLayanan item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                No products available
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 items-center w-[90%] lg:w-[80%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
            {/* Popular Services */}
            <section className="lg:w-full w-full">
              <LayananPopuler />
            </section>

            {/* Latest Products */}
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}

export default ViewAllTreatment;
